import { Component, OnInit } from '@angular/core';
import { WindowService } from './_services/window.service';
import { NavbarItem, NavbarSubItem} from './_models/navbar-item';
import { DockItem } from './_models/dock-item';

declare var WEBDESK_CONFIG;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  public winlist: DockItem[] = [];
  public navitems: NavbarItem[] = [];
  public iconWidth = 30;

  // get conf
  private dock_conf: any = null;

  constructor(private _wm: WindowService ) {
    // recupere la conf pour le user
    let user = 'default';
    console.log(WEBDESK_CONFIG['username'],WEBDESK_CONFIG['dock']);
    if ( WEBDESK_CONFIG['username'] && typeof WEBDESK_CONFIG['dock'][WEBDESK_CONFIG['username']] !== 'undefined' && WEBDESK_CONFIG['dock'][WEBDESK_CONFIG['username']].length > 0) {
      user = WEBDESK_CONFIG['username'];
    }
    console.log('user courant : ', user);

    //Récupération de la conf
    this.dock_conf = WEBDESK_CONFIG['dock'][user];

    this.dock_conf.forEach( (win) => {
      this.winlist.push(new DockItem(win));
    } );

    WEBDESK_CONFIG['navbar'].forEach( (win) => {
      this.navitems.push(new NavbarItem(win));
    });

    this.iconWidth = WEBDESK_CONFIG['iconWidth'];
  }

 public ngOnInit() {}

 private toggleExpose() {
   this._wm.toggleExpose();
 }

 private winresize() {
   console.log('app.component winresize');
 }



}
