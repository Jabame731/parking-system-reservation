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
    EffectsModule.forFeature([fromStore.AuthEffects]),
  ],
})
export class ParkingSystemStoreModule {}
