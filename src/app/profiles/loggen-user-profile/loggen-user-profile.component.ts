import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/users.service';
import { ListService, List } from '../../services/list.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './loggen-user-profile.component.html',
  styleUrls: ['./loggen-user-profile.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class LoggenUserProfileComponent implements OnInit {
  user: any = null; // Dane użytkownika
  lists: List[] = []; // Listy użytkownika
  updatedProfile: any = {
    zdjecie: '',
    opis: '',
  };
  isEditing: boolean = false; // Zmienna do kontrolowania widoczności formularza

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private listService: ListService // Import serwisu list
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const userId = +params.get('id')!;
          return this.userService.getUser(userId);
        })
      )
      .subscribe((user) => {
        this.user = user;
        this.updatedProfile = {
          zdjecie: this.user.zdjecie,
          opis: this.user.opis,
        };
        this.loadUserLists(); // Ładujemy listy użytkownika
      });
  }

  loadUserLists(): void {
    this.listService.getUserLists().subscribe(
      (lists) => {
        this.lists = lists; // Przypisujemy pobrane listy
      },
      (error) =>
        console.error('Błąd podczas ładowania list użytkownika:', error)
    );
  }

  // Metoda do obsługi zmiany zdjęcia
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.updatedProfile.zdjecie = reader.result as string;
      };
      reader.readAsDataURL(file); // Przekonwertowanie obrazu do base64
    }
  }

  // Metoda do zmiany profilu (aktualizacja opisu i zdjęcia)
  updateProfile(): void {
    const userId = this.user.idUzytkownik;

    // Przygotowanie danych do wysłania
    const updateData = {
      zdjecie: this.updatedProfile.zdjecie,
      opis: this.updatedProfile.opis,
    };

    // Wysyłanie tylko zdjęcia i opisu do dedykowanego endpointa
    this.userService.updateUserProfile(userId, updateData).subscribe(
      (response) => {
        alert('Profil został zaktualizowany!');
        // Zaktualizowanie lokalnego obrazu i opisu
        this.user.zdjecie = this.updatedProfile.zdjecie;
        this.user.opis = this.updatedProfile.opis;
        this.toggleEditProfile(); // Zamknięcie formularza
      },
      (error) => {
        console.error('Błąd podczas aktualizacji profilu:', error);
        alert('Błąd aktualizacji profilu!');
      }
    );
  }

  // Funkcja do pokazania lub ukrycia formularza edycji
  toggleEditProfile(): void {
    this.isEditing = !this.isEditing;
  }
}
