import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent { 
   email: string;
   password: string;
   cargando: boolean = false;

   constructor(private router: Router,
               private loginService: LoginService){

   }

   login(){
     this.cargando = true;
     this.loginService.postLogin({email:this.email, password: this.password}).subscribe((resp) =>{
      this.router.navigate(['/dashboard']);
     },(error)=>{
             

      this.cargando = false;


     })

   }
}
