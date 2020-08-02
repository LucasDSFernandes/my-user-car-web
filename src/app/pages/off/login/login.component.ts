import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

// Services
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage = '';

  errorMessages = {
    login: [
      { type: 'required', message: 'Usuário é obrigatório.' },
    ],
    password: [
      { type: 'required', message: 'Senha é obrigatório.' },
      { type: 'minlength', message: 'Informe uma senha com mais de cinco caracteres.' }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
   
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
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

    this.authenticationService.login(user)
      .pipe(first())
      .subscribe(
        () => {
          this.errorMessage = '';
          this.router.navigate(['/vehicles']);
        });
  }

  private setUser() {
    return {
      login: this.loginForm.get('login').value,
      password: this.loginForm.get('password').value
    };
  }

}
