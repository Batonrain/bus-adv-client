import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesListComponent } from './adv-devices/cities/cities-list/cities-list.component';
import { DevicesListComponent } from './adv-devices/devices/devices-list/devices-list.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { VideoStreamComponent } from './adv-devices/devices/video-stream/video-stream.component';
import { FilesListComponent } from './adv-devices/devices/files-list/files-list.component';
import { AddDeviceComponent } from './adv-devices/devices/add-device/add-device.component';
import { AddCityComponent } from './adv-devices/cities/add-city/add-city.component';
import { AddAllocationComponent } from './adv-devices/allocations/add-allocation/add-allocation.component';


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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AllocationsListComponent } from './adv-devices/allocations/allocations-list/allocations-list.component';
import { TechniciansListComponent } from './adv-devices/technicians/technicians-list/technicians-list.component';
import { AddTechniciansComponent } from './adv-devices/technicians/add-technicians/add-technicians.component';


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
    AllocationsListComponent,
    TechniciansListComponent,
    AddTechniciansComponent,
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
    ConfirmDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
