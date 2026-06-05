import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type ContactControl = 'name' | 'email' | 'company' | 'message';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly contactForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: ['', [Validators.required, Validators.minLength(2)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  submitted = false;
  sent = false;

  onSubmit(): void {
    this.submitted = true;
    this.sent = false;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    console.log('Contact form payload', this.contactForm.getRawValue());
    this.contactForm.reset();
    this.submitted = false;
    this.sent = true;
  }

  hasError(controlName: ContactControl, error?: string): boolean {
    const control = this.contactForm.controls[controlName];
    const shouldShow = control.invalid && (control.dirty || control.touched || this.submitted);

    return shouldShow && (!error || control.hasError(error));
  }
}
