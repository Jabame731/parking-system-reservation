import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Reservation, ReservationResponse } from '../../models';
import { ReservationRepository } from '../../repositories';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concatMap, Observable, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { ParkingUsecase } from '../../../usecases';
import * as fromReservation from '../actions/reservation/reservation.actions';
import { Store } from '@ngrx/store';

export interface ReservationComponenStoreState extends ReservationResponse {
  loading: boolean;
  loaded: boolean;
  error: string;
}

const defaultState: ReservationComponenStoreState = {
  loading: undefined!,
  data: [],
  loaded: undefined!,
  error: undefined!,
};

@Injectable()
export class ReservationStore extends ComponentStore<ReservationComponenStoreState> {
  constructor(
    private readonly reservationRepo: ReservationRepository,
    private parkingUsecase: ParkingUsecase,
    private readonly snackBar: MatSnackBar,
    private store: Store<any>,
  ) {
    super(defaultState);
  }

  data$ = this.select(({ data }) => data);

  loading$ = this.select(({ loading }) => loading);

  readonly getReservationLoadingUpdater = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
    error: undefined!,
  }));

  readonly getReservationFailureUpdater = this.updater((state, error: any) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error,
    };
  });

  readonly getReservationsUpdater = this.updater(
    (state, data: { response: ReservationResponse }) => {
      return {
        ...state,
        ...data.response,
        loading: false,
        error: undefined!,
      };
    },
  );

  readonly deleteReservationByIdUpdater = this.updater((state, data: { reservationId: string }) => {
    const newData = state.data.filter((reservation) => reservation.id !== data.reservationId);

    return {
      ...state,
      data: newData,
    };
  });

  readonly updateReservationUpdater = this.updater((state, data: { reservationId: string }) => {
    const newData = state.data.map((reservation) => {
      if (reservation.id === data.reservationId) {
        return {
          ...reservation,
          isPaid: true,
          paymentStatus: 'PAID',
        };
      }
      return reservation;
    });

    return {
      ...state,
      data: newData,
    };
  });

  readonly getReservationsByUserId = this.effect((actions$: Observable<{ userId: string }>) => {
    return actions$.pipe(
      tap(() => this.getReservationLoadingUpdater(true)),
      concatMap((payload) => {
        return this.reservationRepo.getReservationByUserId(payload.userId).pipe(
          tapResponse({
            next: (data) => {
              return this.getReservationsUpdater({ response: data });
            },
            error: (error: any) => this.getReservationFailureUpdater(error),
          }),
        );
      }),
    );
  });

  readonly getAllReservations = this.effect((actions$: Observable<void>) => {
    return actions$.pipe(
      tap(() => this.getReservationLoadingUpdater(true)),
      concatMap(() => {
        return this.reservationRepo.getAllReservations().pipe(
          tapResponse({
            next: (data) => {
              return this.getReservationsUpdater({ response: data });
            },
            error: (error: any) => this.getReservationFailureUpdater(error),
          }),
        );
      }),
    );
  });

  readonly deleteReservation = this.effect((actions$: Observable<{ reservationId: string }>) => {
    return actions$.pipe(
      concatMap((payload) => {
        return this.reservationRepo.deleteReservation(payload.reservationId).pipe(
          tapResponse({
            next: (data) => {
              this.snackBar.open('Reservation Deleted Successfully', 'x', {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration: 5 * 1000,
              });

              return this.deleteReservationByIdUpdater({ reservationId: payload.reservationId });
            },
            error: (error: any) => {
              return this.snackBar.open(error, 'x', {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration: 5 * 1000,
              });
            },
          }),
        );
      }),
    );
  });

  readonly updateReservation = this.effect((actions$: Observable<{ reservationId: string }>) => {
    return actions$.pipe(
      concatMap((payload) => {
        return this.reservationRepo.updateReservation(payload.reservationId).pipe(
          tapResponse({
            next: () => {
              this.store.dispatch(
                fromReservation.reservationSetToPaid({
                  reservationId: payload.reservationId,
                  isPaid: true,
                }),
              );

              this.snackBar.open('Reservation updated successfully', 'x', {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration: 5 * 1000,
              });

              return this.updateReservationUpdater({ reservationId: payload.reservationId });
            },
            error: (error: any) => {
              return this.snackBar.open(error, 'x', {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration: 5 * 1000,
              });
            },
          }),
        );
      }),
    );
  });
}
