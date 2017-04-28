import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { NavbarItem } from '../../_models/navbar-item';

@Component({
  host: {
    '(document:click)': 'onOutsideClick($event)',
  },
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private heure = '';
  private navbar_selected = false;
  @Input() public navitems: Array<NavbarItem> = [];

  constructor(private _eref: ElementRef) { }

  ngOnInit() {
    // rafraichir la date toute les secondes
    setInterval(this.updateDate, 1000, this);
  }

  public updateDate(scope) {
    const d = new Date();
    scope.heure = d.toLocaleDateString() + ' ' + d.toTimeString().split(' ')[0];
  }

  public clickOnMain() {
    console.log('click on main navbar');
    this.unselectAll();
  }

  public clickOnTitle(item, event) {
    this.handleSelection(item, event);
    if (item.action) {
      item.action();
    }
  }

  // gére le fait de selectionné, un lien du menu
  public handleSelection(item, event) {
    this.unselectAll();
    item.selected = true;
    this.navbar_selected = true;
    if (event) {
      event.stopPropagation();
      return false;
    }
  }

  public clickOnSubTitle(subitem, event) {
    this.handleSelection(subitem, event);
    if (subitem.action) {
      subitem.action();
    } else if (subitem.link) {
      document.location.href = subitem.link;
    } else if (subitem.routerlink) {
      // need router for that
    }
  }

  private unselectAll() {
    this.navitems.forEach((item) => {
      item.selected = false;
    });
  }

  public hoverTitle(item) {
    console.log('hover');
    // si une autre titre est déja selectionné, passé sur un titre vaut comme un clic
    if (this.navbar_selected) {
      this.clickOnTitle(item, null);
    }
  }

  // click à l'exterieur du document
  public onOutsideClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) { // or some similar check
     this.unselectAll();
    }
  }

}
