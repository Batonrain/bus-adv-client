import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesListComponent } from './adv-devices/cities-list/cities-list.component';
import { DevicesListComponent } from './adv-devices/devices-list/devices-list.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { VideoStreamComponent } from './adv-devices/video-stream/video-stream.component';
import { FilesListComponent } from './adv-devices/files-list/files-list.component';
import { AddDeviceComponent } from './adv-devices/add-device/add-device.component';

// PrimeNG
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { AddCityComponent } from './adv-devices/add-city/add-city.component';
import { AddAllocationComponent } from './adv-devices/add-allocation/add-allocation.component';


@NgModule({
  declarations: [
    AppComponent,
    CitiesListComponent,
    DevicesListComponent,
    LoginComponent,
    ProfileComponent,
    VideoStreamComponent,
    FilesListComponent,
    AddDeviceComponent,
    AddCityComponent,
    AddAllocationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    DynamicDialogModule,
    TagModule,
    DropdownModule,
    TabViewModule,
    TabMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
