import { Component, inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { UserRegistroI } from '../../interfaces/UserRegistroI';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  appComponente = inject(AppComponent);
  Usuario!:UserRegistroI;

  ngOnInit(){
    this.Usuario = this.appComponente.usuarioGlobal;
  }

}
