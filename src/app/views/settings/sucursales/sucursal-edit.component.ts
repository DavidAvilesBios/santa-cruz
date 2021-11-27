import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal-edit.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalEditComponent implements OnInit {
  @Input() id?: any;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  public sucursalForm: FormGroup;
  public permisos = [];
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit() {
    this.sucursalForm = this.fb.group({
      Nombre: new FormControl({ value: '', disabled: false }, Validators.required),
      Domicilio: new FormControl({ value: '', disabled: false }, Validators.required),
      CuentaBancaria: new FormControl({ value: '', disabled: false }),
      Serie:  new FormControl({ value: '', disabled: false }),

    });

    this.settingsService.getPermisos().subscribe((resp)=>{
        this.permisos = resp.permisos;
    })

     if(this.id){
         this.settingsService.getSucursal(this.id).subscribe((resp:any)=>{
            this.initializeForm(resp.sucursal)
         },(error)=>{
            console.log(error);
         });
     }
  }

  initializeForm(sucursal){

    this.sucursalForm.setValue({
        Nombre: sucursal.nombre,
        Domicilio: sucursal.domicilio,
        CuentaBancaria: 'NO EXISTE TODAVÍA',
        Serie: sucursal.series['factura']
      });

  }


  public saveSucursal() {
    let sucursal = {};
    
    sucursal['nombre'] = this.sucursalForm.get('Nombre').value;
    sucursal['domicilio'] = this.sucursalForm.get('Domicilio').value;
    //sucursal['cuenta_bancaria'] = this.sucursalForm.get('CuentaBancaria').value;
    sucursal['series'] = {factura: this.sucursalForm.get('Serie').value};
    sucursal['active'] = true;

    
    if(!this.id){
    this.settingsService.addNewSucursal(sucursal).subscribe(
      (resp) => {
        console.log(resp);
        this.onClose.emit('cerrar');
      },
      (error) => {
        console.log(error);
      }
    );
    } else {
     sucursal['id'] = this.id;
     this.settingsService.editSucursal(sucursal).subscribe(
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
