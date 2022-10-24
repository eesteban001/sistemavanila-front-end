import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class servicios {

    local = 'http://localhost:8010'
    azure = 'https://sistemavanila-ms.azurewebsites.net'
    constructor(private http: HttpClient) {
    }

    public ConsultaUsuario(usuario: string): Observable<any>{
        return this.http.get<any>(`${this.azure}/usuario/consultar-usuario/${usuario}`);
    }

    public postRegistrarUsuario(body: any) {
        return this.http.post<any>(`${this.azure}/usuario/agregar`, body);
    }

    public ConsultaAllProducto(): Observable<any>{
        return this.http.get<any>(`${this.azure}/producto/consultar`);
    }

    public ConsultaDireccionesByUsuario(usuario: string): Observable<any>{
        return this.http.get<any>(`${this.azure}/direccion/direccion/${usuario}`);
    }

    public postRegistrarDireccion(body: any) {
        return this.http.post<any>(`${this.azure}/direccion/agregar`, body);
    }

    public ConsultaAllDepartamentos(): Observable<any>{
        return this.http.get<any>(`${this.azure}/departamento/consultar`);
    }

    public ConsultaMunicipioByDepartamento(id: number): Observable<any>{
        return this.http.get<any>(`${this.azure}/municipio/municipios/${id}`);
    }

    public postRegistrarSolicitud(body: any) {
        return this.http.post<any>(`${this.azure}/solicitud/agregar`, body);
    }

    public postRegistrarProductosSolicitud(body: any) {
        return this.http.post<any>(`${this.azure}/producto-solicitado/agregar`, body);
    }

    public getNumeroGestion(): Observable<any>{
        return this.http.get<any>(`${this.azure}/solicitud/numeroGestion`);
    }

    public ReportePedidosByUsuario(usuario: string): Observable<any>{
        return this.http.get<any>(`${this.azure}/reportes/reporte-pedidos/${usuario}`);
    }

    public DetalleSolicitud(numerogestion: number): Observable<any>{
        return this.http.get<any>(`${this.azure}/reportes/detalle-solicitud/${numerogestion}`);
    }

    public ReporteSolicitudesActivas(): Observable<any>{
        return this.http.get<any>(`${this.azure}/reportes/reporte-solicitudes-activas`);
    }

    public ReporteUsuarios(): Observable<any>{
        return this.http.get<any>(`${this.azure}/reportes/reporte-usuarios`);
    }
    
    public ReporteCompletados(): Observable<any>{
        return this.http.get<any>(`${this.azure}/reportes/reporte-completados`);
    }

    public putActualizarSolicitud(body: any) {
        return this.http.put<any>(`${this.azure}/solicitud/actualizar`, body);
    } 

    public ConsultarSolicitud(numerogestion: any): Observable<any>{
        return this.http.get<any>(`${this.azure}/solicitud/consultar-solicitud/${numerogestion}`);
    }
}