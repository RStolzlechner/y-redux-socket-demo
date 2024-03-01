import { createAction, props } from '@ngrx/store';
import { DemoItem } from '../../models/demo-item';

const load = createAction('[demo-item] load');
const loadSuccess = createAction(
  '[demo-item] load-success',
  props<{ items: DemoItem[] }>(),
);
const loadFail = createAction('[demo-item] load-fail');

const create = createAction('[demo-item] create', props<DemoItem>());
const createSuccess = createAction(
  '[demo-item] create success',
  props<DemoItem>(),
);

const remove = createAction('[demo-item] remove', props<{ id: number }>());
const removeSuccess = createAction(
  '[demo-item] remove-success',
  props<{ id: number }>(),
);

const update = createAction('[demo-item] update', props<DemoItem>());
const updateSuccess = createAction(
  '[demo-item] update-success',
  props<DemoItem>(),
);

const select = createAction('[demo-item] select', props<{ id: number }>());

export const demoItemActions = {
  load,
  loadFail,
  loadSuccess,

  create,
  createSuccess,

  remove,
  removeSuccess,

  update,
  updateSuccess,

  select,
};
