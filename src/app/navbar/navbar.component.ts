import { Component, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import { HousingService } from '../housing.service';
import { Router, RouterLink } from '@angular/router';
import { HouseingLocation } from '../houseing-location';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule,RouterLink,CommonModule, MatButtonModule, MatIconModule, MatBadgeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  likedplace:HouseingLocation[] = [];
  constructor(public service:HousingService, private route:Router){
  }
  ngOnInit():void{
    this.likedplace = this.service.getLikedPlace();
  }
  sidenav = false;
  handelSideNav(){
    this.sidenav= !this.sidenav;
  }
  logOut(){
    localStorage.clear();
    this.route.navigate(['/login'])
  }
}
