import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap';

// Interfaces
import { Vehicle } from 'src/app/interfaces/vehicle';

// Services
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-form-vehicle',
  templateUrl: './formvehicle.component.html'
})
export class FormVehicleComponent implements OnInit {

  @Output() onClose = new EventEmitter();

  @Input() vehicle: Vehicle;

  editFormVehicle: FormGroup;
  message = '';

  errorMessages = {
    licensePlate: [
      { type: 'required', message: 'Placa é obrigatório.' },
      { type: 'pattern', message: 'Informe um Placa válida.' }
    ]
  };

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private vehicleService: VehiclesService
  ) { }

  ngOnInit() {
    this.editFormVehicle = this.formBuilder.group({
      licensePlate : ['', Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z]{3}[0-9][a-zA-Z][0-9]{2})|([a-zA-Z]{3}[0-9]{4})$')
      ])]
     
    });

    this.loadVehicle();
  }

  private loadVehicle() {
    this.editFormVehicle.get('licensePlate').setValue(this.vehicle.licensePlate);
  }

  close(save = false) {
    this.onClose.emit(save);
    this.bsModalRef.hide();
    location.reload();
  }

  submit() {
    const vehicle = this.setVehicle();
    console.log(vehicle);
    this.vehicleService.update(vehicle)
    .subscribe(res => {
      if (res.sucess) {
        this.message = res.message;
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
