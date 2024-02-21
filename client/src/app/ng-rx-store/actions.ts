import { createAction, props } from '@ngrx/store';

const testCallServer = createAction('Test call server');
const testCallServerSuccess = createAction('Test call server success', props<{ serverResponse: string }>());

export const actions = {
    testCallServer,
    testCallServerSuccess
}