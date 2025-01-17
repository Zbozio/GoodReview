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
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
// import { AddBookComponent } from './admin-panel/adding-books/adding-books.component';
import { AuthorComponent } from './admin-panel/add-author/add-author.component';
import { PublisherComponent } from './adminPanel/add-publisher/add-publisher.component';
import { AddBookComponent } from './admin-panel/adding-books/adding-books.component';
import { AcceptFriendRequestsComponent } from './pages/accept-friend-requests/accept-friend-requests.component';
import { profile } from 'console';
import { FriendsComponent } from './pages/friends/friends.component';
import { LoggenUserProfileComponent } from './profiles/loggen-user-profile/loggen-user-profile.component';
import { PublisherProfileComponent } from './profiles/publisher-profile/publisher-profile.component';
import { AuthorProfileComponent } from './profiles/author-profile/author-profile.component';
// import { ListOfBooksComponent } from './pages/books/list-of-books-component/list-of-books-component.component';
import { ListsComponent } from './pages/books/lists/lists.component';
import { ListOfBooksComponent } from './pages/books/list-of-books-component/list-of-books-component.component';
import { AddTagsComponent } from './adminPanel/add-tags/add-tags.component';
import { AddTagsForBooksComponent } from './adminPanel/add-tags-for-books/add-tags-for-books.component';
import { AdminGuard } from './profiles/registration-profile/admin-guard.guard';
// Definicja tras
export const routes: Routes = [
  // Domyślny przekierowanie
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Strona główna - wymaga zalogowania
  { path: 'home', canActivate: [AuthGuard], component: MainTimelineComponent },

  // Profil użytkownika
  {
    path: 'accept-friend-requests',
    canActivate: [AuthGuard],
    component: AcceptFriendRequestsComponent,
  },
  {
    path: 'addTags',
    canActivate: [AuthGuard],
    component: AddTagsComponent,
  },
  {
    path: 'addTagsForBooks',
    canActivate: [AuthGuard],
    component: AddTagsForBooksComponent,
  },
  {
    path: 'publisherPage/:id',
    canActivate: [AuthGuard],
    component: PublisherProfileComponent,
  },

  {
    path: 'list/:id',
    canActivate: [AuthGuard],
    component: ListOfBooksComponent,
  },
  {
    path: 'lists',
    canActivate: [AuthGuard],
    component: ListsComponent,
  },
  {
    path: 'authorProfile/:id',
    canActivate: [AuthGuard],
    component: AuthorProfileComponent,
  },
  // Profil użytkownika
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  {
    path: 'loggenUserProfile/:id',
    canActivate: [AuthGuard],
    component: LoggenUserProfileComponent,
  },
  {
    path: 'friends',
    canActivate: [AuthGuard],
    component: FriendsComponent,
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AdminGuard],
  },

  {
    path: 'profile/:id',
    canActivate: [AuthGuard],
    component: UserProfileComponent,
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminPanelComponent,
  },
  {
    path: 'adminAddingBooks',
    canActivate: [AuthGuard],
    component: AddBookComponent,
  },
  {
    path: 'addPublisher',
    canActivate: [AuthGuard],
    component: PublisherComponent,
  },
  {
    path: 'addAuthor',
    canActivate: [AuthGuard],
    component: AuthorComponent,
  },
  // {
  //   path: 'adminAddingBooks',
  //   canActivate: [AuthGuard],
  //   component: AddBookComponent,
  // },
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
