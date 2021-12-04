import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { SettingsService } from '../../settings/settings.service';


@Component({
  selector: 'app-facturas-anteriores',
  templateUrl: './facturas-anteriores-edit.html',
  styleUrls: ['./facturas-anteriores.edit.css'],
})
export class FacturasAnterioresComponent implements OnInit {
  @Input() serie?: any;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() Factura: EventEmitter<any> = new EventEmitter(); 

  public facturas = [];
  public folio: any;
  public cols = [
    { field: 'CFOLIO', header: 'Folio' },
    { field: 'CIDCLIENTEPROVEEDOR', header: 'Codigo' },
    { field: 'CRFC', header: 'RFC' },
    { field: 'CRAZONSOCIAL', header: 'Cliente' },
    { field: 'CNETO', header: 'Importe' },
    { field: 'CIMPUESTO1', header: 'IEPS' },
    { field: 'CIMPUESTO2', header: 'IVA' },
    { field: 'CTOTAL', header: 'Total' },
    { field: 'CFECHA', header: 'Fecha' },

  ];

    // Datepicker
    bsValue = new Date();
    bsRangeValue: Date[];
    minDate = new Date();



  public data: any;
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService
  ) {
    this.minDate.setDate(this.minDate.getDate() - 7);
    this.bsRangeValue = [this.minDate, this.bsValue];
  }

  ngOnInit() {
   
  }

  public generarFactura() {
    this.Factura.emit(this.facturas);
  }

  public getFactura(){
    this.settingsService.getFacturasSucursal({serie: this.serie,fechaInicio:  moment(this.bsRangeValue[0]).format('DD/MM/YYYY')  ,fechaFinal: moment(this.bsRangeValue[1]).format('DD/MM/YYYY')}).subscribe((resp)=>{
        console.log(resp);   
        this.data = resp.facturas;

    });
  }

  public emitRow(event) {
    console.log(this.facturas);
  }
}
