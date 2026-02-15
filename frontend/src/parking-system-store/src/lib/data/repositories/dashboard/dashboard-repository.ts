import { inject, Injectable } from '@angular/core';
import { DashboardAnalyticsRepositoryInterface } from '../../../domain';
import { DashboardDatasource } from '../../datasources';
import { Observable } from 'rxjs';
import { DashboardAnalyticsResponse } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class DashboardRepository implements DashboardAnalyticsRepositoryInterface {
  private dashboardDatasource = inject(DashboardDatasource);

  getDashboardAnalytics(): Observable<DashboardAnalyticsResponse> {
    return this.dashboardDatasource.getDashboardAnalytics();
  }
}
