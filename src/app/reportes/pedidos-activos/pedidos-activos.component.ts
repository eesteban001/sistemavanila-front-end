import { Component, OnInit } from '@angular/core';
import { variables } from 'src/app/servicios/variables';
import { servicios } from 'src/app/servicios/servicios.service';
import * as moment from 'moment';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { SolicitudComponent} from 'src/app/revisar/solicitud/solicitud.component';

@Component({
  selector: 'app-pedidos-activos',
  templateUrl: './pedidos-activos.component.html',
  styleUrls: ['./pedidos-activos.component.css']
})
export class PedidosActivosComponent implements OnInit {
  solicitudesActivas: any;
  rol = this.variables.rol;
  logueado = false;
  solicitud: any;
  verTabla = true;
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
    this.router.navigate(['pedidos/completados']);
  }

  reporteUsuarios(){
    this.router.navigate(['reporteUsuarios']);
  }

  asignar(data:any){
    console.log(data);
    this.servicios.ConsultarSolicitud(data.numerogestion).subscribe((res) => {
      this.solicitud = res;
      console.log(this.solicitud);
      this.asignarSolicitud();
    });
    const dialogRef = this.dialog.open(SolicitudComponent, {
      width: 'auto',
      height: 'auto',
      data: data,
      disableClose: true
    });
  }

  revisar(data: any){
    console.log(data);
    const dialogRef = this.dialog.open(SolicitudComponent, {
      width: 'auto',
      height: 'auto',
      data: data,
      disableClose: true
    });
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
      return si;
    }
  }

  asignarSolicitud(){
    const bodyAsignar = {
      aplica_oferta: this.solicitud.aplica_oferta,
      direccion: this.solicitud.direccion,
      estado: 3,
      fecha_solicitud: this.solicitud.fecha_solicitud,
      numerogestion: this.solicitud.numerogestion,
      total: this.solicitud.total,
      usuario: this.solicitud.usuario
    }
    console.log(bodyAsignar);
    this.servicios.putActualizarSolicitud(bodyAsignar).subscribe((res) => {
    console.log(res);
    if(res!=null){
      this.actualizarTabla();
    }
    });
  }

  actualizarTabla(){
    this.verTabla = false;
    this.servicios.ReporteSolicitudesActivas().subscribe((res) => {
      this.solicitudesActivas = res;
      console.log(this.solicitudesActivas);
    });
    this.verTabla = true;
  }

}
