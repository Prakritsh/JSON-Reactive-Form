import { AbstractControl, ValidationErrors } from '@angular/forms';

export function themeValidator(control: AbstractControl): ValidationErrors | null {
  const validThemes = ['light', 'dark', 'system default'];
  return validThemes.includes(control.value) ? null : { invalidTheme: true };
}