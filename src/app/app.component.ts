import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header/header.component';
import { LeftPanelComponent } from './leftPanel/left-panel/left-panel.component';
import { MainTimelineComponent } from './mainTimeline/main-timeline/main-timeline.component';
import { RightPanelComponent } from './rightPanel/right-panel/right-panel.component';
import { GatunekComponent } from './gatunek/gatunek/gatunek.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    LeftPanelComponent,
    MainTimelineComponent,
    RightPanelComponent,

    GatunekComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  [x: string]: any;
  title = 'GoodReview';
}
