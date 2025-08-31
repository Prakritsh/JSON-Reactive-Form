import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

export const SHARED_IMPORTS = [
  CommonModule,
  ReactiveFormsModule,
  MatInputModule,
  MatButtonModule,
  MatChipsModule,
  MatIconModule,
  MatCardModule,
  MatFormField
];