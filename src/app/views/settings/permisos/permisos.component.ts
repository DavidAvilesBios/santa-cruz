import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from '../settings.service';

@Component({
  templateUrl: 'permisos.component.html'
})
export class PermisosComponent implements OnInit {

    @ViewChild('PermisoTemplate', { static: false }) public PermisoTemplate: TemplateRef<any>;

    public permisos: any[] = null;
    public permiso: any;
    public title: string;
    bsModalRef: BsModalRef;
    modalRef: BsModalRef;

  constructor(private settingsService:SettingsService,
    private modalService: BsModalService) { }

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngOnInit(): void {
     this.getPermisos();
  }

  openModal(template: TemplateRef<any>, title?: string) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', backdrop: 'static', keyboard: true });
    this.modalService.onHide.subscribe((reason: string) => {});
  }

  newPermiso(){
    this.permiso = null;
    this.title = 'Nuevo Permiso';
    this.openModal(this.PermisoTemplate);
      
  }

  getPermisos(){
    this.settingsService.getPermisos().subscribe((resp)=>{
        console.log(resp.permisos)
        this.permisos = resp.permisos;
    })
  }

  editPermiso(permiso){
     console.log(permiso);
      this.title = 'Editar Permiso ' + permiso.nombre;
      this.permiso = permiso;
      this.openModal(this.PermisoTemplate);
  }

  deleteUser(usuario){
    if (confirm('¿Desea eliminar al usuario?')) {
        this.settingsService.deleteUser(usuario._id).subscribe((resp)=>{
            this.getPermisos();
        })
      } else {
        // Do nothing!
        console.log('No borro nada');
      }

  }

}
