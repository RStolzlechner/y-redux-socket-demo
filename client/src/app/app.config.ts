import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { routes } from './app.routes';
import { testReducer } from './ng-rx-store/test/test.reducer';
import { rootReducer } from './ng-rx-store/state';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ...(StoreModule.forRoot(rootReducer).providers ?? [])],
};
