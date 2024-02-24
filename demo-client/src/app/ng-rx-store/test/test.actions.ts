import { createAction, props } from '@ngrx/store';

const httpRequestResponse = createAction('http-request-response');
const httpRequestResponseSuccess = createAction(
  'http-request-response-success',
  props<{ serverResponse: string }>(),
);

const httpRequestSignalRResponse = createAction(
  'http-request-signalr-response',
);
const httpRequestSignalRResponseSuccess = createAction(
  'http-request-signalr-response-success',
  props<{ serverResponse: string }>(),
);

const signalRRequestResponse = createAction('signalr-request-response');
const signalRRequestResponseSuccess = createAction(
  'singalr-request-response-success',
  props<{ serverResponse: string }>(),
);

export const testActions = {
  httpRequestResponse,
  httpRequestResponseSuccess,
  httpRequestSignalRResponse,
  httpRequestSignalRResponseSuccess,
  signalRRequestResponse,
  signalRRequestResponseSuccess,
};
