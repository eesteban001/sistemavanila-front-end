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
        return this.http.get<any>(`/usuario/consultar-usuario/${usuario}`);
    }
}