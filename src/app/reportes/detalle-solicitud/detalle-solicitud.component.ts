import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { servicios } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styleUrls: ['./detalle-solicitud.component.css']
})
export class DetalleSolicitudComponent implements OnInit {
  detalleSolicitud: any;
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

  cerrar(){
    this.dialogRef.close({ actualizar: false, cerro: true });
  }

}
