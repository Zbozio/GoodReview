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
import { AuthorComponent } from './admin-panel/add-author/add-author.component';
import { PublisherComponent } from './adminPanel/add-publisher/add-publisher.component';
import { AddBookComponent } from './admin-panel/adding-books/adding-books.component';
import { AcceptFriendRequestsComponent } from './pages/accept-friend-requests/accept-friend-requests.component';
import { profile } from 'console';
import { FriendsComponent } from './pages/friends/friends.component';
import { LoggenUserProfileComponent } from './profiles/loggen-user-profile/loggen-user-profile.component';
import { PublisherProfileComponent } from './profiles/publisher-profile/publisher-profile.component';
import { AuthorProfileComponent } from './profiles/author-profile/author-profile.component';
import { ListsComponent } from './pages/books/lists/lists.component';
import { ListOfBooksComponent } from './pages/books/list-of-books-component/list-of-books-component.component';
import { AddTagsComponent } from './adminPanel/add-tags/add-tags.component';
import { AddTagsForBooksComponent } from './adminPanel/add-tags-for-books/add-tags-for-books.component';
import { AdminGuard } from './profiles/registration-profile/admin-guard.guard';
import { RecommendationPageComponent } from './pages/recommendation-page/recommendation-page.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', canActivate: [AuthGuard], component: MainTimelineComponent },

  {
    path: 'accept-friend-requests',
    canActivate: [AuthGuard],
    component: AcceptFriendRequestsComponent,
  },
  {
    path: 'recommend',
    canActivate: [AuthGuard],
    component: RecommendationPageComponent,
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

  {
    path: 'bookDetails/:id',
    canActivate: [AuthGuard],
    component: BookDetailsComponent,
  },
  { path: 'books', canActivate: [AuthGuard], component: BooksComponent },

  {
    path: 'books/:userId',
    canActivate: [AuthGuard, UserIdGuard],
    component: BooksComponent,
  },
  { path: 'register', component: RegistrationProfileComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: '/login' },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
