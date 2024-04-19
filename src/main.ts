import { bootstrapApplication } from '@angular/platform-browser';
import {provideRouter} from "@angular/router"
import routeConfig from './app/routes';
import { AppComponent } from './app/app.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent,
  {
    providers: [
      // provideProtractorTestingSupport(),
      provideRouter(routeConfig),
      provideNoopAnimations(), provideAnimationsAsync(), provideHttpClient()
    ]
  }
).catch(err => console.error(err));