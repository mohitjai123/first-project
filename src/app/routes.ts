import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FirstComponentComponent } from './first-component/first-component.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TypingPageComponent } from './typing-page/typing-page.component';
import { UserPageComponent } from './user-page/user-page.component';

const routeConfig: Routes = [
    {
      path: 'admin',
      canActivate:[AuthGuard],
      component: HomeComponent,
      title: 'Admin Home page'
    },
    {path:"", component:UserPageComponent, title:"Home Page"},
    {
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Home details'
    },
    {
      path: 'login',
      component: LoginComponent,
      title: 'Login Page'
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
  
  export default routeConfig;