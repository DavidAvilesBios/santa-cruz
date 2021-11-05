import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso-edit.component.html',
})
export class PermisoEditComponent implements OnInit {
  @Input() id?: any;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  public permisoForm: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit() {
    this.permisoForm = this.fb.group({
      Nombre: new FormControl({ value: '', disabled: false }, Validators.required),
      Descripcion: new FormControl({ value: '', disabled: false }, Validators.required),
      Modulo: new FormControl({ value: 'Estadistica', disabled: true }, Validators.required),
    });

     if(this.id){
         this.settingsService.getPermiso(this.id).subscribe((resp:any)=>{
            this.initializeForm(resp.perfil)
         },(error)=>{
            console.log(error);
         });
     }
  }

  initializeForm(permiso){

    this.permisoForm.setValue({
        Nombre: permiso.nombre,
        Descripcion: permiso.descripcion ,
        Modulo: 'Estadistica'
      });

  }


  public savePermiso() {
    let permiso = {};

    permiso['nombre'] = this.permisoForm.get('Nombre').value;
    permiso['descripcion'] = this.permisoForm.get('Descripcion').value;
    permiso['modulo'] =  '6184b3af239a43a2383f5201';
    permiso['valor'] = true;
    
    if(!this.id){
    this.settingsService.addNewPermiso(permiso).subscribe(
      (resp) => {
        console.log(resp);
        this.onClose.emit('cerrar');
      },
      (error) => {
        console.log(error);
      }
    );
    } else {
     permiso['id'] = this.id;
     this.settingsService.editPermiso(permiso).subscribe(
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
