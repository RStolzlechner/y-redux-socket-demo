import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { demoItemActions } from './demo-item.actions';
import { map, switchMap, tap } from 'rxjs';
import { DemoItemHub } from '../../communication/signal-r/demo-item.hub';
import { DemoItemApi } from '../../communication/api/demo-item.api';

/**
  Effects for the demo item feature. It listens to dispatched actions and triggers side effects.
  The effects are used to handle async operations, such as loading data from a server.
 */
@Injectable({ providedIn: 'root' })
export class DemoItemEffects {
  /**
   Constructor to inject the dependencies.
   @param actions$ The NgRx Actions service to listen to dispatched actions.
   @param demoItemHub The demo item hub to communicate with the server using websocket protocol.
   */
  constructor(
    private actions$: Actions,
    private readonly demoItemHub: DemoItemHub,
  ) {}

  /**
   * Effect to load the demo items from the server.
   * Calling loadDemoItems will also register the client on the server to receive updates.
   */
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
}
