import {  Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, timestamp } from 'rxjs/operators';
import { Observable, BehaviorSubject,  } from 'rxjs';
import { UserRegistroI } from '../interfaces/UserRegistroI';
import { Router } from '@angular/router';
import { Expansion } from '@angular/compiler';
import { UserI } from '../interfaces/userI';


@Injectable({
  providedIn:"root"
})
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000/rincondelsabor';
  authSubject = new BehaviorSubject(false);

  private token!: string;
  private expiracion!: string;
  public usuarioSesion:UserRegistroI = this.getDefaultUser();



  constructor(private httpClient: HttpClient, private router: Router) { }



  register(user: UserRegistroI): Observable<UserRegistroI> {
    return this.httpClient.post<UserRegistroI>(`${this.AUTH_SERVER}/registro`,
      user).pipe(tap(
        (res: UserRegistroI) => {
          if (res) {
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
            this.usuarioSesion = res;
            window.location.href = "";
          }
        })
      );
    }
    
    login(user: UserRegistroI): Observable<UserRegistroI> {
      return this.httpClient.post<UserRegistroI>(`${this.AUTH_SERVER}/login`,
      user).pipe(tap(
        (res: UserRegistroI) => {
          if (res) {
            
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
            this.usuarioSesion = res;
            window.location.href = "";
            
          }
        })
      );
  }

  editarUserSinContrasena(user: UserRegistroI): Observable<UserRegistroI> {
    return this.httpClient.post<UserRegistroI>(`${this.AUTH_SERVER}/editarUserSinContrasena`,
    user).pipe(tap(
      (res: UserRegistroI) => {
        if (res) {
          
          // guardar token
          this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          this.usuarioSesion = res;
          window.location.href = "";
          
        }
      })
    );
}

editarUserConContrasena(user: UserI): Observable<UserRegistroI> {
  return this.httpClient.post<UserRegistroI>(`${this.AUTH_SERVER}/editarUserConContrasena`,
  user).pipe(tap(
    (res: UserRegistroI) => {
      if (res) {
        
        // guardar token
        this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
        this.usuarioSesion = res;
        window.location.href = "";
        
      }
    })
  );
}




  getUsuarioToken(usuario:UserRegistroI): Observable<UserRegistroI> {
    return this.httpClient.post<UserRegistroI>(`${this.AUTH_SERVER}/getUserToken`,
    usuario).pipe(tap(
      (res: any) => {
        if (res) {
          
          // guardar token
          this.usuarioSesion = res; 
          console.log("tel service- "+ res.dataUser.telefono)
        }else{
          console.log("fallo: "+res)
        }
      })
    );
}



  logout(): void {
    console.log("entramos en logout");
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    //el usuario pasa a por defecto
    this.usuarioSesion = this.getDefaultUser();
    window.location.href = "";

  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);

    let fecha = new Date();
    let fecha2 = fecha.getTime() + parseInt(expiresIn);
    localStorage.setItem("EXPIRES_IN", fecha2.toString());
    this.expiracion = fecha2.toString();
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN")!;
    }
    return this.token;
  }

  public getExpiracion(): string {
    if(!this.expiracion){
      this.expiracion = localStorage.getItem("EXPIRES_IN")!;
    }
    return this.expiracion;
  }
  

  public getusuarrioSesion(){
    console.log(this.usuarioSesion)
    return this.usuarioSesion;
  }

  private getDefaultUser(){
    
    let user:UserRegistroI = {
      dataUser:{
        nombre: 'Log In',
          email:"",
          password:"",
          apellidos:"",
          ciudad:"",
          cp:"",
          rol:"",
          telefono:"",
          accessToken:"",
          expiresIn:""
      }
    };
    return user;
  }
}