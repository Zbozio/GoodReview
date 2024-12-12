import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './pages/profiles/user-profile/user-profile.component';
import { ProfileComponent } from './pages/profiles/profile/profile.component';

// Definicja tras
export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' }, // Redirect na /users
  { path: 'users', component: ProfileComponent }, // Nowa trasa /users
  { path: 'profile/:id', component: UserProfileComponent }, // Trasa z dynamicznym ID
];

// Konfiguracja routingu
export const AppRoutingModule = RouterModule.forRoot(routes);
