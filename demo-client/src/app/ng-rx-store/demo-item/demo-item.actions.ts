import { createAction, props } from '@ngrx/store';
import { DemoItem } from '../../models/demo-item';

const yReduxSocketConnect = createAction('[demo-item] y-redux-socket-connect');
const create = createAction('[demo-item] create', props<DemoItem>());
const update = createAction('[demo-item] update', props<DemoItem>());
const remove = createAction('[demo-item] remove', props<{ id: number }>());

const loadSuccess = createAction(
  '[demo-item] load-success',
  props<{ items: DemoItem[] }>(),
);
const createOrUpdateSuccess = createAction(
  '[demo-item] create-or-update-success',
  props<{ item: DemoItem }>(),
);
const removeSuccess = createAction(
  '[demo-item] remove-success',
  props<{ id: number }>(),
);

export const demoItemActions = {
  yReduxSocketConnect,
  create,
  update,
  remove,
  loadSuccess,
  createOrUpdateSuccess,
  removeSuccess,
};
