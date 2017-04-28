import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { WindowService } from '../../_services/window.service';

@Component({
  selector: 'app-dock',
  templateUrl: 'dock.component.html',
  styleUrls: ['dock.component.css']
})
export class DockComponent implements OnInit {
  @ViewChild('dockdiv') private dock: ElementRef;
  private arrayImg: HTMLCollection;
  @Input() public winlist: any[];
  @Input() public iconWidth = 30;
  private minimalScale = 0.5;
  private minimalDistance = 300;

  // position de depart d'apparition des fenetres
  private x_pos = 20;
  private y_pos = 20;

  constructor(private _wm: WindowService ){

  }

  ngOnInit() {
    this.arrayImg = this.dock.nativeElement.children;

    document.onmousemove = (ev) => {
      this.onMovement(ev);
    };
  }

  private onMovement(ev) {
    const oEvent: MouseEvent = <MouseEvent>ev || <MouseEvent>event;
    for (let i = 0; i < this.arrayImg.length; i++) {
      const elem: HTMLElement = <HTMLElement>this.arrayImg[i];
      // calculates the horizontal and vertival distance from cursor to the center of each image
      const a = elem.offsetLeft + elem.offsetWidth / 2 - oEvent.clientX;
      const b = elem.offsetTop + this.dock.nativeElement.offsetTop + elem.offsetHeight / 2 - oEvent.clientY;
      // calculates the staight distance from cursor to the center of each image
      const c =	Math.sqrt( a * a + b * b );
      // as the distance becomes smaller, the scale should be larger, 500 is a factor that can be customized to adjust
      // the distance where the dock can sense the cursor moves towards it
      let scale = 1 - c / this.minimalDistance;
      // always set the 1/2 scale no matter how far the cursor is away from the dock
      if ( scale < this.minimalScale ) {
        scale = this.minimalScale;
      }
      elem.style.width = this.iconWidth * scale + 'px';
    }
  }

  private dockSelect(id) {
    // get win param by id
    const win = this.winlist.filter( (wind) => {
      return (wind.id === id);
    })[0];

    // verify if not duplicated
    if (!win.opened) {
      win.opened = true;

      // on laisse passé un timeout, pour avoir le temps de construire le dom
      setTimeout(( scope) => {
        const cur_win = scope._wm.createWindowFromQuery('#' + win.id, {
          title: win.title,
          width: 250,
          height: 280,
          x: scope.x_pos,
          y: scope.y_pos,
          events: {
            closed: () => {
              console.log('closed sur ' + win.id);
              win.ref = null;
              win.opened = false;
              win.selected = false;
              cur_win.destroy();
            },
            focus: () => {
              console.log('focus sur ' + win.id);
              scope.winlist.forEach((autre) => {
                autre.selected = false;
              });
              win.selected = true;
            }
          }
        });
        win.ref = cur_win;
      }, 1, this);


      // on incremente la position
      this.x_pos += 10;
      this.y_pos += 10;
    } else {
      console.log('on selectionne depuis le menu');
      win.ref.focus();
    }
    return false;
  }

}
