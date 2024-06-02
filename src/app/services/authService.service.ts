import {  Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserRegistroI } from '../interfaces/UserRegistroI';


@Injectable({
  providedIn:"root"
})
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000/rincondelsabor';
  authSubject = new BehaviorSubject(false);

  private token!: string;
  public usuarioSesion:UserRegistroI = {
    dataUser:{
      nombre: 'Log In',
        email:"",
        password:"",
        apellidos:"",
        ciudad:"",
        cp:"",
        rol:"",
        accessToken:"",
        expiresIn:""
    }
  };
  // public _nombreUsuario:WritableSignal<string> = signal(this.usuarioSesion.dataUser.nombre);
  public _nombreUsuario = signal('log in');



  constructor(private httpClient: HttpClient) { }



  register(user: UserRegistroI): Observable<UserRegistroI> {
    return this.httpClient.post<UserRegistroI>(`${this.AUTH_SERVER}/registro`,
      user).pipe(tap(
        (res: UserRegistroI) => {
          if (res) {
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
            //cargamos el usuario registrado como usuario de la sesion actual.
            this.usuarioSesion = res;
            this._nombreUsuario.set(this.usuarioSesion.dataUser.nombre);
            // this._nombreUsuario.update( value => this.usuarioSesion.dataUser.nombre);
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
            this._nombreUsuario.set(this.usuarioSesion.dataUser.nombre);
            // this._nombreUsuario.update( value => this.usuarioSesion.dataUser.nombre);
            console.log(this._nombreUsuario());

            // location.reload();
            
          }
        })
      );
  }

  prueba(usuario:UserRegistroI): Observable<UserRegistroI> {
    console.log("2");
    return this.httpClient.post<UserRegistroI>(`${this.AUTH_SERVER}/getUserToken`,
    usuario).pipe(tap(
      (res: any) => {
        if (res) {
          
          // guardar token
          console.log(res)
          this.usuarioSesion = res;
          // this.usuarioSesion.dataUser.accessToken = res;
          this._nombreUsuario.set(this.usuarioSesion.dataUser.nombre);

          console.log("ser"+this._nombreUsuario());;
          
        }else{
          console.log("fallo: "+res)
        }
      })
    );
}



  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    this._nombreUsuario.set('Log In');

  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN")!;
    }
    return this.token;
  }

  public getusername():any{
    return this._nombreUsuario();
  }
}