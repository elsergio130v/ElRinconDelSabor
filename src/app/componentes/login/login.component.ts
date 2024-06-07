import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService.service';
import { UserI } from '../../interfaces/userI'; 
import { UserRegistroI } from '../../interfaces/UserRegistroI';

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
    });
  }
  registro(form:any): void {
    console.log(form.value)
    this.authService.register(form.value).subscribe(res => {
    });
  }




}