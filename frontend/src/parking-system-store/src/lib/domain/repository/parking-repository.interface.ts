import { Observable } from 'rxjs';
import { CreateParking, Parking, ParkingResponseData } from '../../data/models';

export interface ParkingRepositoryInterface {
  addParkingSlot(parking: CreateParking): Observable<string>;
  getParkingSlots(): Observable<ParkingResponseData>;
  getParkingSlotById(slotId: string): Observable<Parking>;
  editParkingSlot(parking: Partial<Parking>): Observable<string>;
  deleteParkingSlot(slotId: string): Observable<boolean>;
}
