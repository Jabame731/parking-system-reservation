import { DashboardAnalyticsResponse } from '../../data/models';
import { Observable } from 'rxjs';

export interface DashboardAnalyticsRepositoryInterface {
  getDashboardAnalytics(): Observable<DashboardAnalyticsResponse>;
}
