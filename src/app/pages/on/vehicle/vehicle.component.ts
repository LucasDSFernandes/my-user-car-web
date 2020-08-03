import { Component, OnInit } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap';

// Components
import { FormVehicleComponent } from './form/formvehicle.component';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicle.component.html'
})
export class VehicleComponent implements OnInit {

  vehicles: Vehicle[] = [];
  user: User;

  public modalRef: BsModalRef;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: BsModalService,
    private vehicleService: VehiclesService,
    private userService: UsersService
    ) { 
    if (this.authenticationService.currentTokenValue == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.getUser();
    this.getVehicles();
  }

  private getVehicles() {
    this.vehicleService.getAll()
      .subscribe((vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      },
      e => console.log(e));
  }
  private getUser() {
    this.userService.getUser()
      .subscribe((user: User) => {
        this.user = user;
      },
      e => console.log(e));
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  delete(id: number) {
    this.vehicleService.delete(id)
      .subscribe(res => {
        if (res.sucess) {
          alert(res.message);
          // location.reload();
        }
    });
  }
}
