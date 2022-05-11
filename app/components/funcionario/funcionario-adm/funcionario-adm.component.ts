import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizacaoService } from '../services/autorizacao.service';

@Component({
  selector: 'app-funcionario-adm',
  templateUrl: './funcionario-adm.component.html',
  styleUrls: ['./funcionario-adm.component.css']
})
export class FuncionarioAdmComponent implements OnInit {

  usuarioEstaLogado = this.autorizacao.obterStatusLogin()

  constructor(

    private autorizacao: AutorizacaoService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  fazerLogout(){
    this.autorizacao.deslogar()
    this.router.navigate(['/'])
    //this.usuarioEstaLogado = this.autorizacao.obterStatusLogin()

  }
  

}
