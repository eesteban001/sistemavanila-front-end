import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './login/inicio-sesion/inicio-sesion.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegitarUsuarioComponent } from './login/regitar-usuario/regitar-usuario.component'
import { MatDialogModule } from '@angular/material/dialog';
import { VisualizarComponent } from './catalogo/visualizar/visualizar.component';
import { variables } from 'src/app/servicios/variables';
import { servicios } from 'src/app/servicios/servicios.service';
import { RealizarCompraComponent } from './compra/realizar-compra/realizar-compra.component';
import { RegistroDireccionComponent } from './direccion/registro-direccion/registro-direccion.component';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PedidosRealizadosComponent } from './reportes/pedidos-realizados/pedidos-realizados.component';
import { DetalleSolicitudComponent } from './reportes/detalle-solicitud/detalle-solicitud.component';
import { PedidosActivosComponent } from './reportes/pedidos-activos/pedidos-activos.component';
import { UsuariosComponent } from 'src/app/reportes/usuarios/usuarios.component';
import { SolicitudComponent } from './revisar/solicitud/solicitud.component';

const routes: Routes = [
  { path: 'inicioSesion', component: InicioSesionComponent },
  { path: 'catalogo', component: VisualizarComponent},
  { path: 'compra', component: RealizarCompraComponent},
  { path: 'cliente/pedidos', component: PedidosRealizadosComponent},
  { path: 'reporteUsuarios', component: UsuariosComponent},
  { path: 'pedidos/activos', component: PedidosActivosComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    RegitarUsuarioComponent,
    VisualizarComponent,
    RealizarCompraComponent,
    RegistroDireccionComponent,
    PedidosRealizadosComponent,
    DetalleSolicitudComponent,
    PedidosActivosComponent,
    UsuariosComponent,
    SolicitudComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [
    servicios,
    variables
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
