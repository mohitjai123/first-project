import { bootstrapApplication } from '@angular/platform-browser';
import {provideRouter} from "@angular/router"
import routeConfig from './app/routes';
import { AppComponent } from './app/app.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent,
  {
    providers: [
      // provideProtractorTestingSupport(),
      provideRouter(routeConfig),
      provideNoopAnimations(), provideAnimationsAsync()
    ]
  }
).catch(err => console.error(err));