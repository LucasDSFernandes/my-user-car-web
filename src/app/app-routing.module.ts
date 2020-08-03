import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './pages/off/login/login.component';
import { RegisterComponent } from './pages/off/register/register.component';
import { UsersComponent } from './pages/off/users.component';
import { VehicleComponent } from './pages/on/vehicle/vehicle.component';
import { RegisterVehicleComponent } from './pages/on/vehicle/register/registervehicle.component';
import { AuthGuard } from './guards/auth.guard';
import { FormVehicleComponent } from './pages/on/vehicle/form/formvehicle.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UsersComponent,
  },
  {
    path: 'vehicles',
    component: VehicleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vehicle/add',
    component: RegisterVehicleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'vehicle/edit',
    component:  FormVehicleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
