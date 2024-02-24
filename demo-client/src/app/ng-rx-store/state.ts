import { testReducer } from "./test/test.reducer";
import { TestState } from "./test/test.state";

export interface RootState {
    test: TestState;
}

export const rootReducer = {
    test: testReducer
}