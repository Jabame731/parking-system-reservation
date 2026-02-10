import { PaymentResultData } from "./reservation.model";

export interface Parking {
  id: string;
  slotName: string;
  carOccupied: string;
  sensorValue: number;
  sensorStatus: string;
  slotStatus: string;
  reservationId: string;
  isPaid: boolean;
  paymentResult: PaymentResultData;
  userId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateParking {
  id: string;
  slotName: string;
  slotStatus: string;
  carOccupied: string;
  createdBy: string;
}

export interface Stats {
  totalSlots: number;
  availableSlots: number;
  occupiedSlots: number;
}

export interface ParkingResponseData {
  slots: Parking[];
  stats: Stats;
}

//  id CHAR(36) PRIMARY KEY,
//     slotName VARCHAR(50) NOT NULL,
//     carOccupied VARCHAR(20),
//     status  VARCHAR(50) NOT NULL,
//     sensorValue VARCHAR(50),
