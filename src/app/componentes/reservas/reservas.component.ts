import { Component, inject, signal } from '@angular/core';
import { ReservaI } from '../../interfaces/ReservaI';
import { ReservasService } from '../../services/reservas.service';
import { MesasService } from '../../services/mesas.service';
import { MesasI } from '../../interfaces/MesasI';
import { CalendarioComponent } from '../calendario/calendario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CalendarioComponent,ReactiveFormsModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {
  constructor(private formBuilder: FormBuilder){}

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
  idMesaInser:number= -1;

  reservar = this.formBuilder.group({
    comensales: [""],
    fecha : [""],
    horas: [''],
    email: [""],
});

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
          console.log(data)
          const idMesa = objeto.idMesa;
          this.idMesas.push(idMesa);
          
        });
        console.log(this.mesasSeleccionadas());
        
        
      },
      error: (e) =>{
        console.error(e);
      }
    });

    this.dateHabilitado = true;
  }

  seleccionarDate(event: Event):void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    if (value){
      this.habilitarHorario = true;
      //llamar a una peticion de la bbdd en la que paso el dia, mes, año 
      // y obtengo las horas que estan cogidas en esa fecha,
      //entonces, segun el array de horasDisponibles 
      //cuando hay coincidencia de numero, lo eliminamos del array.
      this.reservaService.getHorasReservadas({fecha:value},{comensales:this.idMesas}).subscribe({
        next: (data:any) => {
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


  getIdMesa(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    let comensales = parseInt(this.reservar.get("comensales")!.value!);
    let fecha = this.reservar.get("fecha")!.value;
    let hora = this.reservar.get("horas")!.value;
    let fechaCompleta = `${fecha} ${hora}:00:00`;
    console.log("entramos en getId")
    this.reservaService.getIdMesaLibrePorHora({fecha:fechaCompleta},{comensales:comensales}).subscribe({
      next: (data:any) => {
        console.log(data.result[0].idMesa);
        this.idMesaInser = data.result[0].idMesa;
      },
      error: (e) => {
        console.error(e);
      }
    })  
  }

  onSubmit(){
    let fecha = this.reservar.get("fecha")!.value;
    let hora = this.reservar.get("horas")!.value;
    let fechaCompleta = `${fecha} ${hora}:00:00`;
    let email = this.reservar.get("email")!.value;
    console.log("----- "+fechaCompleta)
    console.log("----- "+this.idMesas)
    console.log("----- "+email)
    console.log("----- "+this.idMesaInser)
    


    this.reservaService.setReserva({fecha:fechaCompleta!},{idMesa:this.idMesaInser},{email:email!}).subscribe({
      next: (res:any) => {
        console.log(res);
       },
       error: (e) => {
         console.error("failed"+e)
       }
     });

  }

  




}
