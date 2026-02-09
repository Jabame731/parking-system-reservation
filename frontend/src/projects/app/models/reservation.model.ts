export interface Reservation {
  id: string;
  userId: string;
  slotName?: string;
  licensePlate: string;
  carType: string;
  startTime: Date;
  endTime: Date;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  paymentResult: PaymentResult | null;
  isPaid: boolean;
  paidAt?: string | null;
  reservationDate?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentResult {
  id: string;
  status: string;
  pricePaid: string;
  email_address: string;
}
