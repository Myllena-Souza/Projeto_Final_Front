import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Disciplina, DisciplinaService } from 'src/app/disciplina.service';

@Component({
  selector: 'app-edit-disciplina',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-disciplina.component.html',
  styleUrl: './edit-disciplina.component.scss'
})
export class EditDisciplinaComponent implements OnInit {
  @Input() disciplina!: Disciplina;

  editDisciplinaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private disciplinaService: DisciplinaService,
    public activeModal: NgbActiveModal
  ) {
    this.editDisciplinaForm = this.fb.group({
      nome: ['', Validators.required],
      professor: ['', Validators.required],
      vagas: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    if (this.disciplina) {
      this.editDisciplinaForm.patchValue(this.disciplina);
    }
  }

  onSubmit() {
    if (this.editDisciplinaForm.valid) {
      const updatedDisciplina = {
        ...this.disciplina,
        ...this.editDisciplinaForm.value
      };

      this.disciplinaService.updateDisciplina(updatedDisciplina.id!, updatedDisciplina).then(() => {
        this.activeModal.close();
      }).catch(error => {
        console.error('Error updating disciplina:', error);
      });
    }
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}

