import { createReducer, on, Action } from '@ngrx/store';
import {
  AllServiceAction,
  UpdateServiceAction,
} from '../actions/service.action';

export interface ServiceState {
  service: any;
}

export const initialState: ServiceState = {
  service: [],
};

const serviceReducer = createReducer(
  initialState,
  on(AllServiceAction, (state, { payload }) => ({
    ...state,
    service: payload,
  }))
);

export function reducerService(
  state: ServiceState | undefined,
  action: Action
) {
  return serviceReducer(state, action);
}
