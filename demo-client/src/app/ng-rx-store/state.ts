import { DemoItemState } from './demo-item/demo-item.state';
import { demoItemReducer } from './demo-item/demo-item.reducer';

export interface RootState {
  demoItem: DemoItemState;
}

export const rootReducer = {
  demoItem: demoItemReducer,
};
