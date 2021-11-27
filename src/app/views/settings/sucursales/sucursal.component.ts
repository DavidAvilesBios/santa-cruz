import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from '../settings.service';

@Component({
  templateUrl: 'sucursal.component.html'
})
export class SucursalComponent implements OnInit {

    @ViewChild('SucursalTemplate', { static: false }) public SucursalTemplate: TemplateRef<any>;

    public sucursales: any[] = null;
    public sucursal: any;
    public title: string;
    bsModalRef: BsModalRef;
    modalRef: BsModalRef;

  constructor(private settingsService:SettingsService,
    private modalService: BsModalService) { }

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngOnInit(): void {
     this.getSucursales();
  }

  openModal(template: TemplateRef<any>, title?: string) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', backdrop: 'static', keyboard: true });
    this.modalService.onHide.subscribe((reason: string) => {});
  }

  newSucursal(){
    this.sucursal = null;
    this.title = 'Nuevo Sucursal';
    this.openModal(this.SucursalTemplate);
      
  }

  getSucursales(){
    this.settingsService.getSucursales().subscribe((resp)=>{
        console.log(resp.sucursales)
        this.sucursales = resp.sucursales;
    })
  }

  editSucursal(sucursal){
     console.log(sucursal);
      this.title = 'Editar sucursal ' + sucursal.descripcion;
      this.sucursal = sucursal;
      this.openModal(this.SucursalTemplate);
  }

  deleteSucursal(sucursal){
    if (confirm('¿Desea eliminar la sucursal?')) {
        this.settingsService.deleteSucursal(sucursal._id).subscribe((resp)=>{
            this.getSucursales();
        })
      } else {
        // Do nothing!
        console.log('No borro nada');
      }

  }

}
