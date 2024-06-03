import { Component, inject, signal } from '@angular/core';
import { ReservaI } from '../../interfaces/ReservaI';
import { ReservasService } from '../../services/reservas.service';
import { MesasService } from '../../services/mesas.service';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {

  public listadoReseras = signal<ReservaI[]>([]);
  reservaService = inject(ReservasService);
  mesasService = inject(MesasService);

  ngOnInit(){
    this.reservaService.getReservas().subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.listadoReseras.set(data.data);
        console.log(this.listadoReseras());
      },
      error: (e) => {
        console.error(e);
      }
    });

  }


}
