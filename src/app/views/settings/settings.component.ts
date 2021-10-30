import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from './settings.service';

@Component({
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit {

    @ViewChild('UserTemplate', { static: false }) public UserTemplate: TemplateRef<any>;

    public usuarios: any[] = null;
    public usuario: any;
    public title: string;
    bsModalRef: BsModalRef;
    modalRef: BsModalRef;

   constructor(private settingsService:SettingsService,
    private modalService: BsModalService,){

   }

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngOnInit(): void {
     this.getUsers();
  }

  openModal(template: TemplateRef<any>, title?: string) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', backdrop: 'static', keyboard: true });
    this.modalService.onHide.subscribe((reason: string) => {});
  }

  newUser(){
    this.usuario = null;
    this.title = 'Nuevo Usuario';
    this.openModal(this.UserTemplate);
      
  }

  getUsers(){
    this.settingsService.getUsers().subscribe((resp)=>{
        console.log(resp.usuarios)
        this.usuarios = resp.usuarios;
    })
  }

  editUser(usuario){
     console.log(usuario);
      this.title = 'Editar Usuario ' + usuario.nombre;
      this.usuario = usuario;
      this.openModal(this.UserTemplate);
  }

  deleteUser(usuario){
    if (confirm('¿Desea eliminar al usuario?')) {
        this.settingsService.deleteUser(usuario._id).subscribe((resp)=>{
            this.getUsers();
        })
      } else {
        // Do nothing!
        console.log('No borro nada');
      }

  }


  
}
