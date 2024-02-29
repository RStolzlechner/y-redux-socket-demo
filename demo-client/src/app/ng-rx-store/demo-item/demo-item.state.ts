import { DemoItem } from '../../models/demo-item';

export interface DemoItemState {
  loading: boolean;
  loaded: boolean;
  entities: { [id: number]: DemoItem };
}

export const initialDemoItemState: DemoItemState = {
  loading: false,
  loaded: false,
  entities: {},
};
