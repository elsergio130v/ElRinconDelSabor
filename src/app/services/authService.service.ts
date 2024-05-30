import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../interfaces/userI'; 
import { JwtResponse } from '../interfaces/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserRegistroI } from '../interfaces/UserRegistroI';


@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000/rincondelsabor';
  authSubject = new BehaviorSubject(false);
  private token!: string;
  public usuarioSesion?:UserRegistroI;
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
          }
        })
      );
  }

  login(user: UserRegistroI): Observable<UserRegistroI> {
    return this.httpClient.post<UserRegistroI>(`${this.AUTH_SERVER}/login`,
      user).pipe(tap(
        (res: UserRegistroI) => {
          if (res) {
            console.log(res)
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
            this.usuarioSesion = res;
          }
        })
      );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN")!;
    }
    return this.token;
  }

}