import { Component, OnInit } from '@angular/core';
import { variables } from 'src/app/servicios/variables';
import { servicios } from 'src/app/servicios/servicios.service';
import * as moment from 'moment';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  rol = this.variables.rol;
  logueado = false;
  usuarios:any;
  constructor(private servicios: servicios,
    private variables: variables,
    private router:Router) { }

  ngOnInit(): void {
    this.logueado = this.variables.logueado;
    this.servicios.ReporteUsuarios().subscribe((res) => {
    this.usuarios = res;
    console.log(this.usuarios);
    });
  }


  reportePedidos(){
    this.router.navigate(['pedidos/completados']);
  }

  pedidos(){
    this.router.navigate(['pedidos/activos']);
  }

  visualizarCatalogo(){
    this.router.navigate(['catalogo']);
  }

}
