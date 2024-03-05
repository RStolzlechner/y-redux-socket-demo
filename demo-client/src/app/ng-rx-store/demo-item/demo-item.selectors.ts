import { RootState } from '../state';
import { createSelector } from '@ngrx/store';
import { DemoItem } from '../../models/demo-item';

const selectDemoItemState = (state: RootState) => state.demoItem;

const selectDemoItemLoadState = createSelector(
  selectDemoItemState,
  (state) => ({
    loaded: state.loaded,
    loading: state.loading,
  }),
);

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

const selectDemoItemCount = createSelector(selectDemoItems, (items) => ({
  count: items.length,
}));

const selectSelectedId = createSelector(selectDemoItemState, (state) => ({
  id: state.selectedId,
}));

const selectedItem = createSelector(selectDemoItemState, (state) => {
  const id = state.selectedId;
  if (!id) return undefined;
  return state.entities[id];
});

/**
 * The selectors for the demo item store.
 */
export const demoItemSelectors = {
  selectDemoItems,
  selectDemoItemLoadState,
  selectDemoItemById,
  selectDemoItemCount,
  selectSelectedId,
  selectedItem,
};
