import {EditDisciplinaComponent} from 'src/app/views/edit-disciplina/edit-disciplina.component'
import { DOCUMENT, NgStyle, CommonModule, NgFor  } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { Observable, of } from 'rxjs';
import { Disciplina, DisciplinaService } from 'src/app/disciplina.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, NgFor, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective, AvatarComponent]
})
export class DashboardComponent implements OnInit {
  disciplinas$: Observable<Disciplina[]> | undefined;

  constructor(private disciplinaService: DisciplinaService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.disciplinaService.getDisciplinas().subscribe(disciplinas => {
      this.disciplinas$ = of(disciplinas);
      console.log('Disciplinas:', disciplinas);
    });
  }

  async excluirDisciplina(id: string): Promise<void> {
    try {
      await this.disciplinaService.excluirDisciplina(id);
    } catch (error) {
      console.error('Erro ao excluir disciplina:', error);
    }
  }

  openEditModal(disciplina: Disciplina) {
    const modalRef = this.modalService.open(EditDisciplinaComponent);
    modalRef.componentInstance.disciplina = disciplina;

    modalRef.result.then(() => {
      // Reload the list of disciplinas if needed
      this.disciplinaService.getDisciplinas().subscribe(disciplinas => {
        this.disciplinas$ = of(disciplinas);
      });
    }, (reason) => {
      console.log('Modal dismissed:', reason);
    });
  }

}
