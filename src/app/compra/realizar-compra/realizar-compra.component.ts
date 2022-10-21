import { Component, OnInit } from '@angular/core';
import { servicios } from 'src/app/servicios/servicios.service';
import { variables } from 'src/app/servicios/variables';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistroDireccionComponent } from 'src/app/direccion/registro-direccion/registro-direccion.component';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-realizar-compra',
  templateUrl: './realizar-compra.component.html',
  styleUrls: ['./realizar-compra.component.css']
})
export class RealizarCompraComponent implements OnInit {

  logueado: any;
  admin= false;
  ruta = "assets/imagenes/";
  carrito: any = [];
  total: any = 0;
  rol = this.variables.rol;
  constructor(private servicios: servicios,
    public dialog: MatDialog,
    private variables: variables,
    private router: Router
    ) {
     }

  ngOnInit(): void {
    console.log(this.variables.rol)
    if(this.variables.rol == 'admin'){
      this.admin = true;
    }
    this.logueado = this.variables.logueado;
    this.realizarCompra();
  }


  realizarCompra(){
    this.carrito = this.variables.carrito;
    console.log(this.carrito);
    for (let index = 0; index < this.carrito.length; index++) {
      const element = this.carrito[index];
      this.total += element.total;
    }
    console.log(this.total);
  }

  pedidos(){
    this.router.navigate(['pedidos/activos']);
  }

  reportePedidos(){

  }

  reporteUsuarios(){
    this.router.navigate(['reporteUsuarios']);
  }

  registrarPedido(){
    console.log(this.carrito);
    Swal.fire({
      html: "¿Esta seguro de realizar su pedido?</p>",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="fa fa-check" aria-hidden="true"></i> SI',
      cancelButtonText: '<i class="fa fa-window-close" aria-hidden="true"></i> NO'
    }).then(async (result) => {
      if(result.isConfirmed){
        const data = {
          carrito: this.carrito,
          total: this.total
        }
        const dialogRef = this.dialog.open(RegistroDireccionComponent, {
          width: 'auto',
          height: 'auto',
          data: data,
          disableClose: true
        });
      }else{
        return;
      }
    });

  }

  agregar(data:any){
    console.log(data);
    this.carrito[data].cantidad +=1;
    this.carrito[data].total = this.carrito[data].cantidad * this.carrito[data].precio;
    this.total += this.carrito[data].precio;
  }

  eliminar(data:any){
    console.log(data);
    if(this.carrito[data].cantidad == 1){
      this.total -= this.carrito[data].precio;
      this.carrito.splice(data,1);
    }else{
      this.carrito[data].cantidad -=1;
      this.carrito[data].total = this.carrito[data].cantidad * this.carrito[data].precio;
      this.total -= this.carrito[data].precio;
    }
  }

  pedidosCliente(){
    Swal.fire({
      html: "Si realiza esta actividad su pedido sera cancelado ¿Esta seguro de continuar?</p>",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '<i class="fa fa-check" aria-hidden="true"></i> SI',
      cancelButtonText: '<i class="fa fa-window-close" aria-hidden="true"></i> NO'
    }).then(async (result) => {
      if(result.isConfirmed){
        this.router.navigate(['cliente/pedidos']);
      }else{
        return;
      }
    });
  }


}
