import { Component } from '@angular/core';
import { DockComponent } from "./dock";
import { WindowService } from "./window.service";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  directives: [DockComponent],
  providers: [WindowService],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'app works!';

  private winlist = [{
    id: "about",
    image: "2.png",
    title: "test gen",
    text: `tetete`,
    opened: false
  },{
    id: "about2",
    image: "2.png",
    title: "test gen 2",
    text: `tetete 2`,
    opened: false
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
    this._wm.createWindowFromQuery('.mywin .'+win.id, {
      title: win.title,
      width: 250,
      height: 280,
      x: 140,
      y: 380,
      events: {
        closed: function() {
          console.log('eee')
          this.destroy();
          win.opened = false;
        }
      }
    });
    win.opened = true;
  }



}

 private toggleExpose(){
   this._wm.toggleExpose();
 }

 private winresize(){
   console.log('da')
 }



}
