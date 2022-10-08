import { Component, OnInit } from '@angular/core';
import { servicios } from 'src/app/servicios/servicios.service';
import Swal from 'sweetalert2';
import { variables } from 'src/app/servicios/variables';
import {Router} from '@angular/router';

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
  admin = false;
  carrito: any = [];
  constructor(private servicios: servicios,
    private variables: variables,
    private router: Router
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
    if(this.variables.rol == 'admin'){
      this.admin = true;
    }
    this.logueado = this.variables.logueado;
  }

  async comprar(data: any){

    if(this.variables.logueado == true){
      console.log('PRODUCTO',data);
      this.carrito.push(data);
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

  pedidos(){

  }

  reportePedidos(){

  }

  reporteUsuarios(){

  }

  eliminar(data:any){
    console.log(data);
    this.carrito.splice(data,1);
    console.log(this.carrito);
  }
}
