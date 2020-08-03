import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap';

// Interfaces
import { Vehicle } from 'src/app/interfaces/vehicle';

// Services
import { VehiclesService } from 'src/app/services/vehicles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-vehicle',
  templateUrl: './formvehicle.component.html'
})
export class FormVehicleComponent implements OnInit {

  vehicle: Vehicle;

  editFormVehicle: FormGroup;
  message = '';

  errorMessages = {
    licensePlate: [
      { type: 'required', message: 'Placa é obrigatório.' },
      { type: 'pattern', message: 'Informe um Placa válida.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehiclesService,
    private router: Router) {
      this.vehicle = this.router.getCurrentNavigation().extras.state as Vehicle;  
    }
  ngOnInit() {
    this.editFormVehicle = this.formBuilder.group({
      licensePlate: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z]{3}[0-9][a-zA-Z][0-9]{2})|([a-zA-Z]{3}[0-9]{4})$')
      ])]

    });

    this.loadVehicle();
  }

  private loadVehicle() {
    this.editFormVehicle.get('licensePlate').setValue(this.vehicle.licensePlate);
  }

  submit() {
    const vehicle = this.setVehicle();
    this.vehicleService.update(vehicle)
      .subscribe(res => {
        if (res.sucess) {
          alert(res.message)
          this.router.navigate(['/vehicles']);
        }
      }, e => console.log(e)
      );
  }

  private setVehicle() {
    return {
      id: this.vehicle.id,
      model: this.vehicle.model,
      licensePlate: this.editFormVehicle.get('licensePlate').value,
      color: this.vehicle.color,
      year: this.vehicle.year,
    };
  }

}
