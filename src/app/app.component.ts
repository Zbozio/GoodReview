import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header/header.component';
import { LeftPanelComponent } from './leftPanel/left-panel/left-panel.component';
import { MainTimelineComponent } from './mainTimeline/main-timeline/main-timeline.component';
import { RightPanelComponent } from './rightPanel/right-panel/right-panel.component';
import { GatunekComponent } from './gatunek/gatunek/gatunek.component';
import { ProfileComponent } from './pages/profiles/profile/profile.component';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './pages/profiles/user-profile/user-profile.component';
import { BooksComponent } from './pages/books/books.component';
import { LoginComponent } from './pages/profiles/login-profile/login-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    LeftPanelComponent,
    MainTimelineComponent,
    RightPanelComponent,
    ProfileComponent,
    GatunekComponent,
    RouterModule,

    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  [x: string]: any;
  title = 'GoodReview';
}
