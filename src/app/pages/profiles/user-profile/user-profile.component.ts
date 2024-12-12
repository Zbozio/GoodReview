import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/users.service';
import { switchMap } from 'rxjs';
import { CommonEngine } from '@angular/ssr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  imports: [CommonModule],
})
export class UserProfileComponent implements OnInit {
  user: any = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Obserwuj zmiany w parametrach routingu
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const userId = +params.get('id')!;
          return this.userService.getUser(userId); // Pobierz dane użytkownika
        })
      )
      .subscribe((user) => {
        this.user = user; // Zaktualizuj dane użytkownika
      });
  }
}
