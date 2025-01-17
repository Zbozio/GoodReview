import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { UserService } from '../../services/users.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Pobieranie zalogowanego użytkownika z tokena
    const userId = this.authService.getUserIdFromToken();

    if (!userId) {
      // Jeśli użytkownik nie jest zalogowany, przekieruj na login
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return new Observable((observer) => observer.next(false));
    }

    // Pobranie roli użytkownika z serwera
    return this.userService.getUser(userId).pipe(
      map((user) => {
        if (user && user.idOceny2 === 1) {
          // Jeśli użytkownik ma rolę admina (idRola === 1)
          return true;
        } else {
          // Jeśli brak uprawnień, przekieruj na stronę główną lub stronę odmowy dostępu
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
}
