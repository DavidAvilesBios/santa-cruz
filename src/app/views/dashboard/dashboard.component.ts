import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { SettingsService } from '../settings/settings.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  @ViewChild('SucursalTemplate', { static: false }) public SucursalTemplate: TemplateRef<any>;
  @ViewChild('FacturasTemplate', { static: false }) public FacturasTemplate: TemplateRef<any>;

  radioModel: string = 'Month';
  loading = false;
  moneda050: number = 0;
  moneda1: number = 0;
  moneda2: number = 0;
  moneda5: number = 0;
  moneda10: number = 0;
  billete20: number = 0;
  billete50: number = 0;
  billete100: number = 0;
  billete200: number = 0;
  billete500: number = 0;
  billete1000: number = 0;
  totalEfectivo: number = 0;
  totales: any;
  serie: any;

  modalRef: BsModalRef;

  bsValue = new Date();
  bsRangeValue: Date[];
  minDate = new Date();
  sucursales = [];
  sucursal:any;
  dataFacturas = []
  fechaFormatted1: any;
  fechaFormatted2:  any;
  sucursalNombre:any;

  public cols = [
    { field: 'CFOLIO', header: 'Folio' },
    { field: 'CIDCLIENTEPROVEEDOR', header: 'Codigo' },
    { field: 'CRFC', header: 'RFC' },
    { field: 'CRAZONSOCIAL', header: 'Cliente' },
    { field: 'CNETO', header: 'Importe' },
    { field: 'CIMPUESTO1', header: 'IEPS' },
    { field: 'CIMPUESTO2', header: 'IVA' },
    { field: 'CTOTAL', header: 'Total' },
  ];

  public cols2 = [
    { field: 'CFOLIO', header: 'Folio' },
    { field: 'CIDCLIENTEPROVEEDOR', header: 'Codigo' },
    { field: 'CRFC', header: 'RFC' },
    { field: 'CRAZONSOCIAL', header: 'Cliente' },
    { field: 'CNETO', header: 'Importe' },
    { field: 'CIMPUESTO1', header: 'IEPS' },
    { field: 'CIMPUESTO2', header: 'IVA' },
    { field: 'CTOTAL', header: 'Total' },
  ];

  public data = []

  public cargo = false;

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
   constructor(private settingsService: SettingsService,
    private modalService: BsModalService){
      this.minDate.setDate(this.minDate.getDate() - 7);
      this.bsRangeValue = [this.minDate, this.bsValue];

   }
  ngOnInit(): void {
     this.getSucursales();
  }

  public sumarEfectivo(){
    this.totalEfectivo =   (this.moneda050 * .50) +  (this.moneda1 * 1) + (this.moneda2 * 2) + (this.moneda5 * 5) + (this.moneda10 * 10) + (this.billete20 * 20) + (this.billete50 * 50) + (this.billete100 * 100) + (this.billete200 * 200) + (this.billete500 * 500) + (this.billete1000 * 1000);
  }


  openModal(template: TemplateRef<any>, grande?) {
    this.modalRef = this.modalService.show(template, { class: !grande ? 'modal-md' : 'modal-xl', backdrop: 'static', keyboard: true });
    this.modalService.onHide.subscribe((reason: string) => {});
  }


  public getSucursales(){
    this.settingsService.getSucursales().subscribe((resp)=>{
        this.sucursales = resp.sucursales;
        this.openDatosGenerar();
    })
  }

  public cargarDatos(){
    this.fechaFormatted1 =  moment(this.bsRangeValue[0]).format('DD/MM/YYYY');
    this.fechaFormatted2 =  moment(this.bsRangeValue[1]).format('DD/MM/YYYY');
    this.sucursalNombre = this.sucursales.find((sucursal)=> sucursal._id == this.sucursal).nombre;
    this.settingsService.getData({sucursal: this.sucursal,fechaInicio:  moment(this.bsRangeValue[0]).format('DD/MM/YYYY')  ,fechaFinal: moment(this.bsRangeValue[1]).format('DD/MM/YYYY'),tipoDocumento:'factura'}).subscribe((resp)=>{
      this.data = resp.facturas;
      this.totales = resp.totales;
      this.cargo = true;
      this.modalRef.hide();
      this.serie = this.sucursales.find((sucursal)=> sucursal._id == this.sucursal).series['factura'];
      console.log(this.serie);
  });
  this.settingsService.getFacturasSucursal({sucursal_id: this.sucursal}).subscribe((resp)=>{
       
  });
  }

  openDatosGenerar(){
    this.openModal(this.SucursalTemplate);
  }

  openFactura(){
    this.openModal(this.FacturasTemplate,true);
  }

  addFacturas(facturas){
     for(let factura of facturas){
     this.dataFacturas.push(factura);
     }
     this.modalRef.hide();
  }

  
}
