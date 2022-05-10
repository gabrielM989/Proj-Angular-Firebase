import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from '../funcionario';
import { FuncionarioService } from '../services/funcionario.service';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {

  constructor(

    private fb: FormBuilder,
    private funcService: FuncionarioService

  ) { }

  funcionario: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    cargo: ['', [Validators.required]],
    salario: [''],
    foto: ['']

  })

  ngOnInit(): void {
    this.funcService.getFuncionarioEdit().subscribe(
      (resultado) =>{ // Função de sucesso
        console.log(resultado)
      }
    )

  }
  
  addFuncionario() {
    const FUNCIONARIO: Funcionario = {
      nome: this.funcionario.value.nome,
      email: this.funcionario.value.email,
      cargo: this.funcionario.value.cargo,
      salario: this.funcionario.value.salario,
      foto: this.funcionario.value.foto
    }
    this.funcService.addFuncionario(FUNCIONARIO).then(() => {
      console.log("Funcionário Cadastrado!")
      this.funcionario.reset()
    }, error => {console.log("Erro ao cadastrar o funcionario!")})
  }

}
