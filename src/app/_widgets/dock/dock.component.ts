import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { WindowService } from "../../_services/window.service";

@Component({
  selector: 'app-dock',
  inputs: ['winlist','iconWidth'],
  templateUrl: 'dock.component.html',
  styleUrls: ['dock.component.css']
})
export class DockComponent implements OnInit {
  @ViewChild("dockdiv") private dock: ElementRef;
  private arrayImg : HTMLCollection;
  private winlist: any[];

  private iconWidth : number = 30;
  private minimalScale: number = 0.5;
  private minimalDistance: number = 300;

  //postion de depart d'apparition des fenetres
  private x_pos:number = 20;
  private y_pos:number = 20;

  constructor(private _wm: WindowService ){

  }

  ngOnInit() {
		this.arrayImg = this.dock.nativeElement.children;

		document.onmousemove = (ev) => {
      this.onMovement(ev);
		};
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

  private dockSelect(id){
    //get win param by id
    let win = this.winlist.filter((win)=>{
      return (win.id==id);
    })[0];

    //verify if not duplicated
    if(!win.opened){
      win.opened = true;

      //on laisse passé un timeout, pour avoir le temps de construire le dom
      setTimeout((scope)=>{
        let cur_win = scope._wm.createWindowFromQuery('#'+win.id, {
          title: win.title,
          width: 250,
          height: 280,
          x: scope.x_pos,
          y: scope.y_pos,
          events: {
            closed: ()=>{
              console.log('closed sur '+win.id)
              cur_win.destroy();
              win.opened = false;
              win.selected = false;
            },
            focus: ()=>{
              console.log('focus sur '+win.id);
              scope.winlist.forEach((autre)=>{
                autre.selected = false;
              });
              win.selected = true;
            }
          }
        });
        win.ref = cur_win;
      },0,this);


      //on incremente la position
      this.x_pos += 10;
      this.y_pos += 10;
    }
    else{
      console.log('on selectionne depuis le menu');
      win.ref.focus();
    }
    return false;
  }

}
