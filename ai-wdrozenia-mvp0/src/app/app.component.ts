import { Component } from '@angular/core';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { FaqSectionComponent } from './components/faq-section/faq-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { PricingSectionComponent } from './components/pricing-section/pricing-section.component';
import { ProblemSectionComponent } from './components/problem-section/problem-section.component';
import { ProcessSectionComponent } from './components/process-section/process-section.component';
import { SolutionSectionComponent } from './components/solution-section/solution-section.component';
import { TargetSectionComponent } from './components/target-section/target-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    ProblemSectionComponent,
    SolutionSectionComponent,
    PricingSectionComponent,
    TargetSectionComponent,
    ProcessSectionComponent,
    FaqSectionComponent,
    ContactSectionComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
