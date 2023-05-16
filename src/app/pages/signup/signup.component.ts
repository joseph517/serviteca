import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule
    // Otros módulos importados aquí
  ],
  declarations: [
    // Componentes declarados aquí
  ]
})
export class SignupModule { }
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Aquí puedes agregar la lógica que deseas ejecutar cuando el componente se inicia
  }

  public user = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    placa:  '',
    marca:  '',
    color:  '',
    modelo:  '',
    enabled: ''
  };

  formSubmit(): void {
    console.log(this.user);
    if (this.user.username === '' || this.user.username === null) {
      alert('El nombre de usuario es requerido');
      return;
    }
    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        alert('Usuario guardado con éxito');
      },
      (error) => {
        console.log(error);
        alert('Ha ocurrido un error en el sistema');
      }
    );
  }
}
