import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { MesasI } from '../interfaces/MesasI';

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

  getMesasPorComensales(numero:{numero:string}): Observable<MesasI[]>{
    console.log(numero)
    return this.httpClient.post<MesasI[]>('http://localhost:3000/rincondelsabor/mesasPorComensales',
    numero).pipe(tap(
      (res:MesasI[] ) => {
        if (res) {
          console.log(res)

        }else{
          console.log("fallo: "+res)
        }
      })
    );
  }


  
//   getUsuarioToken(usuario:UserRegistroI): Observable<UserRegistroI> {
//     return this.httpClient.post<UserRegistroI>(`${this.AUTH_SERVER}/getUserToken`,
//     usuario).pipe(tap(
//       (res: UserRegistroI) => {
//         if (res) {
          
//           // guardar token
//           this.usuarioSesion = res; 
//           console.log("tel service- "+ res.dataUser.telefono)
//         }else{
//           console.log("fallo: "+res)
//         }
//       })
//     );
// }
}
