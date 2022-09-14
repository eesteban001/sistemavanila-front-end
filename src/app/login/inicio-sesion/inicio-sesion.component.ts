import { Component, OnInit } from '@angular/core';
import { servicios } from 'src/app/servicios/servicios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  hide = false;
  imageSrc = 'assets/imagenes/logo.jpg';
  parametro = '';
  userForm: FormGroup;
  constructor(private servicios: servicios) { 
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
          html: "<p>Las credenciales ingresadas son validas</p>",
          icon: 'success'
        })
        return;
      }
    });
    //const usuarios: any = await this.servicios.ConsultaUsuario(this.usuario).toPromise();
    //console.log('Usuarios', usuarios);
  }
}
