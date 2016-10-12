import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private heure: string = "";

  constructor() { }

  ngOnInit() {
    //rafraichir la date toute les secondes
    setInterval(this.updateDate, 1000,this);
  }

  public updateDate(scope){
    let d = new Date();
    scope.heure = d.toLocaleDateString()+" "+d.toTimeString().split(' ')[0];
  }

}
