export interface ParkingSlot {
  slotName: string;
  carOcuppied: string;
  sensorValue: string;
  slotStatus: string;
}

export interface ParkingSlotConverted {
  id: string;
  name: string;
  status: string;
  plate: string | null;
  isPaid?: boolean;
  paymentPaypal?: PaymentPaypal;
  reservationId: string;
  carType: string;
  userId: string;
}

export interface PaymentPaypal {
  id: string;
  status: string;
  email_address: string;
  pricePaid: string;
}
