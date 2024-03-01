import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { demoItemActions } from './demo-item.actions';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DemoItemEffects {
  constructor(private actions$: Actions) {}

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(demoItemActions.load),
      map(() => {
        console.log('I am loading');
        return demoItemActions.loadSuccess({
          items: [
            { name: 'TestItem1', description: 'TestDescription1', id: 1 },
            { name: 'TestItem2', description: 'TestDescription2', id: 2 },
          ],
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

  remove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(demoItemActions.remove),
      map(({ id }) => demoItemActions.removeSuccess({ id })),
    ),
  );
}
