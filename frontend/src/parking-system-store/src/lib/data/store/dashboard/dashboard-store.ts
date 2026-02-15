import { Injectable } from '@angular/core';
import { DashboardAnalyticsResponse } from '../../models';
import { ComponentStore } from '@ngrx/component-store';
import { DashboardRepository } from '../../repositories';
import { concatMap, Observable, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export interface DashboardAnalyticsStoreState extends DashboardAnalyticsResponse {
  loading: boolean;
  loaded: boolean;
  error: string;
}

const defaultState: DashboardAnalyticsStoreState = {
  loaded: undefined!,
  data: null!,
  loading: undefined!,
  error: undefined!,
};

@Injectable()
export class DashboardAnalyticsStore extends ComponentStore<DashboardAnalyticsStoreState> {
  constructor(private readonly dashboardAnalyticsRepo: DashboardRepository) {
    super(defaultState);
  }

  data$ = this.select(({ data }) => data);

  loading$ = this.select(({ loading }) => loading);

  readonly dashboardAnalyticsLoadingUpdater = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
    error: undefined!,
  }));

  readonly dashboardAnalyticsFailureUpdater = this.updater((state, error: any) => {
    return {
      ...state,
      loaded: false,
      loading: false,
      error,
    };
  });

  readonly getDashboardAnalyticsUpdater = this.updater(
    (state, data: { response: DashboardAnalyticsResponse }) => {
      return {
        ...state,
        ...data.response,
        loading: false,
        error: undefined!,
      };
    },
  );

  readonly getDashboardAnalytics = this.effect((actions$: Observable<void>) => {
    return actions$.pipe(
      tap(() => this.dashboardAnalyticsLoadingUpdater(true)),
      concatMap(() => {
        return this.dashboardAnalyticsRepo.getDashboardAnalytics().pipe(
          tapResponse({
            next: (data) => {
              return this.getDashboardAnalyticsUpdater({ response: data });
            },
            error: (error: any) => this.dashboardAnalyticsFailureUpdater(error),
          }),
        );
      }),
    );
  });
}
