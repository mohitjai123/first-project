import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { FirstComponentComponent } from './first-component/first-component.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TypingPageComponent } from './typing-page/typing-page.component';

export const routes: Routes = [
    {
        path: '',
        canActivate:[AuthGuard],
        component: HomeComponent,
        title: 'Home page'
      },
      {
        path:'login',
        component:LoginComponent,
        title:"Login Page"
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Home details'
      },  
      {
        path: 'liked-place',
        component: FirstComponentComponent,
        title: 'Liked Place'
      },
      {
        path:"typing-page",
        component:TypingPageComponent,
        title:"Typing Test"
      }
];
