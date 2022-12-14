import { Component, OnInit } from '@angular/core';
import { servicios } from 'src/app/servicios/servicios.service';
import { variables } from 'src/app/servicios/variables';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegitarUsuarioComponent} from 'src/app/login/regitar-usuario/regitar-usuario.component';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  hide = false;
  imageSrc = 'assets/imagenes/logo2.jpg';
  parametro = '';
  userForm: FormGroup;
  usuarios = {};
  numeroGestion: any;
  constructor(private servicios: servicios,
    public dialog: MatDialog,
    private router:Router,
    private variable: variables) { 
    this.userForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required)
    });
  }

  async ngOnInit(): Promise<void> {
  }

  public async inicioSesion(){
    const credenciales = this.userForm.value;
    this.parametro = credenciales.usuario;
    this.usuarios = 0;
    this.servicios.ConsultaUsuario(this.parametro).subscribe((res) => {
      console.log('Res',res);
      console.log('Credenciales', credenciales);
      if(res == null || (credenciales.usuario != res.usuario|| credenciales.contraseña != res.contraseña)){ 
        Swal.fire({
          html: "<p>Las credenciales ingresadas son invalidas</p>",
          icon: 'warning'
        })
        return;
      }
      if(credenciales.usuario == res.usuario && credenciales.contraseña == res.contraseña){
        Swal.fire({
          title: 'Heladeria Vanila',
          text: 'Bienvenido a heladeria Vanila',
          width: 300,
          imageUrl: 'assets/imagenes/logo2.jpg',
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
          timer: 2000,   
          showConfirmButton: false
        })
        this.variable.usuarioLogueado = res.usuario;
        this.variable.logueado = true;
        this.variable.rol = res.rol;
        this.router.navigate(['catalogo']);
      }
    });
  }

  registrarUsuario(){
      const dialogRef = this.dialog.open(RegitarUsuarioComponent, {
        width: 'auto',
        height: 'auto',
        data: true,
        disableClose: true
      });
  }

  verCatalogo(){
    this.router.navigate(['catalogo']);
  }


}
