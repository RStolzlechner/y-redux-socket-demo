import { DemoItemState } from './demo-item/demo-item.state';
import { demoItemReducer } from './demo-item/demo-item.reducer';

/**
 * The root state of the Redux store.
 */
export interface RootState {
  demoItem: DemoItemState;
}

/**
 * The root reducer of the Redux store.
 */
export const rootReducer = {
  demoItem: demoItemReducer,
};
