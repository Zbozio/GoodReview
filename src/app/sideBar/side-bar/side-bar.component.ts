import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatDividerModule, MatSidenav],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  @Input() isSidenavOpen: boolean = false; // Odbieramy stan otwarcia menu
  @Output() close = new EventEmitter<void>();
  closeMenu() {
    this.close.emit(); // Emitujemy zdarzenie, by zamknąć menu
  }
}
