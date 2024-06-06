import { Component, inject, signal } from '@angular/core';
import { ReservaI } from '../../interfaces/ReservaI';
import { ReservasService } from '../../services/reservas.service';
import { MesasService } from '../../services/mesas.service';
import { MesasI } from '../../interfaces/MesasI';
import { CalendarioComponent } from '../calendario/calendario.component';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CalendarioComponent],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {

  public listadoReservas = signal<ReservaI[]>([]);
  public listadoMesas = signal<MesasI[]>([]);
  public mesasSeleccionadas = signal<MesasI[]>([]);
  reservaService = inject(ReservasService);
  mesasService = inject(MesasService);
  minDate!: string;
  dateHabilitado:boolean = false;
  habilitarHorario:boolean = false;
  horasDisponibles:number[] = [13, 14, 15, 21, 22, 23];
  horasOcupadas:number[] = [];
  horasFiltradas:number[] = [];
  
  idMesas:number[] = [];

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

    this.setMinDate();

  }

  seleccionarMesa(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.mesasService.getMesasPorComensales({numero: value}).subscribe({
      next: (data:any) => {
        this.mesasSeleccionadas.set(data.result);
        data.result.forEach((objeto: any) => {
          // Leer los valores de idMesa y comensales de cada objeto
          const idMesa = objeto.idMesa;
          this.idMesas.push(idMesa);
          
        });
        
        
      },
      error: (e) =>{
        console.error(e);
      }
    });

    this.dateHabilitado = true;
    // Aquí puedes realizar la lógica necesaria con el valor seleccionado.
    // Por ejemplo, podrías guardar el valor en una variable de clase
    // para usarlo más adelante en el componente.
  }

  seleccionarDate(event: Event):void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    if (value){
      this.habilitarHorario = true;
      // console.log(value)
      console.log(this.idMesas)
      //llamar a una peticion de la bbdd en la que paso el dia, mes, año 
      // y obtengo las horas que estan cogidas en esa fecha,
      //entonces, segun el array de horasDisponibles 
      //cuando hay coincidencia de numero, lo eliminamos del array.
      this.reservaService.getHorasReservadas({fecha:value},{comensales:this.idMesas}).subscribe({
        next: (data:any) => {
          console.log(data)
          console.log(data.horas[0])
          for (let i = 0; i < data.horas.length; i++) {
            data.horas[i] = data.horas[i] - 2;
          }
          this.horasOcupadas = data.horas;
          console.log(data.horas)
          this.horasFiltradas = this.horasDisponibles.filter(hora => !this.horasOcupadas.includes(hora));

        },
        error: (e) => {
          console.error("failed"+e)
        }
      });


    }
  }

  setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    this.minDate = today;
  }





}
