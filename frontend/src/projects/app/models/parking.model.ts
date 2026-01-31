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
}
