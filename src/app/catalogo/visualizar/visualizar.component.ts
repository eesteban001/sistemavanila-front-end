import { Component, OnInit } from '@angular/core';
import { servicios } from 'src/app/servicios/servicios.service';
@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent implements OnInit {
  productos = null;
  constructor(private servicios: servicios,
    ) {
     }

  ngOnInit(): void {
    this.visualizarProductos();
  }

  async visualizarProductos(){
    this.productos = await this.servicios.ConsultaAllProducto().toPromise();
    console.log("productos",this.productos);
  }


}
