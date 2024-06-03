import { Component, inject, signal } from '@angular/core';
import { ReservaI } from '../../interfaces/ReservaI';
import { ReservasService } from '../../services/reservas.service';
import { MesasService } from '../../services/mesas.service';
import { MesasI } from '../../interfaces/MesasI';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {

  public listadoReservas = signal<ReservaI[]>([]);
  public listadoMesas = signal<MesasI[]>([]);
  reservaService = inject(ReservasService);
  mesasService = inject(MesasService);

  ngOnInit(){
    //nos subscribimos a los dos metodos para obtener la lista de las mesas y reservas completas

    this.reservaService.getReservas().subscribe({
      next: (data: any) => {
        this.listadoReservas.set(data.data);
        console.log(data.data);
      },
      error: (e) => {
        console.error(e);
      }
    });

    this.mesasService.getMesas().subscribe({
      next: (data:any) => {
        this.listadoMesas.set(data.data);
      },
      error: (e) => {
        console.error(e);
      }
    });

  }


}
