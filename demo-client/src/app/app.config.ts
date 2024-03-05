import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { rootReducer } from './ng-rx-store/state';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { DemoItemEffects } from './ng-rx-store/demo-item/demo-item.effects';

/**
 * The configuration for the application.
 * It provides the router, the store and the effects.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(rootReducer),
    provideEffects([DemoItemEffects]),
    provideHttpClient(),
  ],
};
