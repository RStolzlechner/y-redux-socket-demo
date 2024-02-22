import { createSelector } from "@ngrx/store";
import { RootState } from "../state";

const selectTestState = (state: RootState) => state.test;

const selectServerResponse = createSelector(selectTestState, (state) => {
  return state.serverResponse;
});

export const testSelectors = {
  selectServerResponse,
};
