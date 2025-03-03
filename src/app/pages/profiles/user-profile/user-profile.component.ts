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
  user: any = null;
  lists: List[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const userId = +params.get('id')!;
          console.log('User ID from route:', userId);
          return this.userService.getUser(userId);
        })
      )
      .subscribe(
        (user) => {
          this.user = user;
          console.log('User data:', this.user);
          this.loadUserLists();
        },
        (error) => {
          console.error('Error loading user data:', error);
        }
      );
  }

  loadUserLists(): void {
    if (this.user && this.user.idUzytkownik) {
      console.log('Loading lists for user with ID:', this.user.idUzytkownik);
      this.listService.getListsForFriend(this.user.idUzytkownik).subscribe(
        (lists) => {
          console.log('Received lists:', lists);
          this.lists = lists;
        },
        (error) => {
          console.error('Błąd podczas ładowania list użytkownika:', error);
        }
      );
    } else {
      console.error('User ID is missing or invalid');
    }
  }
}
