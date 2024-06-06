import { Component, inject, signal } from '@angular/core';
import { ReservasService } from '../../services/reservas.service';
import { ReservasHistoricas } from '../../interfaces/ReservasHistoricas';
import { UserRegistroI } from '../../interfaces/UserRegistroI';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-historico-reservas',
  standalone: true,
  imports: [],
  templateUrl: './historico-reservas.component.html',
  styleUrl: './historico-reservas.component.css'
})
export class HistoricoReservasComponent {

  reservaService = inject(ReservasService);
  app = inject(AppComponent);
  // listadoReservasHistoricas = signal<ReservasHistoricas[]>([]);
  public lista:ReservasHistoricas[] = [];
  Usuario:UserRegistroI = this.app.usuarioGlobal;

  ngOnInit(){
    console.log(this.Usuario)
    if(this.Usuario.dataUser){
      console.log(this.Usuario.dataUser.email);
      this.reservaService.getHistoricoReservas({email:this.Usuario.dataUser.email}).subscribe({
        next: (res:ReservasHistoricas[]) => {
          this.lista = res;
          // this.listadoReservasHistoricas.set(res);
        },
        error: (e) => {
          console.error(e);
        }

      });
    }
  }

}
