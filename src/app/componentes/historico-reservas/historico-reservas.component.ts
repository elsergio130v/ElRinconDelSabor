import { Component, inject, signal } from '@angular/core';
import { ReservasService } from '../../services/reservas.service';
import { ReservasHistoricas } from '../../interfaces/ReservasHistoricas';
import { UserRegistroI } from '../../interfaces/UserRegistroI';
import { AppComponent } from '../../app.component';
import { AuthService } from '../../services/authService.service';

@Component({
  selector: 'app-historico-reservas',
  standalone: true,
  imports: [],
  templateUrl: './historico-reservas.component.html',
  styleUrl: './historico-reservas.component.css'
})
export class HistoricoReservasComponent {

  reservaService = inject(ReservasService);
  app = inject(AppComponent);
  authservice = inject(AuthService)
  // listadoReservasHistoricas = signal<ReservasHistoricas[]>([]);
  public lista:ReservasHistoricas[] = [];
  Usuario:UserRegistroI = this.app.usuarioGlobal;

  ngOnInit(){
    this.obtenerUsuarioSiEstaLogueado();
    console.log(this.Usuario)
    if(this.Usuario.dataUser){
      console.log(this.Usuario.dataUser.email);
      this.reservaService.getHistoricoReservas({email:this.Usuario.dataUser.email}).subscribe({
        next: (res:any) => {
          this.lista = res.rows;
          console.log(res)
          console.log(this.lista)
          // this.listadoReservasHistoricas.set(res);

          // console.log("c"+this.listadoReservasHistoricas());
        },
        error: (e) => {
          console.error(e);
        }

      });
    }
  }


  obtenerUsuarioSiEstaLogueado(){

    if(this.authservice.getExpiracion()){
      let date = new Date().getTime();
      if(parseInt(this.authservice.getExpiracion()) <= date){
        //tiempo de expiracion cumplido, sesion cerrada
        this.authservice.logout();

      }else{
         //tiempo de expiracion en curso 

         if(this.authservice.getToken()){
      
          let token = this.authservice.getToken(); 
          this.Usuario.dataUser.accessToken = token!;
          //definimos el token del usuario, nos subscribimos al metodo get token 
          //que llama al authservice, este llama al back con el token del local
          //y nos actualiza el user que le pasamos por paramatro que es su response
    
          this.app.getToken(this.Usuario);
    
        }
      }
    }
  }

}
