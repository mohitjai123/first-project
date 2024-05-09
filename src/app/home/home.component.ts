import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import { HouseingLocation } from '../houseing-location';

import { CarouselModule} from "ngx-owl-carousel-o"
import { HousingLocatinComponent } from '../housing-locatin/housing-locatin.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FullImageComponent } from '../components/full-image/full-image.component';
import { File } from 'buffer';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselModule, HousingLocatinComponent, RouterLink, FullImageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingLocationList: HouseingLocation[] = [];
  updateData = this.housingService.updateDataDetails.data;
  filteredLocationList = signal<HouseingLocation[]>([]);
  likedPlace:HouseingLocation[] = [];
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList.set(this.housingLocationList);
      return;
    }
    this.filteredLocationList.set(this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    ));
  }
  constructor(public housingService:HousingService) {
    
  }

  handleImage(e:any){
      // console.log(e.target.files[0]);
      
      // this.file=e.target.files[0];
      this.updateData().photo = e.target.files[0]
  }
  ngOnInit():void{
    this.getHousingData();
  }
  getHousingData(){
      this.housingService.getAllHousingLocations().subscribe(res=>{
        console.log(res);
        
      this.housingLocationList = res
      this.filteredLocationList.set(this.housingLocationList);
      this.likedPlace = this.housingService.likedPlace();
      });
  }
  handleAddData(){
    if(this.housingService.updateDataDetails.edit){
        this.housingService.updateHousingLocation(this.housingService.updateDataDetails.id, this.updateData()).subscribe((res:any)=> {
          if(res.message)
          this.updateData.set({
            name:"",
            photo:"",
            city:"",
            state:"",
            wifi:false,
            description:""
          })
          this.housingService.updateDataDetails.edit=false;
          this.getHousingData()
        })
    }
    else {
      console.log("my data", this.updateData());
      this.housingService.createHousing(this.updateData()).subscribe((res:any)=>{
        if(res.message)
          this.updateData.set({
            name:"",
            photo:"",
            city:"",
            state:"",
            wifi:false,
            description: ""
          })
          this.getHousingData()
        })
    }
  }

}


