import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  isLogin = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  cambiarForm() {
    this.isLogin = !this.isLogin;
  }

  onLogin(form:any): void {
    this.authService.login(form.value).subscribe(res => {
      if (res){
        Swal.fire({
          title: "Inicio de Sesión Exitoso",
          text: "Cierra la ventana pulsando en cerrar",
          icon: "success"
        });
        setTimeout(() => {
          window.location.href = ""; 
        }, 2000);
      }
    });
  }
  registro(form:any): void {
    console.log(form.value)
    this.authService.register(form.value).subscribe(res => {
      if (res){
        Swal.fire({
          title: "Registro Exitoso",
          text: "Cierra la ventana pulsando en cerrar",
          icon: "success"
        })
        setTimeout(() => {
          window.location.href = ""; 
        }, 2000);
      }
    });
  }




}