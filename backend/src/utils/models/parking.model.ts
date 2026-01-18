export interface Parking {
  id: string;
  slotName: string;
  carOccupied: string;
  sensorValue: number;
  sensorStatus: string;
  slotStatus: string;
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

//  id CHAR(36) PRIMARY KEY,
//     slotName VARCHAR(50) NOT NULL,
//     carOccupied VARCHAR(20),
//     status  VARCHAR(50) NOT NULL,
//     sensorValue VARCHAR(50),
