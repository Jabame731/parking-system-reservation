import { Pipe, PipeTransform } from '@angular/core';
import { Parking } from '@parking-system-store/public-api';
import { ParkingSlotConverted } from '../../models';

@Pipe({
  name: 'parkingSlotItems',
})
export class ParkingSlotItemsPipe implements PipeTransform {
  transform(slots: Parking[] | undefined): ParkingSlotConverted[] {
    if (!Array.isArray(slots)) return [];

    return slots.map((slot) => {
      const sensorValue = Number(slot.sensorValue);

      return {
        id: slot.id,
        name: slot.slotName,
        status: sensorValue === 1 ? 'occupied' : slot.slotStatus.toLocaleLowerCase(),
        plate: slot.carOcuppied,
      };
    });
  }
}
