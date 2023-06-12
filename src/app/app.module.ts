import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesListComponent } from './adv-devices/cities-list/cities-list.component';
import { RoutesListComponent } from './adv-devices/routes-list/routes-list.component';
import { DevicesListComponent } from './adv-devices/devices-list/devices-list.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CitiesListComponent,
    RoutesListComponent,
    DevicesListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
