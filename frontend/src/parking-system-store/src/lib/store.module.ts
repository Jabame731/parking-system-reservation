import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromStore from './data/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromStore.authFeatureKey, fromStore.initialAuthReducer),
    StoreModule.forFeature(fromStore.parkingFeatureKey, fromStore.initialParkingReducer),
    EffectsModule.forFeature([fromStore.AuthEffects]),
    EffectsModule.forFeature([fromStore.ParkingEffects]),
  ],
})
export class ParkingSystemStoreModule {}
