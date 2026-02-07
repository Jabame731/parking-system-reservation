import { PaymentResult } from './reservation.attributes';

export interface Parking {
  id: string;
  slotName: string;
  carOccupied: string;
  sensorValue: string;
  slotStatus: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isPaid: boolean;
  paymentResult?: PaymentResult;
  reservationId?: string;
  userId?: string;
  carType: string;
}

export interface CreateParking {
  slotName: string;
  slotStatus: string;
  carOccupied: string;
  createdBy: string;
}
