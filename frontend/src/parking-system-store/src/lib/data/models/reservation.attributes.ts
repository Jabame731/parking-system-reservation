export interface CreateReservation {
  slotId: string;
  userId: string;
  licensePlate: string;
  carType: string;
  startTime: string;
  endTime: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  reservationDate: Date;
}

export interface Reservation {
  slotId: string;
  userId: string;
  licensePlate: string;
  carType: string;
  startTime: Date;
  endTime: Date;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: Date;
  updatedAt: Date;
}
