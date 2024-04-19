import { Component, HostListener, Input } from '@angular/core';
import { HouseingLocation } from '../../houseing-location';

@Component({
  selector: 'app-full-image',
  standalone: true,
  imports: [],
  templateUrl: './full-image.component.html',
  styleUrl: './full-image.component.css'
})
export class FullImageComponent {
   @Input() data!:HouseingLocation;
    size = 0;
    @HostListener("window:scroll", ['$event'])
    onScroll(){
      this.size = document.body.getBoundingClientRect().y;
      console.log(this.size);
      
    }

}
