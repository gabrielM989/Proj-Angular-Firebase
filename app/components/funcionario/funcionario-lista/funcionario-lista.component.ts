import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { Funcionario } from '../funcionario';
import { FuncionarioService } from '../services/funcionario.service';

@Component({
  selector: 'app-funcionario-lista',
  templateUrl: './funcionario-lista.component.html',
  styleUrls: ['./funcionario-lista.component.css']
})
export class FuncionarioListaComponent implements OnInit {

  funcionarios: Funcionario[] = [] //Informamos que será um array, do tipo vazio

  columns: String[] = ['nome', 'email', 'cargo', 'salario', 'acoes']
  carregando = false

  constructor(

    private funcService: FuncionarioService

  ) { }

  ngOnInit(): void {
    this.mostrarFuncionario()
  }

  mostrarFuncionario(){
    this.funcService.listarFuncionario().subscribe( // Iremos nos inscrever no Observable
    (doc) => {
      console.log(doc)
      this.funcionarios = [] //Limpados o Array de funcionários

      doc.forEach((element: any) => { //forEach -- Irá percorrer todos os documentos dentro do DOC
        this.funcionarios.push({ //PUSH --> Salva o elementos dentro de um ARRAY
          id: element.payload.doc.id,       // PAYLOAD --> Pega apenas a parte essencial, que é a parte dos dados
          ...element.payload.doc.data()}) // O .data são os dados de nosso documento

        //Necessitamos fazer essa parte do código, pq o FireBase não trás um objeto JSON, por conta disso, há a necessidade dessa seleção 
      });
  })

  console.log(this.funcionarios) //Iremos mostrar os dados no Array

  }

  excluirFuncionario(id: string){
    this.funcService.excluirFuncionario(id).then(
      () =>{
        console.log("Funcionario excluído")
      }, (error) => {
        console.log("O funcionário não foi excluído" + error)
      }
    )
  }

  editarFuncionario(funcionario: Funcionario){
    this.funcService.pegarDadosDoFuncionarioEscolhido(funcionario)
  }



}
