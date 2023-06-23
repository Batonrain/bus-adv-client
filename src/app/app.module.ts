import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesListComponent } from './adv-devices/cities-list/cities-list.component';
import { RoutesListComponent } from './adv-devices/routes-list/routes-list.component';
import { DevicesListComponent } from './adv-devices/devices-list/devices-list.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { VideoStreamComponent } from './adv-devices/video-stream/video-stream.component';

// PrimeNG
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [
    AppComponent,
    CitiesListComponent,
    RoutesListComponent,
    DevicesListComponent,
    LoginComponent,
    ProfileComponent,
    VideoStreamComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    DynamicDialogModule,
    TagModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
