import { PedidoPizzasI } from "./PedidoPizzasI";

export interface NuevoPedidoI {
    pizzas:PedidoPizzasI[],
    emailPedido:string,
    idPedido:number,

}