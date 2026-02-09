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

export interface Reservation {
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
  paymentResult?: PaymentResultData;
  isPaid?: boolean;
  reservationDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  slotName?: string;
}

//Paypal payment Result
export interface PaymentResultData {
  id: string;
  status: string;
  email_address: string;
  pricePaid: string;
}
