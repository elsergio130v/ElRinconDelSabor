import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  getAllPizzas() {
    let url = new URL('http://localhost:3000/rincondelsabor/pizzas');
    console.log(this.http.get(url.toString()));
    return this.http.get(url.toString());
  }
}
