import { Observable } from 'rxjs';
import { DashboardAnalyticsResponse } from './dashboard-analytics.model';

export interface DashboardAnalyticsInterface {
  getDashboardAnalytics(): Observable<DashboardAnalyticsResponse>;
}
