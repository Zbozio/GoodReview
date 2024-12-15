import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.getToken(); // Pobieramy token z AuthService

    // Sprawdzamy, czy token istnieje
    if (token) {
      // Jeśli token jest dostępny, użytkownik jest zalogowany, więc pozwól na dostęp
      return true;
    } else {
      // Jeśli brak tokenu, przekieruj na stronę logowania
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }, // Przechowujemy URL, na który użytkownik próbował wejść
      });
      return false; // Zablokuj dostęp
    }
  }
}
