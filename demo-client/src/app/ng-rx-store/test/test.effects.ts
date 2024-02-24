import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RootState } from '../state';
import { testActions } from './test.actions';
import { concatMap, delay, map, tap } from 'rxjs';
import { TestHttpService } from '../../communication/api/test-http.service';

@Injectable({ providedIn: 'root' })
export class TestEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private testHttpService: TestHttpService,
  ) {}

  httpRequestResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(testActions.httpRequestResponse),
      concatMap(() =>
        this.testHttpService.ping().pipe(
          map((result) => {
            console.log('result', result);
            return testActions.httpRequestResponseSuccess({
              serverResponse: result.message,
            });
          }),
        ),
      ),
    ),
  );
}
