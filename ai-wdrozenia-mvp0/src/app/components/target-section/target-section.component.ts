import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-target-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './target-section.component.html',
  styleUrls: ['./target-section.component.scss']
})
export class TargetSectionComponent {
  readonly industries = [
    'biura rachunkowe',
    'salony beauty',
    'kancelarie',
    'gabinety medyczne',
    'firmy usługowe',
    'e-commerce'
  ];
}
