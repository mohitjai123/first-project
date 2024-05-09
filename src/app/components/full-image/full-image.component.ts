import { Component, HostListener, Input } from '@angular/core';
import { HouseingLocation } from '../../houseing-location';
import { environment } from '../../../environments/environment';
import { HousingService } from '../../housing.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-full-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-image.component.html',
  styleUrl: './full-image.component.css'
})
export class FullImageComponent {
    apiUrl = environment.apiUrl+"/uploads/"
   @Input() data!:HouseingLocation;
   full = this.service.full;
   constructor(private service:HousingService){}
}
