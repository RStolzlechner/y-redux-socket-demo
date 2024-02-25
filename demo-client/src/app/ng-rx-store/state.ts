import { testReducer } from './test/test.reducer';
import { TestState } from './test/test.state';
import { DemoItemState } from './demo-item/demo-item.state';
import { demoItemReducer } from './demo-item/demo-item.reducer';

export interface RootState {
  test: TestState;
  demoItem: DemoItemState;
}

export const rootReducer = {
  test: testReducer,
  demoItem: demoItemReducer,
};
