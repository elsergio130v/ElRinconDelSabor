import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CartaComponent } from './componentes/carta/carta.component';
import { ReservasComponent } from './componentes/reservas/reservas.component';
import { LandinPageComponent } from './componentes/landin-page/landin-page.component';
import { EditProfileComponent } from './componentes/edit-profile/edit-profile.component';
import { VistaAdminComponent } from './componentes/vista-admin/vista-admin.component';
import { HistoricoReservasComponent } from './componentes/historico-reservas/historico-reservas.component';


export const routes: Routes = [

    { path: "", component: LandinPageComponent },
    // { path: "inicio", component: LandinPageComponent },
    // { path: "inicioSesion", component: LoginComponent },
    { path: "reservas", component: ReservasComponent  },
    { path: "carta", component: CartaComponent  },
    { path: "editprofile", component: EditProfileComponent, },
    { path: 'inicioSesion', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: "vistaAdmin", component: VistaAdminComponent },
    { path: "historicoReservas", component: HistoricoReservasComponent }



];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
