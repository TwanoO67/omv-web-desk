import { Component } from '@angular/core';
import { DockComponent } from "./_widgets/dock/dock.component";
import { WindowService } from "./_services/window.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  private x_pos:number = 20;
  private y_pos:number = 20;

  private winlist: any[] = [{
    id: "about",
    image: "/assets/2.png",
    title: "test gen",
    text: `tetete`,
    opened: false,
    selected: false,
    ref: null
  },{
    id: "about2",
    image: "/assets/2.png",
    title: "test gen 2",
    text: `tetete 2`,
    opened: false,
    selected: false,
    ref: null
  },{
    id: "codiad",
    image: "/assets/2.png",
    title: "Codiad iframe",
    iframe: "http://demo.codiad.com",
    opened: false,
    selected: false,
    ref: null
  }];

  constructor(private _wm: WindowService ){

  }

 public ngOnInit(){
 }

public dockSelect(id){
  //get win param by id
  let win = this.winlist.filter((win)=>{
    return (win.id==id);
  })[0];

  //verify if not duplicated
  if(!win.opened){
    let cur_win = this._wm.createWindowFromQuery('.mywin .'+win.id, {
      title: win.title,
      width: 250,
      height: 280,
      x: this.x_pos,
      y: this.y_pos,
      events: {
        closed: ()=>{
          console.log('closed sur '+win.id)
          cur_win.destroy();
          win.opened = false;
          win.selected = false;
        },
        focus: ()=>{
          console.log('focus sur '+win.id);
          this.winlist.forEach((autre)=>{
            autre.selected = false;
          });
          win.selected = true;
        }
      }
    });
    win.ref = cur_win;
    win.opened = true;
    //on incremente la position
    this.x_pos += 10;
    this.y_pos += 10;
  }
  else{
    console.log('on selectionne depuis le menu');
    win.ref.focus();
  }



}

 private toggleExpose(){
   this._wm.toggleExpose();
 }

 private winresize(){
   console.log('da')
 }



}
