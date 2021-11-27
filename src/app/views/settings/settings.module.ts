import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { UserEditComponent } from './user/user-edit.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PermisosComponent } from './permisos/permisos.component';
import { UserComponent } from './user/user.component';
import { PermisoEditComponent } from './permisos/permiso-edit.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PerfilEditComponent } from './perfil/perfil-edit.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SucursalComponent } from './sucursales/sucursal.component';
import { SucursalEditComponent } from './sucursales/sucursal-edit.component';



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
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
  ],
  declarations: [ SettingsComponent, UserEditComponent,PermisosComponent,UserComponent,PermisoEditComponent,PerfilComponent,PerfilEditComponent,SucursalEditComponent,SucursalComponent],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SettingsModule { }
