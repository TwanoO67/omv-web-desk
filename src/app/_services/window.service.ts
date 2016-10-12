import { Injectable } from '@angular/core';
declare var Ventus;

@Injectable()
export class WindowService {

  private wm: any;

  constructor() {
    this.wm = new Ventus.WindowManager();
  }

  public createWindow(params){
    let win = this.wm.createWindow(params);
    win.open();
    return win;
  }

  public createWindowFromQuery(query,params){
    let win = this.wm.createWindow.fromQuery(query, params);
    win.open();
    return win;
  }

  public createWindowFromElement(domElement,params){
    let win = this.wm.createWindow.fromElement(domElement, params);
    win.open();
    return win;
  }

  public toggleExpose(){
    if(this.wm.mode === 'expose')
      this.wm.mode = 'default';
    else
      this.wm.mode = 'expose';
  }


}
