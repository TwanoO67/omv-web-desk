import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-dock',
  inputs: ['icons'],
  templateUrl: 'dock.component.html',
  styleUrls: ['dock.component.css']
})
export class DockComponent implements OnInit {
  @Output() select: EventEmitter<any> = new EventEmitter();
  @ViewChild("dockdiv") private dock: ElementRef;
  private arrayImg : HTMLCollection;

  private iconWidth : number = 64;
  private minimalScale: number = 0.5;
  private minimalDistance: number = 300;

  constructor() {

  }

  ngOnInit() {
		this.arrayImg = this.dock.nativeElement.children;

		document.onmousemove = (ev) => {
      this.onMovement(ev);
		};
  }

  private emitSelect(id){
    this.select.emit(id);
  }

  private onMovement(ev){
    let oEvent: MouseEvent = <MouseEvent>ev||<MouseEvent>event;
    for(let i = 0; i < this.arrayImg.length; i++) {
      let elem : HTMLElement = <HTMLElement>this.arrayImg[i];
      //calculates the horizontal and vertival distance from cursor to the center of each image
      let a = elem.offsetLeft+elem.offsetWidth/2 - oEvent.clientX;
      let b = elem.offsetTop+ this.dock.nativeElement.offsetTop + elem.offsetHeight/2 - oEvent.clientY;
      //calculates the staight distance from cursor to the center of each image
      let c =	Math.sqrt(a*a+b*b);
      //as the distance becomes smaller, the scale should be larger, 500 is a factor that can be customized to adjust
      //the distance where the dock can sense the cursor moves towards it
      let scale = 1-c/this.minimalDistance;
      //always set the 1/2 scale no matter how far the cursor is away from the dock
      if( scale<this.minimalScale ){
        scale=this.minimalScale
      }
      elem.style.width = this.iconWidth*scale+'px';
    }
  }

}
