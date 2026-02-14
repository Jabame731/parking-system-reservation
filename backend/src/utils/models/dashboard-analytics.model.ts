export interface DashboardStats {
  summary: {
    todayRevenue: number;
    totalParkingsToday: number;
    peakHour: string;
    currentOccupancy: number;
    yearlySales: { month: string; total: number }[];
  };
}

export interface ReservationRow {
  monthIdx: number;
  total: number;
}
