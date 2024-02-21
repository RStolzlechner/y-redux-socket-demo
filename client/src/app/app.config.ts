import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { reducer } from './ng-rx-store/reducer';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ...(StoreModule.forRoot(reducer).providers ?? [])],
};
