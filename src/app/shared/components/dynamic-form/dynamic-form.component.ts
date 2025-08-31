import { Component, computed, effect, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOption } from "@angular/material/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Member } from '../../../core/models/schema.interface';
import { JsonFormService } from '../../../core/services/json-form.service';
import { TitleCasePipe } from '@angular/common';
import { themeValidator } from '../../../core/validatorsFn';
import { TagsComponent } from "./tags/tags.component";
import { MembersComponent } from "./members/members.component";
import { SHARED_IMPORTS } from '../../share-import';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [SHARED_IMPORTS,
    MatOption,
    MatSelectModule,
    MatSlideToggleModule,
    TitleCasePipe, 
    TagsComponent, 
    MembersComponent],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent implements OnInit {
  reactiveForm !: FormGroup; 
  theme = ['light', 'dark', 'system default'];
  jsonOutput = computed(() => this.jsonFormService.jsonData());
  
  constructor(private fb: FormBuilder, private jsonFormService: JsonFormService) {
    this.buildForm();
      effect(() => {

    if (!this.jsonOutput()) {
      this.reactiveForm.reset();
      this.clearFormArray('tags');
    this.clearFormArray('members');
      return;
    }
    const parsedData = typeof this.jsonOutput() === 'string' ? JSON.parse(this.jsonOutput()) : this.jsonOutput();
    this.updateFromJson(parsedData);                
      }, { allowSignalWrites: true });
  }
  private buildForm() {
    this.reactiveForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      tags: this.fb.array([]),
      settings: this.fb.group({
      notifications: [false],
        theme: ['', [Validators.required, themeValidator]],
        refreshInterval: [10, [Validators.required, Validators.min(1)]]
      }),
      members: this.fb.array([ this.createMemberForm()])
    });
  }
setupFormSync() {
    this.reactiveForm.valueChanges
      .pipe(
        debounceTime(300), 
        distinctUntilChanged() 
      )
      .subscribe(formValue => {
        this.updateJsonOutput(formValue);
      });
  }
updateFromJson(data: any) {
  if (data) {
    this.reactiveForm.reset();
    this.clearFormArray('tags');
    this.clearFormArray('members');
    const themeControl = this.settingsGroup.get('theme') as FormControl;
    this.reactiveForm.patchValue(data); 
    data?.members.forEach((element : Member) => {
        this.addMember(element);
    });
    data?.tags.forEach((element : any) => {
      this.tags.push(new FormControl(element));
    });
    themeControl.setValue(data.settings?.theme.toLowerCase(), { emitEvent: false });
  }
}
  ngOnInit() {
    this.loadFromLocalStorage();
        this.setupFormSync();
  }

  newTagValue: string = '';
  showTagInput: boolean = true;


   createMemberForm(member?: Member): FormGroup {
    return this.fb.group({
      id: [member?.id || 0],
      name: [member?.name || '', Validators.required],
      role: [member?.role || '', Validators.required]
    });
  }

addMember(element ?:Member): void {
  this.members.push(this.createMemberForm(element));
}

get tags(): FormArray {
  return this.reactiveForm.get('tags') as FormArray;
}

get settingsGroup(): FormGroup {
  return this.reactiveForm.get('settings') as FormGroup;
}
get members(): FormArray {
  return this.reactiveForm.get('members') as FormArray;
}
  get name() {
  return this.reactiveForm.get('name');
}
   loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem('form-data');
      const data = saved ? JSON.parse(saved) : null;
      if (data) {
        this.jsonFormService.jsonData.set(JSON.stringify(data));
      } 
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }
   saveToLocalStorage() {
    if (this.reactiveForm.valid) {
      localStorage.setItem('form-data', JSON.stringify( this.reactiveForm.value));
    }
  }


submit() {
const filteredMembers = this.members.controls.filter(
(group) => (group as FormGroup).get('id')?.value !== 0
);
this.members.clear();
filteredMembers.forEach((group) => this.members.push(group));
if(this.reactiveForm.invalid) {
  this.reactiveForm.markAllAsTouched();
  return;
}
this.saveToLocalStorage();
    console.log('Form Submitted:', this.reactiveForm.value);
}
 private updateJsonOutput(formValue: any) {
    try {
      this.jsonFormService.jsonInput.set(JSON.stringify(formValue, null, 2));
    } catch (error) {
     this.jsonFormService.jsonInput.set( 'Error generating JSON');
    }
  }

clearFormArray(arrayName: string) {
  const formArray = this.reactiveForm.get(arrayName) as FormArray;
  while (formArray.length !== 0) {
    formArray.removeAt(0);
  }
}
}