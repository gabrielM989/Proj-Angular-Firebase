import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {

  autorizacao = false

  constructor() { }

  autorizar(){
    localStorage.setItem('login', "sim") // Variáveç chamado login, com o conteúdo de SIM
  }

  deslogar(){ 
    localStorage.clear() //Vai tirar a variável de login, da aplicacao
  }

  obterStatusLogin = () => !!localStorage.getItem('login') //Vai pegar no localStorage, se há a variável LOGIN
      
}
