import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CartaComponent } from './componentes/carta/carta.component';
import { ReservasComponent } from './componentes/reservas/reservas.component';
import { LandinPageComponent } from './componentes/landin-page/landin-page.component';
import { EditProfileComponent } from './componentes/edit-profile/edit-profile.component';
import { VistaAdminComponent } from './componentes/vista-admin/vista-admin.component';
import { HistoricoReservasComponent } from './componentes/historico-reservas/historico-reservas.component';
import { RegistroEmpleadoComponent } from './componentes/registro-empleado/registro-empleado.component';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';


export const routes: Routes = [

    { path: "", component: LandinPageComponent },
    // { path: "inicio", component: LandinPageComponent },
    // { path: "inicioSesion", component: LoginComponent },
    { path: "reservas", component: ReservasComponent  },
    { path: "carta", component: CartaComponent  },
    { path: "editprofile", component: EditProfileComponent, },
    { path: 'inicioSesion', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: "vistaAdmin", component: VistaAdminComponent },
    { path: "historicoReservas", component: HistoricoReservasComponent },
    { path: "registroEmpleado", component: RegistroEmpleadoComponent },
    { path: "pedido", component: PedidosComponent }




];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
