import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilEditComponent implements OnInit {
  @Input() id?: any;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  public perfilForm: FormGroup;
  public permisos = [];
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit() {
    this.perfilForm = this.fb.group({
      Nombre: new FormControl({ value: '', disabled: false }, Validators.required),
    });

    this.settingsService.getPermisos().subscribe((resp)=>{
        this.permisos = resp.permisos;
    })

     if(this.id){
         this.settingsService.getPerfil(this.id).subscribe((resp:any)=>{
            this.initializeForm(resp.perfil)
         },(error)=>{
            console.log(error);
         });
     }
  }

  initializeForm(perfil){

    this.perfilForm.setValue({
        Nombre: perfil.descripcion,
      });

     for(let key of Object.keys(perfil.permisos)){
        let index = this.permisos.findIndex((permiso)=> permiso._id === key);
        this.permisos[index].valor = perfil.permisos[key];
     }

  }


  public savePerfil() {
    let perfil = {};
    let permisos = {};
    
    for(let permiso of this.permisos){
        permisos[permiso._id] = permiso.valor;
    }

    perfil['descripcion'] = this.perfilForm.get('Nombre').value;
    perfil['permisos'] = permisos;

    
    if(!this.id){
    this.settingsService.addNewPerfil(perfil).subscribe(
      (resp) => {
        console.log(resp);
        this.onClose.emit('cerrar');
      },
      (error) => {
        console.log(error);
      }
    );
    } else {
     perfil['id'] = this.id;
     this.settingsService.editPerfil(perfil).subscribe(
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
