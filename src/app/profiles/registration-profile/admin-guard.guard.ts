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
    const userId = this.authService.getUserIdFromToken();

    if (!userId) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return new Observable((observer) => observer.next(false));
    }

    return this.userService.getUser(userId).pipe(
      map((user) => {
        if (user && user.idOceny2 === 1) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
}
