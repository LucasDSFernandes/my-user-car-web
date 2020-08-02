import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

// Services
import { AuthenticationService } from 'src/app/services/authentication.service';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-register-vehicle',
  templateUrl: './registervehicle.component.html'
})
export class RegisterVehicleComponent implements OnInit {

  registerForm: FormGroup;

  errorMessages = {
    year: [
      { type: 'required', message: 'Ano é obrigatório.' }
    ],
    licensePlate: [
      { type: 'required', message: 'Placa é obrigatório.' },
      { type: 'pattern', message: 'Informe uma placa válida.' }
    ],
    model: [
      { type: 'required', message: 'Modelo é obrigatório.' },
    ],
    color: [
      { type: 'required', message: 'Cor é obrigatório.' },
    ]
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private vehicleService: VehiclesService,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentTokenValue==null) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      year: ['', Validators.compose([
        Validators.required
      ])],
      licensePlate: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z]{3}[0-9][a-zA-Z][0-9]{2})|([a-zA-Z]{3}[0-9]{4})$')
      ])],
      model: ['', Validators.compose([
        Validators.required,
      ])],
      color: ['', Validators.compose([
        Validators.required        
      ])]     
    });
  }

  submit() {
    const vehicle = this.setVehicle();

    this.vehicleService.register(vehicle)
      .subscribe(res => {
        if (res.sucess) {
            alert(res.message);
            this.router.navigate(['/vehicles']);
        }
      });
  
  }

  private setVehicle() {
    return {
      year: this.registerForm.get('year').value,
      licensePlate: this.registerForm.get('licensePlate').value,
      model: this.registerForm.get('model').value,
      color: this.registerForm.get('color').value
    };
  }

}
