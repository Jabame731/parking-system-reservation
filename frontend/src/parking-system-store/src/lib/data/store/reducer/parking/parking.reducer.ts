import { createReducer, on } from '@ngrx/store';
import { Parking, ParkingResponseData } from '../../../models';
import * as fromParking from '../../actions/parking/parking.actions';
import * as fromReservation from '../../actions/reservation/reservation.actions';
import * as fromPaypal from '../../actions/paypal/paypal.actions';

export const parkingFeatureKey = 'parking';

export interface ParkingState {
  data?: ParkingResponseData;
  loading: boolean;
  loaded: boolean;
  reservationAddLoading?: boolean;
  reservationAddSuccess?: boolean;
  error: null | string;
}

export const initialParkingState: ParkingState = {
  data: undefined,
  loaded: false,
  loading: false,
  error: null,
};

export const initialParkingReducer = createReducer(
  initialParkingState,
  on(fromParking.getParkingSlotAttempted, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
      error: null,
    };
  }),
  on(fromParking.getParkingSlotSucceeded, (state, { data }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      data: data,
      error: null,
    };
  }),
  on(fromParking.getParkingSlotFailed, (state, { error }) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: error,
    };
  }),
  on(fromReservation.addParkingReservationSucceeded, (state, { reservation, reservationId }) => {
    if (!state.data) return state;

    const updatedSlots = state.data.slots.map((slot) => {
      if (slot.id === reservation.slotId) {
        return {
          ...slot,
          slotStatus: 'reserved',
          isPaid: false,
          userId: reservation.userId,
          carType: reservation.carType,
          carOccupied: reservation.licensePlate,
          reservationId,
          paymentMethod: reservation.paymentMethod,
        };
      }
      return slot;
    });

    const occupiedCount = updatedSlots.filter((s) => s.slotStatus === 'reserved').length;
    const totalCount = updatedSlots.length;

    return {
      ...state,
      reservationAddLoading: false,
      reservationAddSuccess: true,
      data: {
        ...state.data,
        slots: updatedSlots,
        stats: {
          ...state.data.stats,
          totalSlots: totalCount,
          availableSlots: totalCount - occupiedCount,
        },
      },
    };
  }),
  on(fromPaypal.approvePaypalReservationSucceeded, (state, { response }) => {
    if (!state.data) return state;

    const updatedSlots = state.data.slots.map((slot: Parking) => {
      if (slot.reservationId === response.id) {
        return {
          ...slot,
          paymentResult: response.paymentResult,
          isPaid: true,
        };
      }
      return slot;
    });

    return {
      ...state,
      data: {
        ...state.data,
        slots: updatedSlots,
      },
    };
  }),
  on(fromReservation.reservationSetToPaid, (state, { reservationId, isPaid }) => {
    if (!state.data) return state;

    const updatedSlots = state.data.slots.map((slot) => {
      if (slot.reservationId === reservationId) {
        return {
          ...slot,
          isPaid,
        };
      }

      return slot;
    });

    return {
      ...state,
      data: {
        ...state.data,
        slots: updatedSlots,
      },
    };
  }),
  on(fromParking.addParkingSlotSucceeded, (state, { id, data }) => {
    if (!state.data) return state;
    const newSlot = {
      ...data,
      id,
      slotStatus: data.slotStatus ? data.slotStatus : 'available',
      isPaid: false,
    } as Parking;
    const updatedSlots = [...state.data.slots, newSlot];

    const totalCount = updatedSlots.length;
    const occupiedCount = updatedSlots.filter(
      (s) => s.slotStatus === 'reserved' || s.slotStatus === 'occupied',
    ).length;

    return {
      ...state,
      data: {
        ...state.data,
        slots: updatedSlots,
        stats: {
          ...state.data.stats,
          totalSlots: totalCount,
          availableSlots: totalCount - occupiedCount,
        },
      },
    };
  }),
  on(fromParking.deleteParkingSlotSucceeded, (state, { id }) => {
    if (!state.data) return state;
    const newData = state.data?.slots.filter((slot) => slot.id !== id);

    const totalCount = newData.length;
    const occupiedCount = newData.filter(
      (s) => s.slotStatus === 'reserved' || s.slotStatus === 'occupied',
    ).length;

    return {
      ...state,
      data: {
        ...state.data,
        slots: newData,
        stats: {
          ...state.data.stats,
          totalSlots: totalCount,
          availableSlots: totalCount - occupiedCount,
        },
      },
    };
  }),
);
