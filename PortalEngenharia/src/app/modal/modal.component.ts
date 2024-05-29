// modal.component.ts

import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Disciplina } from 'src/app/disciplina.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  disciplina: Disciplina | undefined;

  constructor(public bsModalRef: BsModalRef) {} // Injete o BsModalRef para fechar o modal

  ngOnInit(): void {
  }

  fecharModal(): void {
    this.bsModalRef.hide(); // Método para fechar o modal
  }
}
