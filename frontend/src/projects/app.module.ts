import { NgModule, provideAppInitializer } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { reducers } from '@parking-system-store/lib/data/store/reducer/meta/meta-reducer.reducer';
import { ParkingSystemStoreModule } from '@parking-system-store/lib/store.module';

export const extModules = [
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    connectInZone: true,
  }),
];

const PERSISTED_KEYS = [
  {
    authz: {
      filter: ['data', 'isAuthenticated'],
    },
  },
];

export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: PERSISTED_KEYS as any,
    rehydrate: true,
    storage: localStorage,
  })(reducer);
}

const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterOutlet,
    AppRoutingModule,
    ParkingSystemStoreModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    provideAppInitializer(() => new Promise((resolve) => setTimeout(resolve))),
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
