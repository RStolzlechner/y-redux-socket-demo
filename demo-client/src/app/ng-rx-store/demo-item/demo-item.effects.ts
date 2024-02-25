import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { demoItemActions } from './demo-item.actions';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DemoItemEffects {
  constructor(private actions$: Actions) {}

  yReduxSocketConnect = createEffect(() =>
    this.actions$.pipe(
      ofType(demoItemActions.yReduxSocketConnect),
      map(() => {
        //todo call hub to connect and get data
        return demoItemActions.loadSuccess({ items: [] });
      }),
    ),
  );

  createUpdateOrDelete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          demoItemActions.create,
          demoItemActions.update,
          demoItemActions.remove,
        ),
        tap((action) => {
          //todo call y-redux-socket endpoint to trigger update
        }),
      ),
    { dispatch: false },
  );
}
