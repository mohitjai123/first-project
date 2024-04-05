import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FirstComponentComponent } from './first-component/first-component.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page'
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
];
