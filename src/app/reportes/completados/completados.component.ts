import { Component, OnInit } from '@angular/core';
import { variables } from 'src/app/servicios/variables';
import { servicios } from 'src/app/servicios/servicios.service';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { DetalleSolicitudComponent} from 'src/app/reportes/detalle-solicitud/detalle-solicitud.component';

@Component({
  selector: 'app-completados',
  templateUrl: './completados.component.html',
  styleUrls: ['./completados.component.css']
})
export class CompletadosComponent implements OnInit {
  solicitudesCompletadas: any;
  rol = this.variables.rol;
  logueado = false;
  constructor(private servicios: servicios,
    private variables: variables,
    private router:Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.logueado = this.variables.logueado;
    this.servicios.ReporteCompletados().subscribe((res) => {
      console.log(res);
      this.solicitudesCompletadas = res;
    });
  }

  reporteUsuarios(){
    this.router.navigate(['reporteUsuarios']);
  }

  verCatalogo(){
    this.router.navigate(['catalogo']);
  }

  pedidosActivos(){
    this.router.navigate(['pedidos/activos']);
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

  detalle(data: any){
    console.log(data);
    const dialogRef = this.dialog.open(DetalleSolicitudComponent, {
      width: 'auto',
      height: 'auto',
      data: data,
      disableClose: true
    });
  }

}
