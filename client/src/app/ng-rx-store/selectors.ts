import { MyState } from "./state";

const selectServerResponse = (state: MyState) => state.serverResponse;

export const selectors = {
    selectServerResponse
};