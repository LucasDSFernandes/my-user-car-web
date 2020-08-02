import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';

// Interceptors
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/off/login/login.component';
import { RegisterComponent } from './pages/off/register/register.component';
import { UsersComponent } from './pages/off/users.component';
import { FormComponent } from './pages/off/form/form.component';
import { FormVehicleComponent } from './pages/on/vehicle/form/formvehicle.component';
import { VehicleComponent } from './pages/on/vehicle/vehicle.component';
import { RegisterVehicleComponent } from './pages/on/vehicle/register/registervehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    FormComponent,
    FormVehicleComponent,
    VehicleComponent,
    RegisterVehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [FormComponent, FormVehicleComponent]

})
export class AppModule { }
