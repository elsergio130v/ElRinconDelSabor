import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  getUsuarios(){
      let url = new URL('http://localhost:3000/rincondelsabor/allUsers');
      console.log(this.httpClient.get(url.toString()));
      return this.httpClient.get(url.toString());
  }

}