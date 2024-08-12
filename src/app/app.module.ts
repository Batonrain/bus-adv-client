import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
import { SplitterModule } from 'primeng/splitter';
import { ListboxModule } from 'primeng/listbox';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';


// Внутренние компоненты
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesListComponent } from './adv-devices/cities/cities-list/cities-list.component';
import { DevicesListComponent } from './adv-devices/devices/devices-list/devices-list.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { VideoStreamComponent } from './adv-devices/devices/video-stream/video-stream.component';
import { FilesListComponent } from './adv-devices/devices/files-list/files-list.component';
import { AddCityComponent } from './adv-devices/cities/add-city/add-city.component';
import { AddAllocationComponent } from './adv-devices/allocations/add-allocation/add-allocation.component';
import { AllocationsListComponent } from './adv-devices/allocations/allocations-list/allocations-list.component';
import { TechniciansListComponent } from './adv-devices/technicians/technicians-list/technicians-list.component';
import { AddTechniciansComponent } from './adv-devices/technicians/add-technicians/add-technicians.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ChangeDeviceNameComponent } from './adv-devices/devices/change-device-name/change-device-name.component';
import { PlaylistComponent } from './adv-devices/playlist/playlist.component';
import { UserManagerComponent } from './admin/user-manager/user-manager.component';
import { UserFormComponent } from './admin/user-form/user-form.component';
import { UserRoleDialogComponent } from './admin/user-role-dialog/user-role-dialog.component';
import { UserResetPasswordComponent } from './admin/user-reset-password/user-reset-password.component';
import { CreateUserFormComponent } from './admin/create-user-form/create-user-form.component';
import { WatchersTableComponent } from './admin/watchers-panel/watchers-table/watchers-table.component';
import { CreateWatcherFormComponent } from './admin/watchers-panel/create-watcher-form/create-watcher-form.component';
import { WatcherDevicesPickerComponent } from './admin/watchers-panel/watcher-devices-picker/watcher-devices-picker.component';
import { EditWatcherFormComponent } from './admin/watchers-panel/edit-watcher-form/edit-watcher-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CitiesListComponent,
    DevicesListComponent,
    LoginComponent,
    ProfileComponent,
    VideoStreamComponent,
    FilesListComponent,
    AddCityComponent,
    AddAllocationComponent,
    AllocationsListComponent,
    TechniciansListComponent,
    AddTechniciansComponent,
    ChangeDeviceNameComponent,
    PlaylistComponent,
    UserManagerComponent,
    UserFormComponent,
    UserRoleDialogComponent,
    UserResetPasswordComponent,
    CreateUserFormComponent,
    WatchersTableComponent,
    CreateWatcherFormComponent,
    WatcherDevicesPickerComponent,
    EditWatcherFormComponent,
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
    SplitterModule,
    ListboxModule,
    CheckboxModule,
    ChipModule,
    FieldsetModule,
    CardModule,
    MultiSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
