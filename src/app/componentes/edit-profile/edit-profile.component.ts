import { Component, inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { UserRegistroI } from '../../interfaces/UserRegistroI';
import { AuthService } from '../../services/authService.service';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserI } from '../../interfaces/userI';

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
  nuevoUserConContrasena:UserI = this.getDefaultUserConContrasena();
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
    console.log("app "+this.appComponente.usuarioGlobal.dataUser.nombre)
    console.log("auth "+this.authService.getusuarrioSesion().dataUser.nombre)
    console.log("local "+this.Usuario.dataUser.nombre)

    if(this.authService.getToken()){
      console.log("2")

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
        telefono: [this.Usuario.dataUser.telefono, [Validators.pattern("^[67][0-9]{8}$")]],
    });
    console.log(this.editPerfil.status)
  }
  console.log(this.authService.getusuarrioSesion())

    

  }

  actualizarUsuario(){
    //validamos los datos, como por ejemplo las contraseñas y el numero de telefono, el email no, ya que 
    //el email lo tenemos bloqueado

    //en la respuesta del metodo debemos de actualizar el usuario en sesion por el nuevoUser, ya que hjasta que no nos devuelve el user
    //no sabemos si todo ha ido bien



  }

  onSubmit(){

    if(this.editPerfil.get('password')?.value === ""){
      console.log("valiiiiiiiiiiii")
      //en caso de que NO se modifique la contraseña pasa por aqui.
      this.nuevoUsuario = this.Usuario;
      console.log(this.nuevoUsuario)
      this.actualizarNuevosDatosSinContrasena(this.nuevoUsuario);
      //validar que si no es null, se ha actualizado correctamente, si no,
      //no ha sufrido ningun cambio.
      console.log(this.nuevoUsuario)
      this.authService.editarUserSinContrasena(this.nuevoUsuario).subscribe(res => {
        this.Usuario = res;
      });

    }else{
      //en caso de que SI se modifique la contraseña pasa por aqui.
      // this.nuevoUserConContrasena = this.getRellenarUserConPassword(this.nuevoUserConContrasena);
      this.getRellenarUserConPassword(this.nuevoUserConContrasena);
      console.log(this.nuevoUserConContrasena)
      this.actualizarNuevosDatosConContrasena(this.nuevoUserConContrasena);
      //validar que si no es null, se ha actualizado correctamente, si no,
      //no ha sufrido ningun cambio.
      console.log(this.nuevoUserConContrasena)
      this.authService.editarUserConContrasena(this.nuevoUserConContrasena).subscribe(res => {
        this.Usuario = res;
      });



    }



  }
  getRellenarUserConPassword(usuario:UserI){
    //necesario ya que son dos interfaces distintas.
    console.log("rellena")
    console.log("service "+ this.authService.getusuarrioSesion().dataUser.accessToken)
    
    usuario.accessToken = this.Usuario.dataUser.accessToken;
    usuario.email = this.Usuario.dataUser.email;
    usuario.nombre = this.Usuario.dataUser.nombre;
    usuario.apellidos = this.Usuario.dataUser.apellidos;
    usuario.telefono = this.Usuario.dataUser.telefono;

  }


  getToken(usuario:UserRegistroI):void{
    this.authService.getUsuarioToken(usuario).subscribe(res => {
      this.Usuario = res;
      this.Usuario.dataUser.telefono = res.dataUser.telefono;
      console.log("tel "+this.Usuario.dataUser.telefono)
    });
  }

  actualizarNuevosDatosSinContrasena(usuarioRespuesta:UserRegistroI){
    usuarioRespuesta.dataUser.nombre = this.editPerfil.get("nombre")!.value!.toString();
    usuarioRespuesta.dataUser.apellidos = this.editPerfil.get("apellidos")!.value!.toString();
    usuarioRespuesta.dataUser.telefono = this.editPerfil.get("telefono")!.value!.toString();
    console.log(this.editPerfil.get("telefono")!.value!.toString())
  }

  actualizarNuevosDatosConContrasena(usuarioRespuesta:UserI){
    usuarioRespuesta.nombre = this.editPerfil.get("nombre")!.value!.toString();
    usuarioRespuesta.apellidos = this.editPerfil.get("apellidos")!.value!.toString();
    usuarioRespuesta.telefono = this.editPerfil.get("telefono")!.value!.toString();
    usuarioRespuesta.password = this.editPerfil.get("password")!.value!.toString();

  }

  private getDefaultUserConContrasena(){
    
    let user = {
          nombre: 'Log In',
          email:"",
          password:"",
          apellidos:"",
          ciudad:"",
          cp:"",
          rol:"",
          telefono:"",
          accessToken:"",
          expiresIn:""
    };
    return user;
  }

}
