import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { registroEmpleadoI } from '../../interfaces/RegistroEmpleadoI';
import { AuthService } from '../../services/authService.service';

@Component({
  selector: 'app-registro-empleado',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLinkWithHref],
  templateUrl: './registro-empleado.component.html',
  styleUrl: './registro-empleado.component.css'
})
export class RegistroEmpleadoComponent {

mostrarNotificacion:boolean = false;

registro = this.formBuilder.group({
  nombre: ["", Validators.required],
  apellidos: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ['', Validators.required],
    ciudad: ['', Validators.required],
    cp: ['', Validators.required],
    telefono: ["", [Validators.pattern("^[67][0-9]{8}$"), Validators.required]]
    });
  
  constructor(private formBuilder:FormBuilder, private authservice:AuthService){}

    
    
onSubmit(){
  console.log("hola")
  let empleado:registroEmpleadoI = {
    nombre: this.registro.get("nombre")!.value!,
    apellidos: this.registro.get("apellidos")!.value!,
    email: this.registro.get("email")!.value!,
    password: this.registro.get("password")!.value!,
    ciudad: this.registro.get("ciudad")!.value!,
    cp: this.registro.get("cp")!.value!,
    telefono: this.registro.get("telefono")!.value!,
    rol: "EMPLEADO"
  }

  //la respuesta del back si es correcta nos da un mensaje: "true"
  this.authservice.registroEmpleado(empleado).subscribe( res => {
    console.log(res)
    console.log(res.mensaje)
    if (res.mensaje === "true") { 
      this.mostrarNotificacion = true; 
      setTimeout(() => {
        window.location.href = ""; 
        this.mostrarNotificacion = false;
      }, 3000);
    } else {
      
    }

  });


}

  getControl(controlName: string) {
    return this.registro.get(controlName);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.getControl(controlName);
    return control!.invalid && (control!.dirty || control!.touched);
  }

  getControlErrors(controlName: string): string[] {
    const control = this.getControl(controlName);
    if (control?.errors) {
      return Object.keys(control.errors);
    }
    return [];
  }

}
