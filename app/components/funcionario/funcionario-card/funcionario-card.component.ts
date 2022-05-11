import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../funcionario';
import { FuncionarioService } from '../services/funcionario.service';

@Component({
  selector: 'app-funcionario-card',
  templateUrl: './funcionario-card.component.html',
  styleUrls: ['./funcionario-card.component.css']
})
export class FuncionarioCardComponent implements OnInit {

  funcionarios: Funcionario[] = []

  constructor(

    private funcService: FuncionarioService

  ) { }

  ngOnInit(): void {
    this.mostrarFuncionario()

  }

  mostrarFuncionario() {
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








}
