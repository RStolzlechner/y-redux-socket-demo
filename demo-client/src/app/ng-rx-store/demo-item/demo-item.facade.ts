import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DemoItemState } from './demo-item.state';
import { demoItemSelectors } from './demo-item.selectors';
import { RootState } from '../state';
import { firstValueFrom, Observable, of, tap } from 'rxjs';
import { demoItemActions } from './demo-item.actions';
import { DemoItem } from '../../models/demo-item';

@Injectable({
  providedIn: 'root',
})
export class DemoItemFacade {
  constructor(private readonly store: Store<RootState>) {}

  public load = async (): Promise<void> => {
    const loadState = await firstValueFrom(
      this.store.select(demoItemSelectors.selectDemoItemLoadState),
    );
    if (loadState.loading || loadState.loaded) return;

    this.store.dispatch(demoItemActions.load());
  };

  public create = (item: DemoItem): void =>
    this.store.dispatch(demoItemActions.create(item));

  public update = (item: DemoItem): void =>
    this.store.dispatch(demoItemActions.update(item));

  public remove = (id: number): void =>
    this.store.dispatch(demoItemActions.remove({ id }));

  public select = (id: number): void =>
    this.store.dispatch(demoItemActions.select({ id }));

  public count$ = (): Observable<{ count: number }> =>
    this.store.select(demoItemSelectors.selectDemoItemCount);

  public items$ = (): Observable<DemoItem[]> =>
    this.store.select(demoItemSelectors.selectDemoItems);

  public selectedId$ = (): Observable<{ id: number }> =>
    this.store.select(demoItemSelectors.selectSelectedId);

  public selectedItem$ = (): Observable<DemoItem | undefined> =>
    this.store.select(demoItemSelectors.selectedItem);
}
