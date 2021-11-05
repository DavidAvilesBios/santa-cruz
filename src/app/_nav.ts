import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Configuración',
    url: '/settings',
    icon: 'fa fa-cog',
    children: [
      {
        name: 'permisos',
        url: '/settings/permisos',
        icon: 'icon-puzzle'
      },
      {
        name: 'usuarios',
        url: '/settings/usuarios',
        icon: 'icon-puzzle'
      },
      {
        name: 'perfiles',
        url: '/settings/perfiles',
        icon: 'icon-puzzle'
      },
    ]
  },
 
];
