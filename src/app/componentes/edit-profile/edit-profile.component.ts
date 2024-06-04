import { Component, inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { UserRegistroI } from '../../interfaces/UserRegistroI';
import { AuthService } from '../../services/authService.service';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  appComponente = inject(AppComponent);
  authService = inject(AuthService)
  Usuario!:UserRegistroI;
  nuevoUsuario!:UserRegistroI;
  editPerfil = this.formBuilder.group({
    nombre : [''],
    apellidos : [''],
    email: [''],
    password : ['',
      Validators.pattern("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"),
    ] ,
    passwordconfirm: [''],
    telefono: ['', 
      [Validators.pattern("^[67][0-9]{8}$"),
      Validators.required]
  ],
  });
  
  constructor(private formBuilder: FormBuilder) {}



  ngOnInit(){
    this.Usuario = this.appComponente.usuarioGlobal;
    console.log(this.Usuario)
    if(this.authService.getToken()){
      let token = this.authService.getToken(); 
      this.Usuario.dataUser.accessToken = token!;
      this.getToken(this.Usuario);
      this.editPerfil = this.formBuilder.group({
        nombre : [this.Usuario.dataUser.nombre],
        apellidos : [this.Usuario.dataUser.apellidos],
        email: [this.Usuario.dataUser.email],
        password : ['',
          Validators.pattern("^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$"),
        ] ,
        passwordconfirm: [''],
        telefono: ['', 
          [Validators.pattern("^[67][0-9]{8}$"),
          Validators.required]
      ],
      });
    }
  }

  actualizarUsuario(){
    //validamos los datos, como por ejemplo las contraseñas y el numero de telefono, el email no, ya que 
    //el email lo tenemos bloqueado

    //en la respuesta del metodo debemos de actualizar el usuario en sesion por el nuevoUser, ya que hjasta que no nos devuelve el user
    //no sabemos si todo ha ido bien



  }

  onSubmit(){

    if(this.editPerfil.get('password')?.value === ""){
      console.log("vacio")
      //en caso de que NO se modifique la contraseña pasa por aqui.
      this.nuevoUsuario = this.Usuario;
      this.actualizarNuevosDatosSinContrasena(this.nuevoUsuario);
      //validar que si no es null, se ha actualizado correctamente, si no,
      //no ha sufrido ningun cambio.
      console.log(this.nuevoUsuario)
      this.authService.editarUserSinContrasena(this.nuevoUsuario).subscribe(res => {
        this.Usuario = res;
      });

    }else{
      //en caso de que SI se modifique la contraseña pasa por aqui.
      console.log("lleno")

    }



  }


  getToken(usuario:UserRegistroI):void{
    this.authService.getUsuarioToken(usuario).subscribe(res => {
      this.Usuario = res;
    });
  }

  actualizarNuevosDatosSinContrasena(usuarioRespuesta:UserRegistroI){
    usuarioRespuesta.dataUser.nombre = this.editPerfil.get("nombre")!.value!.toString();
    usuarioRespuesta.dataUser.apellidos = this.editPerfil.get("apellidos")!.value!.toString();
    usuarioRespuesta.dataUser.telefono = this.editPerfil.get("telefono")!.value!.toString();
    console.log(this.editPerfil.get("telefono")!.value!.toString())
  }

}
