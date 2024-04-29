import { Component, HostListener, Inject, afterNextRender } from '@angular/core';
import { KeyboardComponent } from '../components/keyboard/keyboard.component';
import { FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-typing-page',
  standalone: true,
  imports: [KeyboardComponent, FormsModule],
  templateUrl: './typing-page.component.html',
  styleUrl: './typing-page.component.css'
})
export class TypingPageComponent {
  
  spanPointer = 0;
  divPointer = 0;
  length = 0;
  stime= 0;
  etime= 0;
  container:any; 
  enterValue = ""
  value = `If you don't like a test prompt, you can get a different (random) prompt with the "change test" button - or select a specific paragraph to type from the list below. In order to complete the test and save your score, you need to get 100% accuracy.`
  constructor( @Inject(DOCUMENT) private document:Document){
    afterNextRender(() => {
      this.container = document.getElementById("input");
     });
  }


  ngOnInit(){
    setTimeout(() => {
      this.length = this.container.childNodes.length-3;
    }, 2000);
  }
  @HostListener( 'window:keypress', [ '$event' ] )
  handleKeyboardEventkeydown(event: KeyboardEvent) {
    const divElement:any = this.container.childNodes[this.divPointer];
    const spanElement:any = divElement.childNodes[this.spanPointer];
    const divLength = divElement.childNodes.length-1;
    const val = spanElement.childNodes[0].nodeValue;

    if(this.divPointer==0){
      this.stime = new Date().getTime();
    }
    this.container?.focus();
    if(val==event.key){
    spanElement.classList.add("green-text");
    this.enterValue=this.enterValue+event.key;
    this.spanPointer++;
  }
  else{
    this.enterValue=this.enterValue+event.key;
    spanElement.classList.add("red-text");
    this.spanPointer++;
  }
  if(val==" "){
    this.divPointer++;
    this.spanPointer=0;
  }

  console.log(this.length);
  console.log(this.divPointer);
  
  if(this.length==this.divPointer && this.spanPointer == divLength){
    this.etime = new Date().getTime();
    this.etime = (this.etime - this.stime)/1000;
    this.etime = this.etime/60;
    let count = 0;
    let error = 0;
    let speed = 0;
    for(let div of this.container.childNodes){
      for(let span of div.childNodes)
         if(span.classList && span.classList[1]=="green-text")
             count++
          else {
            error++;
          }
    }
    error = Math.round((error/7)/this.etime);
    speed = (this.enterValue.length/5)/this.etime;
    speed = speed-error;
    count = count*100;
    count = count/this.enterValue.length;
    const spee= document.getElementById("speed");
    if(spee){
      spee.innerHTML = `Speed : ${Math.floor(speed)}`
    }
    const p = document.getElementById("typString");
    if(p)
      p.innerHTML = `Accuracy : ${Math.floor(count)}`
  }
  }
}
