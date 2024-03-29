import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RootState } from '../state';
import { testActions } from './test.actions';
import { concatMap, delay, map, tap } from 'rxjs';
import { TestHttpService } from '../../communication/api/test-http.service';
import { TestHub } from '../../communication/signal-r/test.hub';

@Injectable({ providedIn: 'root' })
export class TestEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private testHttpService: TestHttpService,
    private testHub: TestHub,
  ) {}

  httpRequestResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(testActions.httpRequestResponse),
      concatMap(() =>
        this.testHttpService.ping().pipe(
          map((result) => {
            return testActions.httpRequestResponseSuccess({
              serverResponse: result.message,
            });
          }),
        ),
      ),
    ),
  );

  httpRequestSignalRResponse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(testActions.httpRequestSignalRResponse),
        tap(() => this.testHttpService.signalRResponse().subscribe()),
      ),
    { dispatch: false },
  );

  signalRRequestResponse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(testActions.signalRRequestResponse),
        tap(async () => await this.testHub.testCallServer()),
      ),
    { dispatch: false },
  );
}
