import { Component, inject, signal } from '@angular/core';
import { Pizza } from '../../interfaces/pizza';
import { ProductService } from '../../services/product.service';

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
  pizzas:any;
  


  ngOnInit() {
    console.log("inicia");
    
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
