import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent { 
   email: string;
   password: string;
   cargando: boolean = false;

   constructor(private router: Router){

   }

   login(){
     this.cargando = true;
     setTimeout(() => {
      this.router.navigate(['/dashboard']);
     }, 2000);
   }
}
