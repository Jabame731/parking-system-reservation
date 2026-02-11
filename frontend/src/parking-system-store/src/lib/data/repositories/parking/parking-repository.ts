import { inject, Injectable } from '@angular/core';
import { ParkingRepositoryInterface } from '../../../domain/index';
import { ParkingDatasource } from '../../datasources';
import { CreateParking, Parking, ParkingResponseData } from '@parking-system-store/public-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParkingRepository implements ParkingRepositoryInterface {
  private parkingDatasource = inject(ParkingDatasource);

  addParkingSlot(parking: CreateParking): Observable<string> {
    return this.parkingDatasource.addParkingSlot(parking);
  }

  getParkingSlotById(slotId: string): Observable<Parking> {
    return this.parkingDatasource.getParkingSlotById(slotId);
  }

  getParkingSlots(): Observable<ParkingResponseData> {
    return this.parkingDatasource.getParkingSlots();
  }

  editParkingSlot(parking: Partial<Parking>): Observable<string> {
    return this.editParkingSlot(parking);
  }

  deleteParkingSlot(slotId: string): Observable<boolean> {
    return this.parkingDatasource.deleteParkingSlot(slotId);
  }
}
