import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import  firebase  from 'firebase/compat/app';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../funcionario';

firebase.initializeApp(environment.firebase) // Importamos o Fire Base para dentro de nosso arquivo Services

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(

    private fireAngular: AngularFirestore //Injeção de dependência do Angular FireStore

  ) { }

  //O Subject é um tipo especial de Observable, permite enviar e receber dados
  private funcionarioEdit = new Subject<any>()

  listarFuncionario(): Observable<any> { // O Observable é uma evolução da promisse!! Enviamos vários registros de uma vez só
    //Podemos emitir diversos pedidos numa mesma requisição. As quais podem ou não darem certo
    //Observable é um fofoqueiro que fica de olho nas paradas, dai vc faz um subject pra ele te avisar qdo acontecer o q vc quer

    return this.fireAngular.collection('funcionario').snapshotChanges() 
    //Trás os dados que estão dentro de nossa "collection", caso haja alterações nos dados, 
    //através do método "snapshotChanges", irá verificar se houve atualizações nos dados
  }

  //Promisse é uma promessa de que algo possa ser executado

  addFuncionario(funcionario: Funcionario): Promise<any> {
    return this.fireAngular.collection('funcionario').add(funcionario)
  }

  excluirFuncionario(id: string): Promise<any>{
    return this.fireAngular.collection('funcionario').doc(id).delete()
  }

  //O Next coloca os dados do funcionario escolhido dentro do subject
  pegarDadosDoFuncionarioEscolhido(funcionario: Funcionario){
    this.funcionarioEdit.next(funcionario) 
  }
  
  //Neste método, é retornado os dados que estão no Subject
  getFuncionarioEdit():Observable<Funcionario>  {
    return this.funcionarioEdit.asObservable()

  }

}


