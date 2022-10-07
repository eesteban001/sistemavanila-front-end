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
        return this.http.get<any>(`http://localhost:8010/usuario/consultar-usuario/${usuario}`);
    }

    public postRegistrarUsuario(body: any) {
        return this.http.post<any>(`http://localhost:8010/usuario/agregar`, body);
    }

    public ConsultaAllProducto(): Observable<any>{
        return this.http.get<any>(`http://localhost:8010/producto/consultar`);
    }
}