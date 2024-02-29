import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DemoItemState } from './demo-item.state';
import { demoItemSelectors } from './demo-item.selectors';
import { RootState } from '../state';
import { firstValueFrom, Observable, of, tap } from 'rxjs';
import { demoItemActions } from './demo-item.actions';

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

  public count$ = (): Observable<{ count: number }> =>
    this.store.select(demoItemSelectors.selectDemoItemCount);
}
