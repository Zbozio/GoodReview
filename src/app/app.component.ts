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

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

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

    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GoodReview';
}
