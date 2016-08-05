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

  constructor(private _wm: WindowService ){

  }

  public ngOnInit(){

    this._wm.createWindowFromQuery('.about-app', {
			title: 'About Ventus',
			width: 250,
			height: 280,
			x: 140,
			y: 380
		})

    let codiad = this._wm.createWindowFromQuery('.codiad', {
			title: 'Codiad IDE',
			width: 250,
			height: 280,
			x: 140,
			y: 380
		});
    console.log(codiad);

    let pos = 50;
	  let num = 1;
    this._wm.createWindow({
			title: 'Window ' + (num++),
			x: (pos += 60),
			y: pos,
			width: 400,
			height: 250,

			events: {
				closed: function() {
					this.destroy();
				}
			}
		})
 }

 private toggleExpose(){
   this._wm.toggleExpose();
 }

 private winresize(){
   console.log('da')
 }



}
