import { Component } from '@angular/core';
import { LeftPanelComponent } from '../../leftPanel/left-panel/left-panel.component';
import { RightPanelComponent } from '../../rightPanel/right-panel/right-panel.component';
import { RouterModule } from '@angular/router';
import { MainPanelComponent } from '../../main-panel/main-panel.component';

@Component({
  selector: 'app-main-timeline',
  standalone: true,
  imports: [
    LeftPanelComponent,
    RightPanelComponent,
    RouterModule,
    MainPanelComponent,
  ],
  templateUrl: './main-timeline.component.html',
  styleUrl: './main-timeline.component.scss',
})
export class MainTimelineComponent {}
