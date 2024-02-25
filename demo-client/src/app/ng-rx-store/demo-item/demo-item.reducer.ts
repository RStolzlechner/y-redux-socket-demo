import { createReducer, on } from '@ngrx/store';
import { DemoItemState, initialDemoItemState } from './demo-item.state';
import { demoItemActions } from './demo-item.actions';

export const demoItemReducer = createReducer(
  initialDemoItemState,
  on(demoItemActions.loadSuccess, (state, { items }): DemoItemState => {
    const entities = items.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: item,
      }),
      {},
    );
    return { ...state, loaded: true, entities };
  }),
  on(
    demoItemActions.createOrUpdateSuccess,
    (state, { item }): DemoItemState => {
      const entities = { ...state.entities, [item.id]: item };
      return { ...state, entities };
    },
  ),
  on(demoItemActions.removeSuccess, (state, { id }): DemoItemState => {
    const entities = { ...state.entities };
    delete entities[id];
    return { ...state, entities };
  }),
);
