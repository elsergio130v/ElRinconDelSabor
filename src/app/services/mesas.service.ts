import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  getMesas(){
      let url = new URL('http://localhost:3000/rincondelsabor/mesas');
      console.log(this.httpClient.get(url.toString()));
      return this.httpClient.get(url.toString());
  }

}
