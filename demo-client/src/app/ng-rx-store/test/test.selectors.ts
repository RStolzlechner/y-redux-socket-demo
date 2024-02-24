import { createSelector } from "@ngrx/store";
import { RootState } from "../state";

const selectTestState = (state: RootState) => state.test;

const selectHttpRequestResponse = createSelector(selectTestState, (state) => {
  return state.httpRequestResponse;
});

export const testSelectors = {
  selectHttpRequestResponse,
};
