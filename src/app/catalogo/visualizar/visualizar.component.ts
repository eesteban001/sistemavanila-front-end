import { Component, OnInit } from '@angular/core';
import { servicios } from 'src/app/servicios/servicios.service';
import Swal from 'sweetalert2';
import { variables } from 'src/app/servicios/variables';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent implements OnInit {
  productos = null;
  prueba = null;
  ruta = '';
  logueado = false;
  rol = this.variables.rol;
  carrito: any = [];
  constructor(private servicios: servicios,
    private variables: variables,
    private router: Router,
    public dialog: MatDialog,

    ) {
     }

  ngOnInit(): void {
    this.visualizarProductos();
  }

  async visualizarProductos(){
    
    this.ruta = "assets/imagenes/";
    this.productos = await this.servicios.ConsultaAllProducto().toPromise();
    console.log("productos",this.productos);
    console.log('usuariologueado',this.variables.usuarioLogueado);
    console.log('logueado',this.variables.logueado);
    console.log('rol',this.variables.rol);
    this.logueado = this.variables.logueado;
  }

  async comprar(data: any){
    let noEncontro = false;

    if(this.variables.logueado == true){
      if(this.carrito.length != 0){
        console.log('entro')
        for (let index = 0; index < this.carrito.length; index++) {
          const element = this.carrito[index];
          console.log(element,data);
          if(data.id == element.id){
            element.cantidad += 1;
            element.total += element.precio;
            noEncontro = false;
            break;
          }else{
            noEncontro = true;
          }
        }

        if(noEncontro == true){
          this.agregarProducto(data);
          noEncontro = false;
        }
      }

      if(this.carrito.length == 0){
        console.log('aqui entro');
        this.agregarProducto(data);
      }

      console.log(this.carrito);
    }
    if(this.variables.logueado == false){
      Swal.fire({
        html: "<p>Debe iniciar sesion para poder realizar esta acción</p>",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Iniciar Sesion'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['inicioSesion']);
      }
      return;
    });
   }
  }

  agregarProducto(data:any){
    let add: any;

    add = {
      id: data.id,
      imagen: data.imagen,
      nombre: data.nombre,
      precio: data.precio,
      cantidad: 1,
      total: data.precio
    }

    console.log(add);
    this.carrito.push(add);
  }


  pedidos(){
    this.router.navigate(['pedidos/activos']);
  }

  pedidosCliente(){
    this.router.navigate(['cliente/pedidos']);
  }

  reportePedidos(){

  }

  reporteUsuarios(){
    this.router.navigate(['reporteUsuarios']);
  }

  eliminar(data:any){
    console.log(data);
    if(this.carrito[data].cantidad > 1){
      this.carrito[data].cantidad -=1
    }
    else if(this.carrito[data].cantidad == 1){
      this.carrito.splice(data,1);
    }
    console.log(this.carrito);
  }

  realizarCompra(){
    console.log(this.carrito);
    this.variables.carrito = this.carrito;
    this.router.navigate(['compra']);
  }
}
