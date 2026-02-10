import { Observable } from 'rxjs';
import { CreateParking, Parking, ParkingResponseData } from './parking.attributes.model';

export interface ParkingInterface {
  addParkingSlot(parking: CreateParking): Observable<Partial<Parking>>;
  getParkingSlots(): Observable<ParkingResponseData>;
  getParkingSlotById(slotId: string): Observable<Parking>;
  editParkingSlot(parking: Partial<Parking>): Observable<string>;
  deleteParkingSlot(slotId: string): Observable<string>;
}
