import { Component, inject, signal } from '@angular/core';
import { Pizza } from '../../interfaces/pizza';
import { ProductService } from '../../services/product.service';
import { UserRegistroI } from '../../interfaces/UserRegistroI';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [],
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.css'
})
export class CartaComponent {


  private product = inject(ProductService);
  public listadoPizzas = signal<Pizza[]>([]);
  public app = inject(AppComponent);
  public Usuario:UserRegistroI = this.app.usuarioGlobal;
  public isPedido:boolean = false;
  

  ngOnInit() {
    if(this.Usuario.dataUser.rol === "EMPLEADO" ){
      this.isPedido = true;

    }

    
    this.product.getAllPizzas().subscribe({
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
}
