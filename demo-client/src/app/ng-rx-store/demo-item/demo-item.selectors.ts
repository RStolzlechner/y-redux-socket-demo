import { RootState } from '../state';
import { createSelector } from '@ngrx/store';
import { DemoItem } from '../../models/demo-item';

const selectDemoItemState = (state: RootState) => state.demoItem;

const selectDemoItems = createSelector(
  selectDemoItemState,
  (state): DemoItem[] => {
    return Object.values(state.entities);
  },
);

const selectDemoItemById = (id: number) =>
  createSelector(selectDemoItemState, (state): DemoItem | undefined => {
    return state.entities[id];
  });

export const demoItemSelectors = {
  selectDemoItems,
  selectDemoItemById,
};
