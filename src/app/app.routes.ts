import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CartaComponent } from './componentes/carta/carta.component';
import { LoginComponent } from './componentes/login/login.component';
import { ReservasComponent } from './componentes/reservas/reservas.component';
import { LandinPageComponent } from './componentes/landin-page/landin-page.component';


export const routes: Routes = [

    { path: "", component: LandinPageComponent },
    { path: "inicio", component: LandinPageComponent },
    // { path: "inicioSesion", component: LoginComponent },
    { path: "reservas", component: ReservasComponent  },
    { path: "carta", component: CartaComponent  },
    { path: 'inicioSesion', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
