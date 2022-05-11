import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cargo } from '../../cargo/cargo';
import { Funcionario } from '../funcionario';
import { CargoService } from '../services/cargo.service';
import { FuncionarioService } from '../services/funcionario.service';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {

  id: string | undefined
  urlImagem: any = ''

  cargos: Cargo[] = []

  constructor(

    private fb: FormBuilder,
    private funcService: FuncionarioService,
    private cargoService: CargoService

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
        this.id = resultado.id // Nós usaremos na etapa de salvarFuncionario

        this.urlImagem = resultado.foto // Para efitar o problema para não apagar a foto do usuário que já estava com foto, no momento da edição

        this.funcionario.patchValue ({ // patchValue -- Serve para modificarmos os valores que estão dentro dos funcionários
          nome: resultado.nome,
          email: resultado.email,
          cargo: resultado.cargo,
          salario: resultado.salario,
          //foto: resultado.foto
        })
      }
    )

    this.trazerTodosCargas()

  }

  salvarFuncionario(){
    if (this.id == undefined){
      //executar a função de cadastro 
      this.addFuncionario()
    } else {
      //executar a função de edição
      this.editarFuncionario(this.id)
    }
  }
  
  addFuncionario() {
    const FUNCIONARIO: Funcionario = {
      nome: this.funcionario.value.nome,
      email: this.funcionario.value.email,
      cargo: this.funcionario.value.cargo,
      salario: this.funcionario.value.salario,
      foto: this.urlImagem
    }
    this.funcService.addFuncionario(FUNCIONARIO).then(() => {
      console.log("Funcionário Cadastrado!")
      this.funcionario.reset()
    }, error => {console.log("Erro ao cadastrar o funcionario!")})
  }

  editarFuncionario(id: string){
    const FUNCIONARIO: Funcionario = {
      nome: this.funcionario.value.nome,
      email: this.funcionario.value.email,
      cargo: this.funcionario.value.cargo,
      salario: this.funcionario.value.salario,
      foto: this.urlImagem
    }

    this.funcService.editarFuncionario(id, FUNCIONARIO).then(
      () =>{
        console.log("Funcionario Editado!")
        this.funcionario.reset()
        this.id = undefined
      }, (error) =>{
        console.log("Erro ao editar um funcionário!!" + error)
      }
    )

  }

  carregarImagem(event: any){

    let arquivo = event.target.files[0] 
    let reader = new FileReader() //Variável que possibilitará ler o tipo de arquivo
    
    reader.readAsDataURL(arquivo)//Irá ler o caminho do arquivo e pegá-lo na posição 0, ou seja, o primeiro
    reader.onloadend = 
    () =>{
      console.log(reader.result)
      this.funcService.subirImagem("funcionario" + Date.now(), reader.result).then(
        (urlImagem) =>{
          console.log(urlImagem)
          this.urlImagem = urlImagem
        }
      )
    }

  }

  trazerTodosCargas() {
    this.cargoService.listarCargos().subscribe(
      (doc) =>{
        this.cargos = []
        doc.forEach((element: any) => { //Pare percorrer documento por documento da coleção
          this.cargos.push({
            id: element.payload.doc.id, // payload -- Despreza o que não nos interessa
            ...element.payload.doc.data()

          })

        });
      })
  }

}
