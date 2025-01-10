import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/users.service';
import { ListService, List } from '../../services/list.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './loggen-user-profile.component.html',
  styleUrls: ['./loggen-user-profile.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class LoggenUserProfileComponent implements OnInit {
  user: any = null; // Dane użytkownika
  lists: List[] = []; // Listy użytkownika

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
}
