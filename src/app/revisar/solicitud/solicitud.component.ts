import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { servicios } from 'src/app/servicios/servicios.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  detalleSolicitud:any;
  solicitud: any;
  verTabla = true;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicios: servicios,
    private router: Router) { }

  ngOnInit(): void {
    this.servicios.DetalleSolicitud(this.data.numerogestion).subscribe((res) => {
      console.log(res);
      this.detalleSolicitud = res;
    });
  }

  completar(){
    this.servicios.ConsultarSolicitud(this.data.numerogestion).subscribe((res) => {
      console.log(res); 
      this.solicitud = res;
      const bodyActualizar = {
        aplica_oferta: this.solicitud.aplica_oferta,
        direccion: this.solicitud.direccion,
        estado: 2,
        fecha_solicitud: this.solicitud.fecha_solicitud,
        numerogestion: this.solicitud.numerogestion,
        total: this.solicitud.total,
        usuario: this.solicitud.usuario
      }
      console.log(bodyActualizar);
      this.servicios.putActualizarSolicitud(bodyActualizar).subscribe((res) => {
        console.log(res);
        if(res!=null){
          Swal.fire({
            html: "<p>Solicitud Completada Exitosamente</p>",
            icon: 'success'
          });
          this.dialogRef.close({ actualizar: false, cerro: true });
          this.router.navigate(['catalogo']);
        }
        });
    }); 
  }
  
  cerrar(){
    this.dialogRef.close({ actualizar: false, cerro: true });
  }



}
