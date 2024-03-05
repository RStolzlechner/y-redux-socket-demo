import { DemoItem } from '../../models/demo-item';

/**
 * The state of the demo item store.
 */
export interface DemoItemState {
  loading: boolean;
  loaded: boolean;
  entities: { [id: number]: DemoItem };
  selectedId: number;
}

/**
 * The initial state of the demo item store.
 */
export const initialDemoItemState: DemoItemState = {
  loading: false,
  loaded: false,
  entities: {},
  selectedId: 0,
};
