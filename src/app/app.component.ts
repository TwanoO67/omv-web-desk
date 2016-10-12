import { Component } from '@angular/core';
import { DockComponent } from "./_widgets/dock/dock.component";
import { WindowService } from "./_services/window.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  private winlist = [{
    id: "about",
    image: "/assets/2.png",
    title: "test gen",
    text: `tetete`,
    opened: false
  },{
    id: "about2",
    image: "/assets/2.png",
    title: "test gen 2",
    text: `tetete 2`,
    opened: false
  },{
    id: "codiad",
    image: "/assets/2.png",
    title: "Codiad iframe",
    iframe: "http://demo.codiad.com",
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
      x: 10,
      y: 10,
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
