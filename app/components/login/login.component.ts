import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AutorizacaoService } from '../funcionario/services/autorizacao.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

usuarioEstaLogado = this.autorizacao.obterStatusLogin()

constructor(

    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private autorizacao: AutorizacaoService,
    private router: Router

  ) {}

  form:FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  })

  ngOnInit(): void {
    
  }

  fazerLogin(){
    this.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.senha)//Iremos fazer o login com o email e a senha, assim como definido no FireBase
    .then( //THEN, ou seja, se der certo, faça isso!!
    (user) =>{
      console.log(user)
      this.autorizacao.autorizar()
      this.router.navigate(['/func-adm']) //Iremos direcionar o usuário para a rota de usuário ADM
    })
    .catch(
      (error) =>{
        this.autorizacao.deslogar()
        this.router.navigate(['/'])
      }
    )
  }

  fazerLogout(){
    this.autorizacao.deslogar()
    this.usuarioEstaLogado = this.autorizacao.obterStatusLogin()

  }

}
