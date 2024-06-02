import { Component, inject } from '@angular/core';
import { Router, Event, NavigationEnd, RouterOutlet } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';

import { IStaticMethods } from 'preline/preline';
import { UserRegistroI } from './interfaces/UserRegistroI';
import { AuthService } from './services/authService.service';
import { ElementSchemaRegistry } from '@angular/compiler';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ProyectoPruebaTfg';
  constructor(private router: Router) {}
  authservice = inject(AuthService);


  usuarioGlobal:UserRegistroI = {
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

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.HSStaticMethods.autoInit();
        }, 100);
      }
    });
    //comprobamos si en nuestro localStorage existe un token, si es asi y el usuario global de la app es null
    //hacemos una peticion al back con el token, lo verificamos y traemos el objeto user

    if(localStorage.getItem("ACCESS_TOKEN") !== undefined){
      //si el token no esta vacio entra aqui lo declaramos y hacemos una peticion para rellenar los datos del usuario
      console.log("entra");
      console.log("token "+localStorage.getItem("ACCESS_TOKEN"));
      
      let token = localStorage.getItem("ACCESS_TOKEN"); 
      this.usuarioGlobal.dataUser.accessToken = token!;
      console.log(this.usuarioGlobal)
      this.getToken(this.usuarioGlobal);
    }else{
      console.log(this.usuarioGlobal)

    }
    
    
  }
  getToken(usuario:UserRegistroI):void{
    this.authservice.prueba(usuario).subscribe(res => {
    });
  }

}
