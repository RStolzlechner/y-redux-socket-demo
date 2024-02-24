import { createAction, props } from '@ngrx/store';

const httpRequestResponse = createAction('Test call server');
const httpRequestResponseSuccess = createAction('Test call server success', props<{ serverResponse: string }>());

export const testActions = {
    httpRequestResponse,
    httpRequestResponseSuccess
}
