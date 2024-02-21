import { createReducer, on } from "@ngrx/store";
import { actions } from "./actions";
import { initialState } from "./state";

export const reducer = createReducer(
    initialState,
    on(actions.testCallServer, (state) => ({ ...state, serverResponse: 'Calling server ....' })),
    on(actions.testCallServerSuccess, (state, { serverResponse }) => ({ ...state, serverResponse }))
);