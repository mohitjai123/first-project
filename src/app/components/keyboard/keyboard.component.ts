import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent {
  @HostListener( 'window:keydown', [ '$event' ] )
  handleKeyboardEventkeydown(event: KeyboardEvent) {
    const ele = document.getElementById(`${event.code.toLowerCase()}`);
    if(ele){
      const prevClass = ele.classList[8].split("-")[1];
      ele.style.backgroundColor = `${prevClass}`
    }   
  }
  @HostListener( 'window:keyup', [ '$event' ] )
  handleKeyboardEventkeyup(event: KeyboardEvent) {
    const ele = document.getElementById(`${event.code.toLowerCase()}`);
    if(ele){
      ele.style.backgroundColor = ``
    }
  }
  
}
