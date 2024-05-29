import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Lista de disciplinas',
    url: '/dashboard',
    iconComponent: { name: 'cil-notes' },
  },
  {
    name: 'Cadastro de disciplinas',
    url: '/addsubject',
    iconComponent: { name: 'cil-notes' },
  },
];
