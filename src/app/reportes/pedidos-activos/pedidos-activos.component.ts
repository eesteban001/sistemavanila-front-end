import { Component, OnInit } from '@angular/core';
import { variables } from 'src/app/servicios/variables';
import { servicios } from 'src/app/servicios/servicios.service';
import * as moment from 'moment';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pedidos-activos',
  templateUrl: './pedidos-activos.component.html',
  styleUrls: ['./pedidos-activos.component.css']
})
export class PedidosActivosComponent implements OnInit {
  solicitudesActivas: any;
  rol = this.variables.rol;
  logueado = false;
  constructor(private servicios: servicios,
    private variables: variables,
    private router:Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.logueado = this.variables.logueado;
    this.servicios.ReporteSolicitudesActivas().subscribe((res) => {
      this.solicitudesActivas = res;
      console.log(this.solicitudesActivas);
      if(this.solicitudesActivas == null){
        Swal.fire({
          html: "<p>Su usuario no cuenta con solicitudes realizadas</p>",
          icon: 'warning'
        });
        this.router.navigate(['catalogo']);
      }
    });
  }

  verCatalogo(){
    this.router.navigate(['catalogo']);
  }

  reportePedidos(){

  }

  reporteUsuarios(){
    this.router.navigate(['reporteUsuarios']);
  }

  asignar(data:any){
    
  }

  revisar(data: any){

  }

  parseDate(data: any){
    let fecha;
    fecha=moment(data).format("DD/MM/YYYY");
    return fecha; 
  }

  oferta(data:any){
    const si = 'SI';
    const no = 'NO';

    if(data == false){
      return no;
    }
    else{ 
      return no;
    }
  }

}
