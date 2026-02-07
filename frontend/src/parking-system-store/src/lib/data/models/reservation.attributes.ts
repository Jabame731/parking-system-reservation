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
  id: string;
  slotId: string;
  userId: string;
  licensePlate: string;
  carType: string;
  startTime: Date;
  endTime: Date;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  paymentResult: PaymentResult;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentResult {
  id: string;
  status: string;
  email_address: string;
  pricePaid: string;
}
