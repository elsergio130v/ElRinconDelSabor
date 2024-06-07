import { Component, inject, signal } from '@angular/core';
import { ReservasService } from '../../services/reservas.service';
import { ReservaActualI } from '../../interfaces/ReservaActualI';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {

  public reservasActuales = signal<ReservaActualI[]>([]);
  private reservaServicio = inject(ReservasService);

  ngOnInit(){
    this.getReservasActuales();

  }


  getReservasActuales(){

    this.reservaServicio.getReservasActules().subscribe({
      next: (data: any) => {
        console.log(data);
      console.log(this.reservasActuales());
      this.reservasActuales.set(data.data);
      console.log(this.reservasActuales());
    },
    error: (e) => {
      console.error(e);
    }

      }); 

  }
}
