import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from './settings.service';

@Component({
  templateUrl: 'settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {


   constructor(private settingsService:SettingsService,
    private modalService: BsModalService,){

   }



  ngOnInit(): void {
  }


  
}
