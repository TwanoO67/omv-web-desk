import { Component } from '@angular/core';
import { DockComponent } from "./_widgets/dock/dock.component";
import { WindowService } from "./_services/window.service";
import { NavbarItem, NavbarSubItem} from "./_models/navbar-item";
import { DockItem } from "./_models/dock-item";

declare var WEBDESK_CONFIG;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  private winlist: DockItem[] = [];
  private navitems: NavbarItem[] = [];
  private iconWidth: number = 30;

  //get conf
  private dock_conf: any = null;

  constructor(private _wm: WindowService ){
    //recupere la conf pour le user
    if( WEBDESK_CONFIG['username'] ){
      let user = WEBDESK_CONFIG['username'];
      if(WEBDESK_CONFIG['dock'][user])
        this.dock_conf = WEBDESK_CONFIG['dock'][user];
    }
    //sinon conf par defaut
    if( !this.dock_conf ){
      this.dock_conf = WEBDESK_CONFIG['dock']['default'];
    }

    this.dock_conf.forEach((win)=>{
      this.winlist.push(new DockItem(win));
    });

    WEBDESK_CONFIG['navbar'].forEach((win)=>{
      this.navitems.push(new NavbarItem(win));
    });

    this.iconWidth = WEBDESK_CONFIG['iconWidth'];
  }

 public ngOnInit(){


 }



 private toggleExpose(){
   this._wm.toggleExpose();
 }

 private winresize(){
   console.log('da')
 }



}
