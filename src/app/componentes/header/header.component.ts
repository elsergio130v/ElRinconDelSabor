import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../services/authService.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeaderComponent,RouterLinkWithHref,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  authservice = inject(AuthService);
  nombreusuario = signal("og in");

onInit(){

  if(this.authservice.usuarioSesion !== null || this.authservice.usuarioSesion.dataUser.nombre.length !== 0){   
    this.nombreusuario = this.authservice.dataUser.nombre;
  }
}
    

};

