import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService, List } from '../../../services/list.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  standalone: true,
  imports: [
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
  ],
})
export class ListsComponent implements OnInit {
  lists: List[] = [];
  userId: number = Number(localStorage.getItem('userId'));
  newListForm: FormGroup;
  isEditing: boolean = false;
  editingListId: number | null = null;

  constructor(private listService: ListService, private router: Router) {
    this.newListForm = new FormGroup({
      nazwaListy: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit(): void {
    this.loadUserLists();
  }

  loadUserLists(): void {
    this.listService.getUserLists().subscribe(
      (lists) => {
        this.lists = lists;
      },
      (error) =>
        console.error('Błąd podczas ładowania list użytkownika:', error)
    );
  }

  createList(): void {
    if (this.newListForm.invalid) {
      alert('Wprowadź poprawną nazwę listy (min. 3 znaki).');
      return;
    }

    const newList = {
      nazwaListy: this.newListForm.value.nazwaListy,
    };

    this.listService.createList(newList.nazwaListy).subscribe(
      (list) => {
        this.lists.push(list);
        this.newListForm.reset();
        console.log('Nowa lista została dodana:', list);
      },
      (error) => console.error('Błąd podczas tworzenia nowej listy:', error)
    );
  }

  deleteList(id: number): void {
    if (confirm('Czy na pewno chcesz usunąć tę listę?')) {
      this.listService.deleteList(id).subscribe(
        () => {
          this.lists = this.lists.filter((list) => list.idListy !== id);
          console.log('Lista została usunięta.');
        },
        (error) => console.error('Błąd podczas usuwania listy:', error)
      );
    }
  }

  viewListDetails(list: List): void {
    this.router.navigate([`/list/${list.idListy}`]);
  }

  startEditList(list: List): void {
    this.isEditing = true;
    this.editingListId = list.idListy;
    this.newListForm.setValue({ nazwaListy: list.nazwaListy });
  }

  editList(): void {
    if (!this.editingListId || this.newListForm.invalid) {
      alert('Błąd podczas edycji listy. Sprawdź wprowadzone dane.');
      return;
    }

    const updatedList = {
      idListy: this.editingListId,
      nazwaListy: this.newListForm.value.nazwaListy,
    };

    this.listService.createList(updatedList.nazwaListy).subscribe(
      (list) => {
        const index = this.lists.findIndex((l) => l.idListy === list.idListy);
        if (index !== -1) this.lists[index] = list;
        this.resetEditing();
        console.log('Lista została zaktualizowana:', list);
      },
      (error) => console.error('Błąd podczas edycji listy:', error)
    );
  }

  resetEditing(): void {
    this.isEditing = false;
    this.editingListId = null;
    this.newListForm.reset();
  }
}
