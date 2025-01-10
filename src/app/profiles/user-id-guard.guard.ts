import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class UserIdGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Pobieramy userId z URL
    const userIdFromUrl = +route.paramMap.get('userId')!; // Odczytujemy ID użytkownika z URL
    const userIdFromToken = +this.authService.getUserId()!; // ID użytkownika z tokenu

    // Jeśli userId w URL jest inne niż zalogowany użytkownik, przekierowujemy
    if (userIdFromUrl !== userIdFromToken) {
      // Użytkownik nie ma dostępu do tego profilu, więc przekierowujemy go
      this.router.navigate(['/home']);
      return false; // Blokujemy dostęp
    }

    return true; // Użytkownik ma dostęp do swojego profilu
  }
}
