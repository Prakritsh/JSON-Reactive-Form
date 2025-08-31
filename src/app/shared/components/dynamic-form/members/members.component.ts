import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Member } from '../../../../core/models/schema.interface';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {
 @Input({ required: true }) membersArray!: FormArray;

  constructor(private fb: FormBuilder) {}

  addMember() {
    const memberGroup = this.fb.group({
      id: [0, [Validators.required, Validators.min(1)]],
      name: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.membersArray.push(memberGroup);
  }

  removeMember(index: number) {
    this.membersArray.removeAt(index);
  }
  get members() {
    return this.membersArray.controls as FormGroup[];
  }
}

