import { Component, OnInit, inject, signal } from '@angular/core';
import { UserI } from '../../interfaces/userI';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-vista-admin',
  standalone: true,
  imports: [],
  templateUrl: './vista-admin.component.html',
  styleUrl: './vista-admin.component.css'
})
export class VistaAdminComponent implements OnInit{
  public listadoUsuarios = signal<UserI[]>([]);
  usuarioService = inject(UsuariosService);

  ngOnInit(){
    this.usuarioService.getUsuarios().subscribe({
      next: (data: any) => {
        this.listadoUsuarios.set(data.data);
        console.log(data.data);
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

}
