import { Component, OnInit, ElementRef } from '@angular/core';
declare var NG2OS_CONFIG;

@Component({
  host: {
    '(document:click)': 'onOutsideClick($event)',
  },
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private heure: string = "";
  private navbar_selected: boolean = false;
  private navmenu: any = NG2OS_CONFIG['topmenu'];

  constructor(private _eref: ElementRef) { }

  ngOnInit() {
    //rafraichir la date toute les secondes
    setInterval(this.updateDate, 1000,this);
  }

  public updateDate(scope){
    let d = new Date();
    scope.heure = d.toLocaleDateString()+" "+d.toTimeString().split(' ')[0];
  }

  public clickOnTitle(item){
    this.unselectAll();
    item.selected = true;
    this.navbar_selected = true;
  }

  private unselectAll(){
    this.navmenu.forEach((item)=>{
      item.selected = false;
    });
  }

  public hoverTitle(item){
    console.log('hover');
    //si une autre titre est déja selectionné, passé sur un titre vaut comme un clic
    if(this.navbar_selected){
      this.clickOnTitle(item);
    }
  }

  //click à l'exterieur du document
  public onOutsideClick(event){
    if (!this._eref.nativeElement.contains(event.target)){ // or some similar check
     this.unselectAll();
    }
  }

}
