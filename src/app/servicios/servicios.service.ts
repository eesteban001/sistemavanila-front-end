import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class servicios {


    constructor(private http: HttpClient) {
    }

    public ConsultaUsuario(usuario: string): Observable<any>{
        //return this.http.get<any>(`http://localhost:8010/usuario/consultar-usuario/${usuario}`);
        return this.http.get<any>(`https://sistemavanila-ms.azurewebsites.net/usuario/consultar-usuario/${usuario}`);
    }

    public postRegistrarUsuario(body: any) {
        //return this.http.post<any>(`http://localhost:8010/usuario/agregar`, body);
        return this.http.post<any>(`https://sistemavanila-ms.azurewebsites.net/usuario/agregar`, body);
    }

    public ConsultaAllProducto(): Observable<any>{
        //return this.http.get<any>(`http://localhost:8010/producto/consultar`);
        return this.http.get<any>(`https://sistemavanila-ms.azurewebsites.net/producto/consultar`);
    }

    public ConsultaDireccionesByUsuario(usuario: string): Observable<any>{
        //return this.http.get<any>(`http://localhost:8010/direccion/direccion/${usuario}`);
        return this.http.get<any>(`https://sistemavanila-ms.azurewebsites.net/direccion/direccion/${usuario}`);
    }

    public postRegistrarDireccion(body: any) {
        //return this.http.post<any>(`http://localhost:8010/direccion/agregar`, body);
        return this.http.post<any>(`https://sistemavanila-ms.azurewebsites.net/direccion/agregar`, body);
    }

    public ConsultaAllDepartamentos(): Observable<any>{
        //return this.http.get<any>(`http://localhost:8010/departamento/consultar`);
        return this.http.get<any>(`https://sistemavanila-ms.azurewebsites.net/departamento/consultar`);
    }

    public ConsultaMunicipioByDepartamento(id: number): Observable<any>{
        //return this.http.get<any>(`http://localhost:8010/municipio/municipios/${id}`);
        return this.http.get<any>(`https://sistemavanila-ms.azurewebsites.net/municipio/municipios/${id}`);
    }

    public postRegistrarSolicitud(body: any) {
        //return this.http.post<any>(`http://localhost:8010/solicitud/agregar`, body);
        return this.http.post<any>(`https://sistemavanila-ms.azurewebsites.net/solicitud/agregar`, body);
    }

    public postRegistrarProductosSolicitud(body: any) {
        //return this.http.post<any>(`http://localhost:8010/producto-solicitado/agregar`, body);
        return this.http.post<any>(`https://sistemavanila-ms.azurewebsites.net/producto-solicitado/agregar`, body);
    }

    public getNumeroGestion(): Observable<any>{
        //return this.http.get<any>(`http://localhost:8010/solicitud/numeroGestion`);
        return this.http.get<any>(`https://sistemavanila-ms.azurewebsites.net/solicitud/numeroGestion`);
    }

    public ReportePedidosByUsuario(usuario: string): Observable<any>{
        //return this.http.get<any>(`http://localhost:8010/reportes/reporte-pedidos/${usuario}`);
        return this.http.get<any>(`https://sistemavanila-ms.azurewebsites.net/reportes/reporte-pedidos/${usuario}`);
    }

    public DetalleSolicitud(numerogestion: number): Observable<any>{
        //return this.http.get<any>(`http://localhost:8010/reportes/detalle-solicitud/${numerogestion}`);
        return this.http.get<any>(`https://sistemavanila-ms.azurewebsites.net/reportes/detalle-solicitud/${numerogestion}`);
    }

    public ReporteSolicitudesActivas(): Observable<any>{
        //return this.http.get<any>(`http://localhost:8010/reportes/reporte-solicitudes-activas`);
        return this.http.get<any>(`https://sistemavanila-ms.azurewebsites.net/reportes/reporte-solicitudes-activas`);
    }

    public ReporteUsuarios(): Observable<any>{
        //return this.http.get<any>(`http://localhost:8010/reportes/reporte-usuarios`);
        return this.http.get<any>(`https://sistemavanila-ms.azurewebsites.net/reportes/reporte-usuarios`);
    }
    
}