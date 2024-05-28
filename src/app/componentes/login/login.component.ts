import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService.service';
import { UserI } from '../../interfaces/userI'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  isLogin = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // this.authService.getToken()
  }

  cambiarForm() {
    this.isLogin = !this.isLogin;
  }

  onLogin(form:any): void {
    this.authService.login(form.value).subscribe(res => {
    });
  }


}