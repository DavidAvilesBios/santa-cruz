import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { TableModule } from 'primeng/table';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserComponent } from './user/user.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    TableModule,
    ButtonsModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [ SettingsComponent, UserComponent],
  providers: [SettingsService]
})
export class SettingsModule { }
