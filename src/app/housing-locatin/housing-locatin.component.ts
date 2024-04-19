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
    <img class="rounded-t w-full h-[180px] " [src]="houseingLocation.photo" alt="Exterior photo of {{houseingLocation.name}}"/>
    <p class="text-xl py-1 mt-5 text-red-500 text-center w-full">{{houseingLocation.name}}</p>
   <div class="flex items-center justify-center">
   <p class=" py-1 text-center">{{ houseingLocation.city}}, {{houseingLocation.state }}</p> 
   <p>{{message}}</p>
    <button (click)="handleLikedPlace(houseingLocation._id)" mat-icon-button [ngStyle]="{'color': liked ? 'red' : 'gray'}"  class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
      <mat-icon>favorite</mat-icon>
    </button>
   </div>
   <div *ngIf="home" class="grid gap-2">
   <button class="border border-red-500 rounded-md w-32 h-fit text-center py-1 mx-auto text-red-500 hover:bg-red-500 duration-150 hover:text-white " (click)="handleEdit(houseingLocation)">Update
    <span *ngIf="loading">. . .</span>
  </button>
   <button class="border border-red-500 rounded-md w-32 h-fit text-center py-1 mx-auto text-red-500 hover:bg-red-500 duration-150 hover:text-white " (click)="deleteLocation(houseingLocation._id)">Delete
    <span *ngIf="loading">. . .</span>
  </button>
   <a [routerLink]="['/details', houseingLocation._id]" class="bg-red-500 w-32 text-white px-4 py-1 text-center mx-auto rounded " >Learn more</a>
  
   </div>
   <a *ngIf="!home" [routerLink]="['/details', houseingLocation._id]" class="bg-red-500 w-32 text-white px-4 py-1 text-center mx-auto rounded " >Learn more</a>

  </section>
  `,
  styleUrl: './housing-locatin.component.css'
})
export class HousingLocatinComponent {
      @Input() houseingLocation!: HouseingLocation;
      @Input() home!: boolean;
      loading:boolean = false;
      message:string = "";
      liked = false
      update = this.service.updateDataDetails.data;
      constructor(private service:HousingService){}
      ngOnChanges():void{
        const likedData = this.service.getLikedPlace();
        const indx = likedData.findIndex((item)=>item._id==this.houseingLocation._id);
        if(indx!=-1){
          this.liked = true
        }
      }
      handleEdit(details:any){
        this.service.updateDataDetails.edit = true;
        this.service.updateDataDetails.id = details._id
        this.update.set({name:details.name, availableUnit:details.availableUnit, wifi:details.wifi, photo:details.photo, city:details.city, state:details.state}); 
      }
      deleteLocation(id:string){
        this.loading = true
        this.service.deleteHousingLocation(id).subscribe({next:(res:any)=>{
            console.log(res);
            this.loading = false
            this.message = res.message
            setTimeout(() => {
              this.message = ""
            }, 2000);
            location.reload()
        },error:(err:any)=>{
          this.loading = false
          this.message = err.error.message;
          setTimeout(() => {
            this.message = ""
          }, 2000);
        }})
      }
      handleLikedPlace(id:string){
        this.service.addLikedPlace(id);
        const likedData = this.service.getLikedPlace();
        const indx = likedData.findIndex((item)=>item._id==this.houseingLocation._id);
        if(indx!=-1){
          this.liked = true
        }
        else {
          this.liked = false
        }
      }
}
