import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { servicios } from 'src/app/servicios/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-regitar-usuario',
  templateUrl: './regitar-usuario.component.html',
  styleUrls: ['./regitar-usuario.component.css']
})
export class RegitarUsuarioComponent implements OnInit {
  hide = false;
  imageSrc = 'assets/imagenes/logo2.jpg';
  parametro = '';
  userForm: FormGroup;
  usuarios = {};
  ingresarUsuario = false;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicios: servicios
  ) {
    this.userForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required)
    });
   }


  ngOnInit(): void {
  }

  async registrarUsuario(){
    this.parametro = this.userForm.value.usuario;
    const bodyPost = {
      "usuario": this.userForm.get('usuario')?.value,
      "contraseña": this.userForm.get('contraseña')?.value,
      "nombre": this.userForm.get('nombre')?.value,
      "apellido": this.userForm.get('apellido')?.value,
      "telefono": this.userForm.get('telefono')?.value,
      "rol": "cliente"
    }

    console.log(bodyPost);

    if(bodyPost.usuario == "" || bodyPost.contraseña == "" || bodyPost.nombre == ""|| bodyPost.apellido == "" || bodyPost.telefono == ""){
      Swal.fire({
        html: "<p>Por favor ingrese los campos requeridos</p>",
        icon: 'warning'
      })
      return;
    }

    await this.validarUsuario(bodyPost);
    if(this.ingresarUsuario == false){
      Swal.fire({
        html: "<p>El usuario ingresado ya existe en el sistema actualmente, por favor cambiar el usuario</p>",
        icon: 'warning'
      })
      return;
    }if(this.ingresarUsuario == true){
      const registroUsuario: any = await this.servicios.postRegistrarUsuario(bodyPost).toPromise();
      console.log('creado', registroUsuario);


    }
  }
  
  cerrar(){
    this.dialogRef.close({ actualizar: false, cerro: true });
  }

  async validarUsuario(parametro: any){
    const validacion: any = await this.servicios.ConsultaUsuario(parametro.usuario).toPromise();
    console.log('respuesta validacion', validacion);
    if(validacion ==null){
      this.ingresarUsuario = true;
    }
  }

}
