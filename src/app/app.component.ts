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

  constructor(private _wm: WindowService ){

  }

 public ngOnInit(){
   //récupération de la conf
   NG2OS_CONFIG['dock'].forEach((win)=>{
     this.winlist.push(new DockItem(win));
   });
   NG2OS_CONFIG['navbar'].forEach((win)=>{
     this.navitems.push(new NavbarItem(win));
   });
   this.iconWidth = NG2OS_CONFIG['iconWidth'];

 }



 private toggleExpose(){
   this._wm.toggleExpose();
 }

 private winresize(){
   console.log('da')
 }



}
