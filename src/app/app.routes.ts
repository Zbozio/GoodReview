import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './pages/profiles/user-profile/user-profile.component';
import { ProfileComponent } from './pages/profiles/profile/profile.component';
import { BooksComponent } from './pages/books/books.component';
import { MainTimelineComponent } from './mainTimeline/main-timeline/main-timeline.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
// Definicja tras
export const routes: Routes = [
  { path: '', component: MainTimelineComponent },
  { path: 'users', component: ProfileComponent }, // Nowa trasa /users
  { path: 'profile/:id', component: UserProfileComponent },
  { path: 'books', component: BooksComponent },
  { path: 'booksDetails/:id', component: BookDetailsComponent },
];

// Konfiguracja routingu
export const AppRoutingModule = RouterModule.forRoot(routes);
