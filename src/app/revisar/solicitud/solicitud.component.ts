import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { servicios } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  detalleSolicitud:any;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicios: servicios) { }

  ngOnInit(): void {
    console.log(this.data);
    this.servicios.DetalleSolicitud(this.data.numerogestion).subscribe((res) => {
      console.log(res);
      this.detalleSolicitud = res;
    });
  }

  completar(){

  }
  
  cerrar(){
    this.dialogRef.close({ actualizar: false, cerro: true });
  }
}
