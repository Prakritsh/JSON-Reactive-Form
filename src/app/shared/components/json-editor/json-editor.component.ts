
import { Component, effect, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonFormService } from '../../../core/services/json-form.service';
import { Clipboard } from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SHARED_IMPORTS } from '../../share-import';

@Component({
  selector: 'app-json-editor',
  standalone: true,
  imports: [SHARED_IMPORTS,
  ReactiveFormsModule,
  MatTooltipModule 
],
  templateUrl: './json-editor.component.html',
  styleUrl: './json-editor.component.scss'
})
export class JsonEditorComponent implements OnInit {
  jsonForm !: FormGroup;
  invalidJson: boolean = false;
  copySuccess = signal(false);
 constructor(private fb : FormBuilder, private jsonFormService : JsonFormService,private clipboard: Clipboard) {
      effect(() => {
      const data = this.jsonFormService.jsonInput();
      this.jsonForm.patchValue({ jsonInput: data });
    })
  } 
  ngOnInit(): void {

        this.buildForm()
  }
  buildForm() {
    const storageData = localStorage.getItem('form-data');
    this.jsonForm = this.fb.group({
      jsonInput: [storageData ||'']
    }); 
  }
onJsonInputChange() {
  const value = this.jsonForm.value.jsonInput?.trim();
  if (!value) {
    this.invalidJson = false;
    this.jsonFormService.jsonData.set('');
    return;
  }

  try {
    JSON.parse(value);
    this.jsonFormService.jsonData.set(value);
    this.invalidJson = false;
  } catch {
    this.invalidJson = true;
  }
}
copySampleJson() {
  const sampleJson ={
 "name": "Crewmojo Demo",
 "description": "Testing reactive form coding task",
 "tags": ["angular", "forms", "json"],
 "settings": {
 "notifications": true,
 "theme": "dark",
 "refreshInterval": 30
 },
 "members": [
 { "id": 1, "name": "Alice", "role": "Admin" },
 { "id": 2, "name": "Bob", "role": "User" }
 ]
}

 const jsonString = JSON.stringify(sampleJson, null, 2);
    this.clipboard.copy(jsonString);
    this.copySuccess.set(true);
    setTimeout(() => this.copySuccess.set(false), 2000);
}



}
