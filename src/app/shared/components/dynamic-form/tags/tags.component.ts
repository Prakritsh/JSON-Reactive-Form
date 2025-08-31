import { Component, Input } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [ MatChipsModule,MatIcon,MatFormField],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {

  @Input() tagsArray!: FormArray;

addTag(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
        this.tagsArray.push(new FormControl(value));
    }
    event.chipInput!.clear();
  }
    removeTag(index: number) {
    this.tagsArray.removeAt(index);
  }
}
