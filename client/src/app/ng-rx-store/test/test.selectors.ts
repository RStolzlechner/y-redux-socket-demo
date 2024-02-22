import { createSelector } from "@ngrx/store";
import { RootState } from "../state";
import { TestState } from "./test.state";

const selectTestState = (state: RootState) => state.test; 

const selectServerResponse = createSelector(selectTestState, (state) => {
    console.log('selectServerResponse', state);
    return state.serverResponse;
});

export const testSelectors = {
    selectServerResponse
};