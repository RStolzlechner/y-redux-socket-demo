import { createReducer, on } from "@ngrx/store";
import { testActions } from "./test.actions";
import {initialTestState, TestState} from "./test.state";

export const testReducer = createReducer(
    initialTestState,
    on(testActions.httpRequestResponse, (state): TestState => ({ ...state, httpRequestResponse: 'Calling server ....' })),
    on(testActions.httpRequestResponseSuccess, (state, { serverResponse }): TestState => ({ ...state,httpRequestResponse: serverResponse }))
);
