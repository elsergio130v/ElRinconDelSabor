import { Component, OnInit, inject, signal } from '@angular/core';
import { UserI } from '../../interfaces/userI';
import { UsuariosService } from '../../services/usuarios.service';
import { UserRegistroI } from '../../interfaces/UserRegistroI';
import { AuthService } from '../../services/authService.service';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-vista-admin',
  standalone: true,
  imports: [RouterLinkActive, RouterLinkWithHref],
  templateUrl: './vista-admin.component.html',
  styleUrl: './vista-admin.component.css'
})
export class VistaAdminComponent implements OnInit{
  public listadoUsuarios = signal<UserI[]>([]);
  usuarioService = inject(UsuariosService);
  authservice = inject(AuthService)
  usuario:UserRegistroI = this.authservice.usuarioSesion;

  ngOnInit(){
    this.obtenerUsuarioSiEstaLogueado(this.usuario);

    if(this.usuario.dataUser.rol === "GERENTE"){
      
          this.usuarioService.getUsuarios().subscribe({
            next: (data: any) => {
              this.listadoUsuarios.set(data.data);
              console.log(data.data);
            },
            error: (e) => {
              console.error(e);
            }
          });
    }else{
      window.location.href = "";
    }
  }


  obtenerUsuarioSiEstaLogueado(usuario:UserRegistroI){

    if(this.authservice.getExpiracion()){
      let date = new Date().getTime();
      if(parseInt(this.authservice.getExpiracion()) <= date){
        //tiempo de expiracion cumplido, sesion cerrada
        this.authservice.logout();

      }else{
         //tiempo de expiracion en curso 

         if(this.authservice.getToken()){
      
          let token = this.authservice.getToken(); 
          usuario.dataUser.accessToken = token!;
          //definimos el token del usuario, nos subscribimos al metodo get token 
          //que llama al authservice, este llama al back con el token del local
          //y nos actualiza el user que le pasamos por paramatro que es su response
          this.getToken(usuario);
    
        }
      }
    }
  }

  getToken(usuario:UserRegistroI):void{
    this.authservice.getUsuarioToken(usuario).subscribe(res => {
      this.usuario = res;
    });
  }

}
