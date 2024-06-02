import { Component, inject } from '@angular/core';
import { Router, Event, NavigationEnd, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';


import { UserRegistroI } from './interfaces/UserRegistroI';
import { AuthService } from './services/authService.service';



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
  nuevoUser:any;
  // currentItem = 'Inicia Sesión';


  ngOnInit() {

    //comprobamos si en nuestro localStorage existe un token, si es asi y el usuario global de la app es null
    //hacemos una peticion al back con el token, lo verificamos y traemos el objeto user

    if(this.authservice.getToken()){

      //si el token no esta vacio entra aqui lo declaramos y hacemos una peticion para rellenar los datos del usuario
      console.log("entra");
      console.log("token "+this.authservice.getToken());
      
      let token = this.authservice.getToken(); 
      this.usuarioGlobal.dataUser.accessToken = token!;
      console.log(this.usuarioGlobal)
      // this.getToken(this.usuarioGlobal);
      this.authservice.prueba(this.usuarioGlobal).subscribe(res => {
        this.usuarioGlobal = res;
        // this.currentItem = res.dataUser.nombre;
        console.log("metodo get "+this.usuarioGlobal.dataUser.nombre);
      });
      console.log("nuevo"+this.usuarioGlobal)
      console.log("nuevo"+this.usuarioGlobal.dataUser.nombre)


    }else{
      console.log("no existe token"+this.usuarioGlobal)

    }
    
    
  }

  getToken(usuario:UserRegistroI):void{
    this.authservice.prueba(usuario).subscribe(res => {
      this.usuarioGlobal = res;
      console.log("metodo get "+this.usuarioGlobal.dataUser.nombre);
    });
  }

}
