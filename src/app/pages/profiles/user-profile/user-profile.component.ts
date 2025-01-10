import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/users.service';
import { ListService, List } from '../../../services/list.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class UserProfileComponent implements OnInit {
  user: any = null; // Dane użytkownika
  lists: List[] = []; // Listy użytkownika

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private listService: ListService // Dodajemy serwis ListService
  ) {}

  ngOnInit(): void {
    // Obserwujemy zmiany w parametrach routingu
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const userId = +params.get('id')!; // Pobieramy id użytkownika z parametru routingu
          console.log('User ID from route:', userId); // Dodaj log
          return this.userService.getUser(userId); // Pobieramy dane użytkownika
        })
      )
      .subscribe(
        (user) => {
          this.user = user;
          console.log('User data:', this.user); // Dodaj log
          this.loadUserLists(); // Ładujemy listy użytkownika po pobraniu danych użytkownika
        },
        (error) => {
          console.error('Error loading user data:', error); // Dodaj log błędu
        }
      );
  }

  // Metoda do ładowania list użytkownika
  loadUserLists(): void {
    if (this.user && this.user.idUzytkownik) {
      // Używamy idUzytkownik, a nie id
      console.log('Loading lists for user with ID:', this.user.idUzytkownik); // Dodaj log
      this.listService.getListsForFriend(this.user.idUzytkownik).subscribe(
        (lists) => {
          console.log('Received lists:', lists); // Dodaj log
          this.lists = lists; // Przypisujemy pobrane listy użytkownika
        },
        (error) => {
          console.error('Błąd podczas ładowania list użytkownika:', error);
        }
      );
    } else {
      console.error('User ID is missing or invalid'); // Log, jeśli brak ID użytkownika
    }
  }
}
