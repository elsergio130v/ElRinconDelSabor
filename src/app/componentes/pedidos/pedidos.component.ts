import { Component, inject, provideZoneChangeDetection, signal } from '@angular/core';
import { ReservasService } from '../../services/reservas.service';
import { ReservaActualI } from '../../interfaces/ReservaActualI';
import { CommonModule } from '@angular/common';
import { PedidoPizzasI } from '../../interfaces/PedidoPizzasI';
import { NuevoPedidoI } from '../../interfaces/NuevoPedidoI';
import { Pizza } from '../../interfaces/pizza';
import { ProductService } from '../../services/product.service';



@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {

  private reservaServicio = inject(ReservasService);
  private pizzaService = inject(ProductService);
  public reservasActuales = signal<ReservaActualI[]>([]);
  pedidoPizzas:PedidoPizzasI = {
    idPizza: "",
    nombre: "",
    descripcion: "",
    precio: 0,
    imagen: "",
    cantidad:0,

  };
  nuevoPedido = signal<NuevoPedidoI>({
    pizzas:[],
    emailPedido:"",
    idPedido:0,
  });
  listadoPizzas = signal<Pizza[]>([]);

  public reservaSeleccionada:Boolean = false;

  ngOnInit(){
    //obtenemos las reservas de hoy para trabajar con la que queramos.
    this.getReservasActuales();
    //llamamos ya a a funcion de cargar las pizzas para que cuando haya que mostrarlas ya esten en la signal.

    this.pizzaService.getAllPizzas().subscribe({
      next: (data: any) => {
      console.log(this.listadoPizzas());
      this.listadoPizzas.set(data.data);
      console.log(this.listadoPizzas());
    },
    error: (e) => {
      console.error(e);
    }

      });  
    

  }

//coge las reservas del dia de hoy
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

  //empieza el pedido al clicar en una reserva
  pedido(reserva:ReservaActualI){
    console.log(reserva);

    this.reservaSeleccionada = true;
    let nuevoPedido:NuevoPedidoI = {
      pizzas:[],
      emailPedido:reserva.emailUsuario,
      idPedido:0,
    };
    this.nuevoPedido.set(nuevoPedido);
  }

  //anade una pizza a la lista de pizzas en nuevo pedido.
  //cogemos la variable de pedido pizza que igual a la pizza que añadimos
  //solo que tiene +1 en cantidad.
  //declaramos una variable nuevo pedido para el ambito metodo, le añadimos 
  //pedidoPizza y le asignamos a this.nuevo pedido la variable generada
  addPizza(pizza:Pizza){
    console.log("pizza añadida "+ pizza.nombre);
    this.pedidoPizzas = {
      idPizza: pizza.idPizzas,
      nombre: pizza.nombre,
      descripcion: pizza.descripcion,
      precio: pizza.precio,
      imagen: pizza.imagen,
      cantidad:1,
    };

    let nuevoPedido = this.nuevoPedido();
    if(nuevoPedido.pizzas.length > 0){
      let repetido = false;
      nuevoPedido.pizzas.forEach(e => {
        console.log("idpiza "+e.idPizza);
        if(e.idPizza === pizza.idPizzas){
          console.log("repetido");
          repetido = true;
          e.cantidad = e.cantidad +1;
      }
    });
    if(repetido === false){
      nuevoPedido.pizzas.push(this.pedidoPizzas);
    }
  }else{
    nuevoPedido.pizzas.push(this.pedidoPizzas);
  }
    console.log(this.nuevoPedido());
    console.log(nuevoPedido);
    this.nuevoPedido.set(nuevoPedido);

  }

  existeEnLaLista(pizza:Pizza, nuevoPedido:NuevoPedidoI):boolean{
    let repetido = false;
    console.log("idpiza "+pizza.idPizzas)
    nuevoPedido.pizzas?.forEach( e => {
      console.log("idpilista"+e.idPizza)
      if(e.idPizza === pizza.idPizzas){
        e.cantidad =+ 1;
        repetido = true;
      }
    });
    return repetido;
  }
}
