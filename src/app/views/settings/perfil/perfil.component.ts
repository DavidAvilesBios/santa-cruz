import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from '../settings.service';

@Component({
  templateUrl: 'perfil.component.html'
})
export class PerfilComponent implements OnInit {

    @ViewChild('PerfilTemplate', { static: false }) public PerfilTemplate: TemplateRef<any>;

    public perfiles: any[] = null;
    public perfil: any;
    public title: string;
    bsModalRef: BsModalRef;
    modalRef: BsModalRef;

  constructor(private settingsService:SettingsService,
    private modalService: BsModalService) { }

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngOnInit(): void {
     this.getPerfiles();
  }

  openModal(template: TemplateRef<any>, title?: string) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', backdrop: 'static', keyboard: true });
    this.modalService.onHide.subscribe((reason: string) => {});
  }

  newPerfil(){
    this.perfil = null;
    this.title = 'Nuevo Perfil';
    this.openModal(this.PerfilTemplate);
      
  }

  getPerfiles(){
    this.settingsService.getPermissions().subscribe((resp)=>{
        console.log(resp.perfiles)
        this.perfiles = resp.perfiles;
    })
  }

  editPerfil(perfil){
     console.log(perfil);
      this.title = 'Editar Perfil ' + perfil.descripcion;
      this.perfil = perfil;
      this.openModal(this.PerfilTemplate);
  }

  deleteUser(usuario){
    if (confirm('¿Desea eliminar al usuario?')) {
        this.settingsService.deleteUser(usuario._id).subscribe((resp)=>{
            this.getPerfiles();
        })
      } else {
        // Do nothing!
        console.log('No borro nada');
      }

  }

}
