import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { demoItemSelectors } from './demo-item.selectors';
import { RootState } from '../state';
import { firstValueFrom, Observable } from 'rxjs';
import { demoItemActions } from './demo-item.actions';
import { DemoItem } from '../../models/demo-item';
import { DemoItemApi } from '../../communication/api/demo-item.api';
import { TypedAction } from '@ngrx/store/src/models';
import { DemoItemHub } from '../../communication/signal-r/demo-item.hub';

/**
 * The facade for the demo item feature. It provides methods to dispatch actions and select data from the store.
 */
@Injectable({
  providedIn: 'root',
})
export class DemoItemFacade {
  /**
   * Constructor to inject the dependencies.
   * @param store The Redux store to dispatch actions and select data from the store.
   * @param apiService The demo item API service to communicate with the server.
   * @param demoItemHub
   */
  constructor(
    private readonly store: Store<RootState>,
    private readonly apiService: DemoItemApi,
    private readonly demoItemHub: DemoItemHub,
  ) {}

  /**
   * Load the demo items from the server.
   */
  public load = async (): Promise<void> => {
    const loadState = await firstValueFrom(
      this.store.select(demoItemSelectors.selectDemoItemLoadState),
    );
    if (loadState.loading || loadState.loaded) return;

    const response = await this.demoItemHub.loadDemoItems();
    this.store.dispatch(demoItemActions.loadSuccess(response));
  };

  /**
   * Create a new demo item.
   * @param item The new demo item
   */
  public create = async (item: DemoItem) => {
    const action = demoItemActions.create(item);
    await this.demoItemHub.sendNotDispatchedToServer(action);
  };

  /**
   * Update an existing demo item.
   * @param item The demo item to update
   */
  public update = async (item: DemoItem) => {
    const action = demoItemActions.update(item);
    await this.demoItemHub.sendNotDispatchedToServer(action);
  };

  /**
   * Remove a demo item.
   * @param id The id of the demo item to remove
   */
  public remove = async (id: number) => {
    const action = demoItemActions.remove({ id });
    await this.demoItemHub.sendNotDispatchedToServer(action);
  };

  public duplicate = async (id: number) => {
    const action = demoItemActions.duplicate({ id });
    await this.demoItemHub.sendNotDispatchedToServer(action);
  };

  /**
   * Select a demo item.
   * @param id The id of the demo item to select
   */
  public select = (id: number): void =>
    this.store.dispatch(demoItemActions.select({ id }));

  /**
   * Get the number of demo items in the store.
   */
  public count$ = (): Observable<{ count: number }> =>
    this.store.select(demoItemSelectors.selectDemoItemCount);

  /**
   * Get the demo items from the store.
   */
  public items$ = (): Observable<DemoItem[]> =>
    this.store.select(demoItemSelectors.selectDemoItems);

  /**
   * Get the selected id from the store.
   */
  public selectedId$ = (): Observable<{ id: number }> =>
    this.store.select(demoItemSelectors.selectSelectedId);

  /**
   * Get the selected item from the store.
   */
  public selectedItem$ = (): Observable<DemoItem | undefined> =>
    this.store.select(demoItemSelectors.selectedItem);
}
