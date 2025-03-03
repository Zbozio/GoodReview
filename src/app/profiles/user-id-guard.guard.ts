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
    const userIdFromUrl = +route.paramMap.get('userId')!;
    const userIdFromToken = +this.authService.getUserId()!;

    if (userIdFromUrl !== userIdFromToken) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
