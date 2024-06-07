import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ReservasHistoricas } from '../interfaces/ReservasHistoricas';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  getReservas(){
      let url = new URL('http://localhost:3000/rincondelsabor/reservas');
      console.log(this.httpClient.get(url.toString()));
      return this.httpClient.get(url.toString());
  }
  getReservasFuturas(){
    let url = new URL('http://localhost:3000/rincondelsabor/reservasFuturas');
    console.log(this.httpClient.get(url.toString()));
    return this.httpClient.get(url.toString());
  }

  getReservasActules(){
    let url = new URL('http://localhost:3000/rincondelsabor/getReservasActules');
    console.log(this.httpClient.get(url.toString()));
    return this.httpClient.get(url.toString());
  }

  getHistoricoReservas(email:{email:string}){
    return this.httpClient.post<ReservasHistoricas[]>('http://localhost:3000/rincondelsabor/getHistoricoReservas', email)
    .pipe(tap(
      (res:ReservasHistoricas[]) =>{
        if(res){
          console.log("correcto")
        }else{
          console.log("failed")
          
        }
      })
    );
  }

  getHorasReservadas(fecha:{fecha:string}, comensales:{comensales:number[]}): Observable<number[]>{
    return this.httpClient.post<number[]>('http://localhost:3000/rincondelsabor/getHorasReservadas', {fecha, comensales})
    .pipe(tap(
      (res:number[]) =>{
        if(res){
          console.log("correcto")
        }else{
          console.log("failed")
          
        }
      })
    );
  }

  getIdMesaLibrePorHora(fecha:{fecha:string}, comensales:{comensales:number}): Observable<number>{
    return this.httpClient.post<number>('http://localhost:3000/rincondelsabor/getIdMesaLibrePorHora', {fecha, comensales})
    .pipe(tap(
      (res:number) =>{
        if(res){
          console.log("correcto")
        }else{
          console.log("failed")
          
        }
      })
    );
  }

  setReserva(fecha:{fecha:string}, idMesa:{idMesa:number}, email:{email:string}): Observable<number[]>{
    return this.httpClient.post<any>('http://localhost:3000/rincondelsabor/setReserva', {fecha, idMesa,email})
    .pipe(tap(
      (res:any) =>{
        if(res){
          console.log("correcto")
        }else{
          console.log("failed")
          
        }
      })
    );
  }

}
