import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { ParkingUsecase } from '@parking-system-store/lib/usecases';

export const ParkingSlotGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const parkingUsecase = inject(ParkingUsecase);

  return parkingUsecase.getParking();
};
