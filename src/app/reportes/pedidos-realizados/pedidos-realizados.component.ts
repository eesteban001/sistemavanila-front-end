import { Component, OnInit } from '@angular/core';
import { variables } from 'src/app/servicios/variables';
import { servicios } from 'src/app/servicios/servicios.service';
import * as moment from 'moment';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DetalleSolicitudComponent} from 'src/app/reportes/detalle-solicitud/detalle-solicitud.component';

@Component({
  selector: 'app-pedidos-realizados',
  templateUrl: './pedidos-realizados.component.html',
  styleUrls: ['./pedidos-realizados.component.css']
})

export class PedidosRealizadosComponent implements OnInit {
  rol = this.variables.rol;
  logueado = false;
  solicitudes: any  = [];
  constructor(private servicios: servicios,
    private variables: variables,
    private router:Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.logueado = this.variables.logueado;
    this.solicitudes = this.servicios.ReportePedidosByUsuario(this.variables.usuarioLogueado).subscribe((res) => {
    console.log(res);
    this.solicitudes = res;
    });
    if(this.solicitudes == null){
      Swal.fire({
        html: "<p>Su usuario no cuenta con solicitudes realizadas</p>",
        icon: 'warning'
      });
      this.router.navigate(['catalogo']);
    }
  }

  pedidosCliente(){
    this.router.navigate(['catalogo']);
  }

  reportePedidos(){

  }

  reporteUsuarios(){
    this.router.navigate(['reporteUsuarios']);
  }

  pedidos(){

  }

  parseDate(data: any){
    let fecha;
    fecha=moment(data).format("DD/MM/YYYY");
    return fecha; 
  }

  detalle(data:any){
    console.log(data);
    const dialogRef = this.dialog.open(DetalleSolicitudComponent, {
      width: 'auto',
      height: 'auto',
      data: data,
      disableClose: true
    });
  }
  
}
