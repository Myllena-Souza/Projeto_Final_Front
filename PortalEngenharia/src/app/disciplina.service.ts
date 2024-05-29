import { Injectable } from '@angular/core';
import { getDatabase, ref, push, onValue, remove, DatabaseReference } from 'firebase/database';
import { Observable } from 'rxjs';

export interface Disciplina {
  id?: string;
  nome: string;
  professor: string;
  vagas: number;
}

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private databaseRef = getDatabase();
  private disciplinasRef = ref(this.databaseRef, 'disciplinas');

  constructor() {}

  addDisciplina(disciplina: Disciplina): Promise<void> {
    return push(this.disciplinasRef, disciplina)
      .then(() => {
        console.log('Document successfully added');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  getDisciplinas(): Observable<Disciplina[]> {
    return new Observable<Disciplina[]>((observer) => {
      onValue(this.disciplinasRef, (snapshot) => {
        const disciplinas: Disciplina[] = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          disciplinas.push({ id: childSnapshot.key, ...childData });
        });
        observer.next(disciplinas);
      });
    });
  }

  excluirDisciplina(id: string): Promise<void> {
    const disciplinaRef: DatabaseReference = ref(this.databaseRef, `disciplinas/${id}`);
    return remove(disciplinaRef)
      .then(() => {
        console.log('Document successfully removed');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }
}
