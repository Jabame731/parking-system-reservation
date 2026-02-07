import { Component, computed, inject, input, OnInit } from '@angular/core';
import {
  ICreateOrderRequest,
  IInitCallbackData,
  IOnInitCallbackActions,
  IPayPalConfig,
  NgxPayPalModule,
} from 'ngx-paypal';
import { environment } from '@parking-system-store/environments/environment.development';
import { ParkingSlotConverted } from 'projects/app/models';
import { PaypalService } from '../../services';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-paypal-reservation-button',
  imports: [NgxPayPalModule],
  templateUrl: './paypal-reservation-button.html',
  styleUrl: './paypal-reservation-button.scss',
})
export class PaypalReservationButton {
  private paypalService = inject(PaypalService);

  slot = input<ParkingSlotConverted>();

  public readonly payPalConfig = computed<IPayPalConfig>(() => {
    const slotData = this.slot() as ParkingSlotConverted;
    return {
      currency: 'PHP',
      clientId: environment.paypalClientId || 'sb',
      fundingSource: 'PAYPAL',
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      createOrderOnServer: () => {
        return firstValueFrom(this.paypalService.createPaypalReservation(slotData.reservationId));
      },
      onApprove: (data, actions) => {
        this.paypalService.approvePaypalReservation(slotData.reservationId, data.orderID);
      },
      onCancel: (data, actions) => console.log('OnCancel', data, actions),
      onError: (err) => console.log('OnError', err),
      onClick: (data, actions) => {
        console.log('Clicked slot:', slotData);
      },
    };
  });
}
