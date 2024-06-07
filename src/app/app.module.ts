import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { LandinPageComponent } from './componentes/landin-page/landin-page.component';
import { LoginComponent } from './componentes/login/login.component';
import { ReservasComponent } from './componentes/reservas/reservas.component';
import { CartaComponent } from './componentes/carta/carta.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/authService.service';
import { HeaderComponent } from './componentes/header/header.component';
import { FormatearFechaPipe } from './pipes/formatear-fecha.pipe';


@NgModule({
  declarations: [
    FormatearFechaPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [AuthService],
  bootstrap: []
})
export class AppModule { }
