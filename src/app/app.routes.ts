import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './pages/profiles/user-profile/user-profile.component';
import { ProfileComponent } from './pages/profiles/profile/profile.component';
import { BooksComponent } from './pages/books/books.component';
import { MainTimelineComponent } from './mainTimeline/main-timeline/main-timeline.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { AuthGuard } from './profiles/login-profile.guard';
import { UserIdGuard } from './profiles/user-id-guard.guard';
import { LoginComponent } from './pages/profiles/login-profile/login-profile.component';
import { UserBooksComponent } from './pages/books/user-books/user-books.component';
import { RegistrationProfileComponent } from './profiles/registration-profile/registration-profile.component';

// Definicja tras
export const routes: Routes = [
  // Domyślny przekierowanie
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Strona główna - wymaga zalogowania
  { path: 'home', canActivate: [AuthGuard], component: MainTimelineComponent },

  // Profil użytkownika
  { path: 'users', canActivate: [AuthGuard], component: ProfileComponent },

  // Profil użytkownika z parametrem id
  {
    path: 'profile/:id',
    canActivate: [AuthGuard],
    component: UserProfileComponent,
  },

  // Główna strona książek - dostęp do wszystkich książek
  {
    path: 'bookDetails/:id',
    canActivate: [AuthGuard],
    component: BookDetailsComponent,
  },
  { path: 'books', canActivate: [AuthGuard], component: BooksComponent },

  // Strona książek użytkownika z parametrem :userId
  {
    path: 'books/:userId',
    canActivate: [AuthGuard, UserIdGuard], // UserIdGuard tylko tutaj
    component: BooksComponent,
  },
  { path: 'register', component: RegistrationProfileComponent },
  // Strona logowania (niechroniona)
  { path: 'login', component: LoginComponent },

  // Strona, na którą przekierowywany jest nieznany URL
  { path: '**', redirectTo: '/login' },
];

// Konfiguracja routingu
export const AppRoutingModule = RouterModule.forRoot(routes);
