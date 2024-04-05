import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseingLocation } from '../houseing-location';
import { RouterLink } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { HousingService } from '../housing.service';
 
@Component({
  selector: 'app-housing-locatin',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconButton, MatIcon],
  template: `
  <section class="flex flex-col bg-red-50 mx-auto w-60 overflow-hidden h-96 relative rounded-xl border ">
    <img class="rounded-t w-full h-2/3 " [src]="houseingLocation.photo" alt="Exterior photo of {{houseingLocation.name}}"/>
    <p class="text-xl py-1 mt-5 text-red-500 text-center w-full">{{houseingLocation.name}}</p>
   <div class="flex items-center justify-center">
   <p class=" py-1 text-center">{{ houseingLocation.city}}, {{houseingLocation.state }}</p> 
    <button (click)="handleLikedPlace(houseingLocation.id)" mat-icon-button [ngStyle]="{'color': liked ? 'red' : 'gray'}"  class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
      <mat-icon>favorite</mat-icon>
    </button>
   </div>
   <a [routerLink]="['/details', houseingLocation.id]" class="bg-red-500 text-white px-4 py-1 w-fit mx-auto rounded " >Learn more</a>
  
  </section>
  `,
  styleUrl: './housing-locatin.component.css'
})
export class HousingLocatinComponent {
      @Input() houseingLocation!: HouseingLocation;
      liked = false
      constructor(private service:HousingService){}
      ngOnChanges():void{
        const likedData = this.service.getLikedPlace();
        const indx = likedData.findIndex((item)=>item.id==this.houseingLocation.id);
        if(indx!=-1){
          this.liked = true
        }
      }
      handleLikedPlace(id:string){
        this.service.addLikedPlace(id);
        const likedData = this.service.getLikedPlace();
        const indx = likedData.findIndex((item)=>item.id==this.houseingLocation.id);
        if(indx!=-1){
          this.liked = true
        }
        else {
          this.liked = false
        }
      }
}
