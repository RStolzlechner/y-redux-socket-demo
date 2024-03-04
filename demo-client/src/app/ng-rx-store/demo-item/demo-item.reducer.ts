import { createReducer, on } from '@ngrx/store';
import { DemoItemState, initialDemoItemState } from './demo-item.state';
import { demoItemActions } from './demo-item.actions';

/*
  Reducer for the demo item state. It handles the state changes for the demo item feature.
  It is a pure function that takes the current state and an action and returns the new state.
  The state is immutable, so the reducer creates a new state object with the updated properties.
  The reducer is used by the NgRx Store to update the state based on dispatched actions.
 */
export const demoItemReducer = createReducer(
  initialDemoItemState,
  on(demoItemActions.load, (state): DemoItemState => {
    return { ...state, entities: {}, loaded: false, loading: true };
  }),
  on(demoItemActions.loadFail, (state): DemoItemState => {
    return { ...state, entities: {}, loaded: false, loading: false };
  }),
  on(demoItemActions.loadSuccess, (state, { items }): DemoItemState => {
    const entities = items.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: item,
      }),
      {},
    );
    return { ...state, loaded: true, loading: false, entities };
  }),
  on(
    demoItemActions.createSuccess,
    demoItemActions.updateSuccess,
    (state, action): DemoItemState => {
      const entities = { ...state.entities, [action.id]: action };
      return { ...state, entities };
    },
  ),
  on(demoItemActions.removeSuccess, (state, { id }): DemoItemState => {
    const entities = { ...state.entities };
    delete entities[id];
    return { ...state, entities };
  }),
  on(demoItemActions.select, (state, { id }): DemoItemState => {
    return { ...state, selectedId: id };
  }),
);
