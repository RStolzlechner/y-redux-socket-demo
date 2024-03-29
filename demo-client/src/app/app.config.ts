import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { StoreModule, provideState, provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { testReducer } from './ng-rx-store/test/test.reducer';
import { rootReducer } from './ng-rx-store/state';
import {
  EffectsModule,
  USER_PROVIDED_EFFECTS,
  provideEffects,
} from '@ngrx/effects';
import { TestEffects } from './ng-rx-store/test/test.effects';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { DemoItemEffects } from './ng-rx-store/demo-item/demo-item.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(rootReducer),
    provideEffects([TestEffects, DemoItemEffects]),
    provideHttpClient(),
  ],
};
