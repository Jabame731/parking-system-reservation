export interface CreateReservation {
  id: string;
  slotId: string;
  userId: string;
  licensePlate: string;
  carType?: string;
  startTime: string;
  endTime: string;
  amount: number;
  paymentMethod?: string;
  paymentStatus?: string;
  reservationDate?: Date;
}
