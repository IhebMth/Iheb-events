import { createAction, props } from '@ngrx/store';

export const AllServiceAction = createAction(
  '[Service] All Service',
  props<{ payload: any }>()
);
export const UpdateServiceAction = createAction(
  '[Service] Update Service',
  props<{ payload: any }>()
);
