import { Component } from '@angular/core';
import { GatunekService } from '../../services/gatunek.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-gatunek',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gatunek.component.html',
  styleUrls: ['./gatunek.component.scss'],
})
export class GatunekComponent {
  gatunki: any[] = [];

  constructor(private gatunekService: GatunekService) {}

  ngOnInit(): void {
    this.gatunekService.getGatuneks().subscribe((data) => {
      this.gatunki = data;
    });
  }
}
