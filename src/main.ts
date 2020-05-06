import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


import { cultureCoreInit } from '@orxe-culture/core';
import translation from './assets/locales/en.json';
// set default language to `en` and set resources
const resources = { en: { translation } };

cultureCoreInit({ resources, production: environment.production });

import './components';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
