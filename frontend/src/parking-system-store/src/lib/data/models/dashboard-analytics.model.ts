export interface DashboardAnalytics {
  summary: {
    todayRevenue: number;
    totalParkingsToday: number;
    peakHour: string;
    currentOccupancy: number;
    yearlySales: { month: string; total: number }[];
  };
}

export interface DashboardAnalyticsResponse {
  data: DashboardAnalytics;
}
