import { Component } from '@angular/core';
import { DockComponent } from "./_widgets/dock/dock.component";
import { WindowService } from "./_services/window.service";
import { NavbarItem, NavbarSubItem} from "./_models/navbar-item";
import { DockItem } from "./_models/dock-item";

declare var NG2OS_CONFIG;
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
    if( NG2OS_CONFIG['username'] ){
      let user = NG2OS_CONFIG['username'];
      if(NG2OS_CONFIG['dock'][user])
        this.dock_conf = NG2OS_CONFIG['dock'][user];
    }
    //sinon conf par defaut
    if( !this.dock_conf ){
      this.dock_conf = NG2OS_CONFIG['dock']['default'];
    }

    this.dock_conf.forEach((win)=>{
      this.winlist.push(new DockItem(win));
    });

    NG2OS_CONFIG['navbar'].forEach((win)=>{
      this.navitems.push(new NavbarItem(win));
    });

    this.iconWidth = NG2OS_CONFIG['iconWidth'];
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
