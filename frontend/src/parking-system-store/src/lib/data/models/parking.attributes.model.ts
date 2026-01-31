export interface Parking {
  id: string;
  slotName: string;
  carOcuppied: string;
  sensorValue: string;
  slotStatus: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateParking {
  slotName: string;
  slotStatus: string;
  carOccupied: string;
  createdBy: string;
}
