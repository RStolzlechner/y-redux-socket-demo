import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { demoItemActions } from './demo-item.actions';
import { map, switchMap, tap } from 'rxjs';
import { DemoItemHub } from '../../communication/signal-r/demo-item.hub';

@Injectable({ providedIn: 'root' })
export class DemoItemEffects {
  constructor(
    private actions$: Actions,
    private readonly demoItemHub: DemoItemHub,
  ) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(demoItemActions.load),
      switchMap(async () => {
        const items = await this.demoItemHub.loadDemoItems();
        return demoItemActions.loadSuccess({
          items,
        });
      }),
    ),
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(demoItemActions.create),
      tap((action) => {
        //todo call y-redux-socket endpoint to trigger update
      }),
      map(({ name, description }) => {
        //get random id
        const id = Math.floor(Math.random() * 100);
        return demoItemActions.createSuccess({ id, name, description });
      }),
    ),
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(demoItemActions.update),
      tap((action) => {
        //todo call y-redux-socket endpoint to trigger update
      }),
      map((action) => {
        //get random id
        return demoItemActions.updateSuccess(action);
      }),
    ),
  );

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(demoItemActions.remove),
      map(({ id }) => demoItemActions.removeSuccess({ id })),
    ),
  );
}
