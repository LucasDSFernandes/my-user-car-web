import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

// Services
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup;
  errorMessage = '';

  errorMessages = {
    firstName: [
      { type: 'required', message: 'Primeiro nome é obrigatório.' }
    ],
    lastName: [
      { type: 'required', message: 'Ultimo nome é obrigatório.' }
    ],
    email: [
      { type: 'required', message: 'E-mail é obrigatório.' },
      { type: 'pattern', message: 'Informe um e-mail válido.' }
    ],
    phone: [
      { type: 'required', message: 'Telefone é obrigatório.' },
      { type: 'pattern', message: 'Informe um telefone válido.' }
    ],
    birthday: [
      { type: 'required', message: 'Data de aniversário é obrigatória.' },
    ],
    login: [
      { type: 'required', message: 'Nome para login é obrigatório.' },
    ],
    password: [
      { type: 'required', message: 'Senha é obrigatório.' },
      { type: 'minlength', message: 'Informe uma senha com mais de cinco caracteres.' }
    ]
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.compose([
        Validators.required
      ])],
      lastName: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{11}$')
      ])],

      birthday: ['', Validators.compose([
        Validators.required,
      ])],

      login: ['', Validators.compose([
        Validators.required,
      ])],
      password: ['', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])]
    });
  }

  submit() {
    const user = this.setUser();

    this.usersService.register(user)
      .subscribe(
        (res) => {
          alert("Usuario cadastrado com sucesso");
        },
        e => {
          this.errorMessage = 'Erro ao realizar cadastro!';
        });
  }

  private setUser() {
    return {
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      email: this.registerForm.get('email').value,
      phone: this.registerForm.get('phone').value,
      birthday: this.registerForm.get('birthday').value,
      login: this.registerForm.get('login').value,
      password: this.registerForm.get('password').value
    };
  }

}
