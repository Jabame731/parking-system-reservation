import { PaymentResult } from './reservation.attributes';

export interface Parking {
  id: string;
  slotName: string;
  carOcuppied: string;
  sensorValue: string;
  slotStatus: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isPaid: boolean;
  paymentResult?: PaymentResult;
  reservationId?: string;
  userId?: string;
}

export interface CreateParking {
  slotName: string;
  slotStatus: string;
  carOccupied: string;
  createdBy: string;
}
