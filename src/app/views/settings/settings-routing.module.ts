import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { PermisosComponent } from './permisos/permisos.component';
import { SettingsComponent } from './settings.component';
import { SucursalComponent } from './sucursales/sucursal.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    data: {
      title: 'Settings'
    },
    children: [
      {
        path: 'permisos',
        component: PermisosComponent,
        data: {
          title: 'Permisos'
        }
      },
      {
        path: 'usuarios',
        component: UserComponent,
        data: {
          title: 'Users'
        }
      },
      {
        path:'perfiles',
        component: PerfilComponent,
        data: {
          title: 'Perfil'
        }
      },
      {
        path:'sucursales',
        component: SucursalComponent,
        data: {
          title: 'Sucursal'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
