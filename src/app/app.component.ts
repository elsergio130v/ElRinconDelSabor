import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

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


  usuarioGlobal:UserRegistroI = this.getDefaultUser();


  ngOnInit() {

    //comprobamos si en nuestro localStorage existe un token, si es asi y el usuario global de la app es null
    //hacemos una peticion al back con el token, lo verificamos y traemos el objeto user
    if(this.authservice.getExpiracion()){
      let date = new Date().getTime();
      if(parseInt(this.authservice.getExpiracion()) <= date){
        //tiempo de expiracion cumplido, sesion cerrada
        this.authservice.logout();

      }else{
         //tiempo de expiracion en curso 
      }
    }

    //antes de esto, comprobar la caducidad del token, ya que si 
    //ha cumplido la expiracion se elimina
    if(this.authservice.getToken()){
      
      let token = this.authservice.getToken(); 
      this.usuarioGlobal.dataUser.accessToken = token!;
      //definimos el token del usuario, nos subscribimos al metodo get token 
      //que llama al authservice, este llama al back con el token del local
      //y nos actualiza el user que le pasamos por paramatro que es su response

      this.getToken(this.usuarioGlobal);

    }
    
  }

  getToken(usuario:UserRegistroI):void{
    this.authservice.getUsuarioToken(usuario).subscribe(res => {
      this.usuarioGlobal = res;
    });
  }

  comprobarExpiracion(){
    
    // Recuperar el objeto de localStorage
    var storedObject = JSON.parse(this.getExpirateToken()!);

if (storedObject) {
    // Obtener la fecha y hora actuales
    var currentTimestamp = new Date().getTime();

    // Obtener la marca de tiempo almacenada
    var storedTimestamp = storedObject.timestamp;

    // Comparar las dos marcas de tiempo
    if (currentTimestamp > storedTimestamp) {
        console.log("La fecha almacenada es anterior a la fecha actual.");
    } else if (currentTimestamp < storedTimestamp) {
        console.log("La fecha almacenada es posterior a la fecha actual.");
    } else {
        console.log("La fecha almacenada es igual a la fecha actual.");
    }
} else {
    console.log("No se encontró ningún objeto en localStorage con la clave especificada.");
}

  }

  private getDefaultUser(){
    
    let user = {
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
    return user;
  }

  private getExpirateToken(){
    return localStorage.getItem("EXPIRES_IN");
  }

}
