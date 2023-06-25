import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { DevicesListComponent } from './adv-devices/devices/devices-list/devices-list.component';
import { CitiesListComponent } from './adv-devices/cities/cities-list/cities-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'devices', component: DevicesListComponent },
  { path: 'cities', component: CitiesListComponent},
  { path: '', component: CitiesListComponent, outlet: 'adminbar' },
  { path: '', redirectTo: 'devices', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
