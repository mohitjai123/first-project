import { Component, Input, SimpleChanges, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HousingService } from '../housing.service';
import { HouseingLocation } from '../houseing-location';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { environment } from '../../environments/environment';
import { FullImageComponent } from '../components/full-image/full-image.component';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonToggleModule, FullImageComponent],
  templateUrl:'./details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  api = environment.apiUrl+"/uploads/"
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation = this.housingService.detailsPage;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });
  full = this.housingService.full;
  constructor() {
    const id = String(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(id)?.subscribe(res=>
      this.housingLocation.set(res)
    );    
  }
  ngOnInit():void{
    this.housingService.getClientResponse().subscribe(res=>console.log(res))
  }
  setValue(e:any){
    console.log(e.target.value);
  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    ).subscribe(res=>console.log(res))
  }
}
