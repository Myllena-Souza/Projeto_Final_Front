import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT, NgClass, NgStyle, NgIf } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/utils';
import { TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DisciplinaService, Disciplina } from '../../disciplina.service'; // Import the service

@Component({
  templateUrl: 'addsubject.component.html',
  standalone: true,
  imports: [
    ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, RowComponent, 
    NgStyle, TextColorDirective, CardComponent, 
    CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, NgIf
  ]
})
export class AddSubjectComponent implements OnInit {
  disciplinaForm!: FormGroup;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private disciplinaService: DisciplinaService // Inject the service
  ) {}

  ngOnInit(): void {
    this.disciplinaForm = this.fb.group({
      nome: ['', Validators.required],
      professor: ['', Validators.required],
      vagas: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.disciplinaForm.valid) {
      const novaDisciplina: Disciplina = this.disciplinaForm.value;
      this.disciplinaService.addDisciplina(novaDisciplina)
      .then(() => {
          console.log('Disciplina adicionada com sucesso');
        })
        .catch(error => {
          console.error('Erro ao adicionar disciplina:', error);
        });
    } else {
      console.log('Formulário inválido');
    }
  }
}
