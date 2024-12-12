import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/users.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = null;

  constructor(
    private route: ActivatedRoute, // Używaj ActivatedRoute do pobierania parametru z URL
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get('id')!; // Pobierz id z URL
    this.userService.getUser(userId).subscribe((user) => {
      this.user = user; // Pobierz dane użytkownika
    });
  }
}
