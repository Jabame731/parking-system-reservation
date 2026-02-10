import { connection } from "../../config/mysql.db";
import { ErrorResponse, Result, SuccessResponse } from "../../utils";
import {
  PaymentResultData,
  Reservation,
} from "../../utils/models/reservation.model";
import { paypal } from "../../utils/paypal/paypal";

export const createPaypalReservation = async (
  reservationId: string,
): Promise<Result<SuccessResponse<{ orderId: string }>, ErrorResponse>> => {
  const db = connection();
  try {
    //Get reservation from database
    const [reservation] = await db.execute(
      "SELECT * FROM `reservation` WHERE `id` = ?",
      [reservationId],
    );

    const reservations = reservation as Reservation[];

    const reserve = reservations[0]!;

    if (reserve) {
      const paypalOrder = await paypal.createReservation(
        Number(reserve.amount),
      );

      const paymentResult = JSON.stringify({
        id: paypalOrder?.id,
        email_address: "",
        status: "",
        pricePaid: 0,
      });

      const query = `
                      UPDATE reservation 
                      SET paymentResult = ? 
                      WHERE id = ?
                    `;

      await db.execute(query, [paymentResult, reserve.id]);

      return {
        success: true,
        data: {
          statusCode: 200,
          message: "Paypal order created successfully",
          data: { orderId: paypalOrder.id },
        },
      };
    } else {
      return {
        success: false,
        error: {
          statusCode: 404,
          errorMessage: "Reservation not found",
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      error: {
        statusCode: 500,
        errorMessage: error instanceof Error ? error.message : String(error),
      },
    };
  }
};

export const updateReservationToPaid = async ({
  reservationId,
  paymentResult,
}: {
  reservationId: string;
  paymentResult?: PaymentResultData;
}): Promise<Reservation> => {
  const db = connection();
  const paidAt = new Date();

  // Perform the update directly
  await db.execute(
    `UPDATE reservation SET paymentStatus = ?, paymentResult = ?, isPaid = ?, paidAt = ? WHERE id = ?`,
    ["PAID", JSON.stringify(paymentResult), true, paidAt, reservationId],
  );

  const [rows] = await db.execute("SELECT * FROM reservation WHERE id = ?", [
    reservationId,
  ]);

  const reservations = rows as Reservation[];

  const reserve = reservations[0]!;
  return reserve;
};

// 2. Main Approval Function
export const approvePaypalOrder = async (
  reservationId: string,
  paypalOrderId: string,
): Promise<Result<SuccessResponse<Reservation>, ErrorResponse>> => {
  const db = connection();

  try {
    const [rows] = await db.execute("SELECT * FROM reservation WHERE id = ?", [
      reservationId,
    ]);
    const reserve = (rows as Reservation[])[0];

    // Guards
    if (!reserve)
      return {
        success: false,
        error: { statusCode: 404, errorMessage: "Not found" },
      };
    if (reserve.isPaid)
      return {
        success: false,
        error: { statusCode: 400, errorMessage: "Already paid" },
      };

    const captureData = await paypal.capturePayment(paypalOrderId);
    if (!captureData || captureData.status !== "COMPLETED") {
      return {
        success: false,
        error: { statusCode: 400, errorMessage: "Capture failed" },
      };
    }

    const paymentResult: PaymentResultData = {
      id: captureData.id,
      status: captureData.status,
      email_address: captureData.payer?.email_address,
      pricePaid:
        captureData.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value,
    };

    const updatedReservation = await updateReservationToPaid({
      reservationId,
      paymentResult,
    });

    return {
      success: true,
      data: {
        statusCode: 200,
        message: "Reservation has been paid",
        data: updatedReservation,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: {
        statusCode: 500,
        errorMessage: error instanceof Error ? error.message : String(error),
      },
    };
  }
};
