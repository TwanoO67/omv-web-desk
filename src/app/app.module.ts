import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DockComponent } from './_widgets/dock/dock.component';
import { WindowService } from "./_services/window.service";
import { SafePipe } from './_pipes/safe.pipe';
import { SearchComponent } from './_widgets/search/search.component';
import { NavbarComponent } from './_widgets/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DockComponent,
    SafePipe,
    SearchComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ WindowService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
