import { DemoItem } from '../../models/demo-item';

export interface DemoItemState {
  loaded: boolean;
  entities: { [id: number]: DemoItem };
}

export const initialDemoItemState: DemoItemState = {
  loaded: false,
  entities: {},
};
