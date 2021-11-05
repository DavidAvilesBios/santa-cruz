import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SettingsService } from '../settings.service';


@Component({
  selector: 'app-user',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit {
  @Input() id?: any;
  @Output() onClose: EventEmitter<any> = new EventEmitter();


  public userForm: FormGroup;
  public perfiles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit() {

    this.settingsService.getPermissions().subscribe((resp)=>{
        this.perfiles = resp.perfiles;
    })
    this.userForm = this.fb.group({
      Nombre: new FormControl({ value: '', disabled: false }, Validators.required),
      Email: new FormControl({ value: '', disabled: false }, Validators.required),
      Password: new FormControl({ value: '', disabled: false }, Validators.required),
      Perfil: new FormControl({ value: '', disabled: false }, Validators.required),
    });

     if(this.id){
         this.settingsService.getUser(this.id).subscribe((resp:any)=>{
            this.initializeForm(resp.usuario)
         },(error)=>{
            console.log(error);
         });
     }
  }

  initializeForm(user){

    this.userForm.setValue({
        Nombre: user.nombre,
        Email: user.email,
        Password: '123',
        Perfil: user.perfil,
      });

  }


  public saveUser() {
    let user = {};

    user['nombre'] = this.userForm.get('Nombre').value;
    user['email'] = this.userForm.get('Email').value;
    user['perfil'] =  this.userForm.get('Perfil').value;
    user['permisos'] ={ a:  1};
    
    if(!this.id){
        user['password'] = this.userForm.get('Password').value;
    this.settingsService.addNewUsuario(user).subscribe(
      (resp) => {
        console.log(resp);
        this.onClose.emit('cerrar');
      },
      (error) => {
        console.log(error);
      }
    );
    } else {
     user['id'] = this.id;
     this.settingsService.editUser(user).subscribe(
        (resp) => {
          console.log(resp);
          this.onClose.emit('cerrar');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
