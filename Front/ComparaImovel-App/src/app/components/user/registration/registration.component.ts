import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/ValidatorField';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private router: Router,
              private authService: AuthService) { }

  get f(): any{return this.form.controls; }

  ngOnInit(): void {
    this.validation();
  }


  private validation(): void{

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmeSenha')
    };

    this.form = this.fb.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['',
       [Validators.required, Validators.email]
      ],
      userName: ['', Validators.required],
      password: ['',
      [Validators.required, Validators.minLength(6)]
    ],
      confirmeSenha: ['', Validators.required],
      fullName: [''],
    }, formOptions);
  }

  cadastrarUsuario(): void {
    if (this.form.valid) {
      this.spinner.show();

      this.form.get('fullName').setValue(this.form.get('primeiroNome').value + " " +
        this.form.get('ultimoNome').value);

      this.user = Object.assign(
        this.form.value,
      );

      this.authService.register(this.user).subscribe(
        (USUARIO_RETORNO: User) => {
          console.log(USUARIO_RETORNO);
          this.router.navigate([`/user/login`]);
          this.toastr.success('Usuário salvo com sucesso!', 'Sucesso');
        },
        (error: any) => {
          const erro = error.error;
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.warning('Cadastro Duplicado.', 'Atenção');
                break;
              default:
                this.toastr.error(`Erro ao cadastrar o Usuário. Erro: ${element.code}`, 'Error');
                break;
            }
          });
          console.error(error);
        },

      ).add(() => this.spinner.hide());
    }

  }

}
