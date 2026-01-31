import { Observable } from 'rxjs';
import { CreateParking, Parking } from '../../data/models';

export interface ParkingRepositoryInterface {
  addParkingSlot(parking: CreateParking): Observable<Partial<Parking>>;
  getParkingSlots(): Observable<Parking[]>;
  getParkingSlotById(slotId: string): Observable<Parking>;
  editParkingSlot(parking: Partial<Parking>): Observable<string>;
  deleteParkingSlot(slotId: string): Observable<string>;
}
