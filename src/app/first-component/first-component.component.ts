import { Component, NgModule } from '@angular/core';
import { HousingService } from '../housing.service';
import { HouseingLocation } from '../houseing-location';
import { CommonModule } from '@angular/common';
import { HousingLocatinComponent } from '../housing-locatin/housing-locatin.component';
import { DialogComponent } from '../components/dialog/dialog.component';


@Component({
  selector: 'app-first-component',
  standalone: true,
  imports: [CommonModule, HousingLocatinComponent, DialogComponent],
  templateUrl: './first-component.component.html',
  styleUrl: './first-component.component.css'
})
export class FirstComponentComponent {
  likedPlace:HouseingLocation[]=[];
   constructor(private service:HousingService){}
   ngOnInit():void{
   this.likedPlace = this.service.getLikedPlace();
   }
}
