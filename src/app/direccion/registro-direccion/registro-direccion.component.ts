import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { servicios } from 'src/app/servicios/servicios.service';
import { variables } from 'src/app/servicios/variables';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro-direccion',
  templateUrl: './registro-direccion.component.html',
  styleUrls: ['./registro-direccion.component.css']
})
export class RegistroDireccionComponent implements OnInit {
  direccionForm: FormGroup;
  departamentos: any;
  municipios: any;
  verTabla = true;
  validacion = false;
  direcciones: any;
  direccionSeleccion: any;
  selecciono:any;
  numeroGestion: any;
  nuevaDireccion: any;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicios: servicios,
    private variable: variables,
    private router: Router) {
      this.direccionForm = new FormGroup({
        departamento: new FormControl('', Validators.required),
        municipio: new FormControl('', Validators.required),
        nombre: new FormControl('', Validators.required),
      });
     }

  async ngOnInit(): Promise <void> {
    console.log(this.data);
    console.log(this.variable.usuarioLogueado);
    this.direcciones = await this.servicios.ConsultaDireccionesByUsuario(this.variable.usuarioLogueado).toPromise();
    console.log(this.direcciones);
    this.departamentos = await this.servicios.ConsultaAllDepartamentos().toPromise();
  }

  registrarDireccion(){
    console.log(this.direccionForm.value);
    const bodyDireccion = {
      "departamento": this.direccionForm.value.departamento,
      "id": null,
      "municipio": this.direccionForm.value.municipio,
      "nombre": this.direccionForm.value.nombre,
      "usuario": this.variable.usuarioLogueado
    }

    console.log(bodyDireccion);
    
    this.servicios.postRegistrarDireccion(bodyDireccion).subscribe((res) => {
      console.log(res);
    if(res != null){
      Swal.fire({
        html: "<p>Su Direccion fue registrada de forma correcta",
        icon: 'success',
        timer: 1000
      });
      this.actualizarTabla();
    }else{
      Swal.fire({
        html: "<p>Ocurrio un error, por favor contacte con el administrador",
        icon: 'warning'
      });
      return;
    }
    });

  }

  validar(evento: any){
    console.log(evento);
    console.log(this.direccionForm.value.departamento);
  }

  registrarPedido(){
    console.log(this.data);

    const bodyPedido = {
      "aplica_oferta": false,
      "direccion": this.direccionSeleccion,
      "estado": 1,
      "fecha_solicitud": moment(),
      "numerogestion": null,
      "total": this.data.total,
      "usuario": this.variable.usuarioLogueado
     }

     console.log(bodyPedido);

     this.servicios.postRegistrarSolicitud(bodyPedido).subscribe((res) => {
      console.log(res);
      if(res == null){
        Swal.fire({
          html: "<p>Ocurrio un error, por favor contacte con el administrador/p>",
          icon: 'warning'
        });
      }
      if(res != null){
        console.log('entro');
        this.servicios.getNumeroGestion().subscribe((res) => {
          console.log(res.numeroGestion);
          this.numeroGestion = res.numeroGestion;
          console.log(this.numeroGestion);
          if(this.numeroGestion != null){
            for (let index = 0; index < this.data.carrito.length; index++) {
              const element = this.data.carrito[index];
              const productoSolicitado = {
                "cantidad": element.cantidad,
                "fecha_ingreso": moment(),
                "id": null,
                "numerogestion": this.numeroGestion,
                "precio": element.total,
                "producto": element.id,
                "usuario_ingreso": this.variable.usuarioLogueado
              }
              console.log(productoSolicitado);
          
              this.servicios.postRegistrarProductosSolicitud(productoSolicitado).subscribe((res) => {
                console.log(res);
                if(res == null){
                  Swal.fire({
                    html: "<p>Ocurrio un error, por favor contacte con el administrador",
                    icon: 'warning'
                  });
                  this.router.navigate(['catalogo']);
                }
                }); 
            }
            Swal.fire({
              html: "<p>Su solicitud fue realizada de forma correcta",
              icon: 'success'
            })
            this.dialogRef.close({ actualizar: false, cerro: true });
            this.router.navigate(['catalogo']);
          }
        });
      }
      });
  }

  seleccion(data:any, evento:any){
    if(evento == true){
      this.selecciono = true;
      this.direccionSeleccion = data.id;
      this.direccionForm.disable();
    }
    if(evento == false){
      this.selecciono = false;
      this.direccionSeleccion = null;
      this.direccionForm.enable();
    }
    console.log(this.selecciono);
  }

  async actualizarTabla(){
    this.verTabla = false;
    this.direcciones = await this.servicios.ConsultaDireccionesByUsuario(this.variable.usuarioLogueado).toPromise();
    console.log(this.direcciones);
    this.verTabla = true;
  }

  async habilitar(data: any){
    console.log(data);
    this.municipios = await this.servicios.ConsultaMunicipioByDepartamento(data).toPromise();
    console.log(this.municipios);
  }
}
