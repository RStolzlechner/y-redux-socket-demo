export interface TestState {
  httpRequestResponse: string;
  httpRequestSignalRResponse: string;
  signalRRequestResponse: string;
}

export const initialTestState: TestState = {
  httpRequestResponse: 'No request made yet.',
  httpRequestSignalRResponse: 'No request made yet.',
  signalRRequestResponse: 'No request made yet.',
};
