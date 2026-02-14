import { connection } from "../../config/mysql.db";
import {
  DashboardStats,
  ErrorResponse,
  Result,
  SuccessResponse,
} from "../../utils";

export const getDashboardAnalyticsData = async (): Promise<
  Result<SuccessResponse<DashboardStats>, ErrorResponse>
> => {
  const db = connection();

  try {
    const today = new Date().toISOString().split("T")[0];

    const [[revRows], [occRows], [peakRows], [monthlyRows]] = await Promise.all(
      [
        db.execute(
          "SELECT SUM(amount) as revenue, COUNT(id) as total FROM reservation WHERE DATE(reservationDate) = CURDATE() AND isPaid = 1 ",
        ),
        db.execute(
          "SELECT (COUNT(CASE WHEN slotStatus = 'OCCUPIED' THEN 1 END) * 100 / COUNT(*)) as rate FROM parking_slot",
        ),
        db.execute(
          "SELECT HOUR(startTime) as peakHour FROM reservation WHERE DATE(reservationDate) = ? GROUP BY peakHour ORDER BY COUNT(*) DESC LIMIT 1",
          [today],
        ),
        db.execute(
          "SELECT MONTH(reservationDate) as monthIdx, SUM(amount) as total FROM reservation WHERE YEAR(reservationDate) = YEAR(CURDATE()) AND isPaid = 1 GROUP BY monthIdx ORDER BY monthIdx",
        ),
      ],
    );

    const formatPeakHour = (h: number | null): string => {
      if (h === null) return "No data";
      const period = h >= 12 ? "PM" : "AM";
      const displayHour = h % 12 || 12;
      return `${displayHour}:00 ${period} - ${(h + 1) % 12 || 12}:00 ${h + 1 >= 12 ? "PM" : "AM"}`;
    };

    const rev = (revRows as any[])[0];
    const occ = (occRows as any[])[0];
    const peak = (peakRows as any[])[0];
    const months = monthlyRows as any[];

    console.log(months);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const stats: DashboardStats = {
      summary: {
        todayRevenue: parseFloat(rev?.revenue) || 0,
        totalParkingsToday: parseInt(rev?.total) || 0,
        peakHour: formatPeakHour(peak?.peakHour),
        currentOccupancy: Math.round(occ?.rate) || 0,
        yearlySales: monthNames.map((name, i) => {
          const found = months.find((m) => m.monthIdx === i + 1);
          return {
            month: name,
            total: found ? parseFloat(found?.total) : 0,
          };
        }),
      },
    };

    return {
      success: true,
      data: {
        statusCode: 200,
        message: "Dashboard Analytics fetched successfully",
        data: stats,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: {
        errorMessage: error instanceof Error ? error.message : String(error),
        statusCode: 500,
      },
    };
  }
};
