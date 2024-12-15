import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './pages/profiles/user-profile/user-profile.component';
import { ProfileComponent } from './pages/profiles/profile/profile.component';
import { BooksComponent } from './pages/books/books.component';
import { MainTimelineComponent } from './mainTimeline/main-timeline/main-timeline.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { AuthGuard } from './profiles/login-profile.guard';
import { LoginComponent } from './pages/profiles/login-profile/login-profile.component';

// Definicja tras
export const routes: Routes = [
  // Strona główna przekierowuje do 'home' (chroniona)
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Strona główna, chroniona przez AuthGuard
  { path: 'home', canActivate: [AuthGuard], component: MainTimelineComponent },

  // Strona użytkowników, chroniona przez AuthGuard
  { path: 'users', canActivate: [AuthGuard], component: ProfileComponent },

  // Profil użytkownika (id), chroniony przez AuthGuard
  {
    path: 'profile/:id',
    canActivate: [AuthGuard],
    component: UserProfileComponent,
  },

  // Strona książek, chroniona przez AuthGuard
  { path: 'books', canActivate: [AuthGuard], component: BooksComponent },

  // Strona szczegółów książki, chroniona przez AuthGuard
  {
    path: 'booksDetails/:id',
    canActivate: [AuthGuard],
    component: BookDetailsComponent,
  },

  // Strona logowania (niechroniona)
  { path: 'login', component: LoginComponent },
  {
    path: 'books/user/:userId',
    canActivate: [AuthGuard],
    component: BooksComponent,
  },

  // Wszystkie inne trasy przekierowują na stronę logowania
];

// Konfiguracja routingu
export const AppRoutingModule = RouterModule.forRoot(routes);
