import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cadastro de disciplinas'
    },
    children: [
      {
        path: '',
        redirectTo: 'addsubject',
        pathMatch: 'full'
      },
      {
        path: 'addsubject',
        loadComponent: () => import('./addsubject.component').then(m => m.AddSubjectComponent),
        data: {
          title: 'Cadastro de disciplinas'
        }
      },
    ]
  }
];

