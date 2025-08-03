import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
//import { firebaseProviders } from './firebase.config';
import { routes } from './app-routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

const NO_NG_MODULES = importProvidersFrom([BrowserAnimationsModule]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    //firebaseProviders,
    NO_NG_MODULES,
    {
      provide: '',
      useValue: {
        appearance: 'outline',
        color: 'accent',
      },
    },
  ],
};
