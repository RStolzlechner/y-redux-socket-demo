import { DemoItem } from '../../models/demo-item';

export interface DemoItemState {
  loading: boolean;
  loaded: boolean;
  entities: { [id: number]: DemoItem };
  selectedId: number;
}

export const initialDemoItemState: DemoItemState = {
  loading: false,
  loaded: false,
  entities: {},
  selectedId: 0,
};
