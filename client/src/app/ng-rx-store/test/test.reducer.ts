import { createReducer, on } from "@ngrx/store";
import { testActions } from "./test.actions";
import { initialTestState } from "./test.state";

export const testReducer = createReducer(
    initialTestState,
    on(testActions.testCallServer, (state) => ({ ...state, serverResponse: 'Calling server ....' })),
    on(testActions.testCallServerSuccess, (state, { serverResponse }) => ({ ...state, serverResponse }))
);