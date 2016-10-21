import { Component } from '@angular/core';
import { DockComponent } from "./_widgets/dock/dock.component";
import { WindowService } from "./_services/window.service";
declare var NG2OS_CONFIG;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {


  private winlist: any[] = NG2OS_CONFIG['windows'];

  constructor(private _wm: WindowService ){

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
