import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CargoService } from '../../funcionario/services/cargo.service';
import { Cargo } from '../cargo';

@Component({
  selector: 'app-cargo-lista',
  templateUrl: './cargo-lista.component.html',
  styleUrls: ['./cargo-lista.component.css']
})
export class CargoListaComponent implements OnInit {

  cargos: Cargo[] = []
  columns: string[] = ['cargo', 'descricao', 'salarioBase']
  carregando = false

  constructor(
    private cargoService: CargoService
  ) { }

  ngOnInit(): void {

    this.listarCargos()
  }

  listarCargos(){
    this.cargoService.listarCargos().subscribe(
      (doc) =>{
        this.cargos = []
        doc.forEach((element: any) => { //Pare percorrer documento por documento da coleção
          this.cargos.push({
            id: element.payload.doc.id, // payload -- Despreza o que não nos interessa
            ...element.payload.doc.data()

          })

        });
      }
    )
  }

}
