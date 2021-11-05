import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Cortes',
    url: '/dashboard',
    icon: 'file-invoice-dollar',
  },
  {
    name: 'Configuración',
    url: '/settings',
    icon: 'fa fa-cog',
    children: [
      {
        name: 'Permisos',
        url: '/settings/permisos',
        icon: 'fa fa-lock'
      },
      {
        name: 'Usuarios',
        url: '/settings/usuarios',
        icon: 'fa fa-user'
      },
      {
        name: 'Perfiles',
        url: '/settings/perfiles',
        icon: 'fa fa-users'
      },
    ]
  },
 
];
