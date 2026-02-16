import { inject, Injectable, NgZone } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../../data/store';
import { BehaviorSubject, combineLatest, filter, map, Observable, tap } from 'rxjs';
import { Callbacks, CreateParking } from '../../data/models';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ParkingUsecase {
  private store = inject(Store<fromStore.ParkingState>);
  private zone = inject(NgZone);
  private baseUrl = environment.apiBaseUrl;

  parkingData$ = this.store.pipe(select(fromStore.getParkingData));

  loading$ = this.store.pipe(select(fromStore.isParkingLoading));

  loaded$ = this.store.pipe(select(fromStore.isParkingLoaded));

  error$ = this.store.pipe(select(fromStore.parkingError));

  getParking(): Observable<boolean> {
    const loaded = this.store.pipe(select(fromStore.isParkingLoaded));
    const loading = this.store.pipe(select(fromStore.isParkingLoading));

    return combineLatest([loaded, loading]).pipe(
      tap(([loaded, loading]) => {
        if (!loaded && !loading) {
          this.store.dispatch(fromStore.getParkingSlotAttempted());
        }
      }),
      filter(([loaded]) => loaded),
      map(() => true),
    );
  }

  addParkingSlot(data: CreateParking, callBacks: Callbacks) {
    this.store.dispatch(
      fromStore.addParkingSlotAttempted({
        data,
        callBacks,
      }),
    );
  }

  deleteParkingSlot(id: string) {
    this.store.dispatch(
      fromStore.deleteParkingSlotAttempted({
        id,
      }),
    );
  }

  initLiveUpdates() {
    const eventSource = new EventSource(`${this.baseUrl}/api/parkingSlots/stream`);

    eventSource.addEventListener('update', (event: MessageEvent) => {
      this.zone.run(() => {
        const result = JSON.parse(event.data);

        this.store.dispatch(
          fromStore.getParkingSlotsFromSSE({
            data: result.data,
          }),
        );
      });
    });
    return eventSource;
  }
}
