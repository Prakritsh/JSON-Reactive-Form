import { Component } from '@angular/core';
import { DynamicFormComponent } from "../../shared/components/dynamic-form/dynamic-form.component";
import { JsonEditorComponent } from "../../shared/components/json-editor/json-editor.component";
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-json-form-container',
  standalone: true,
  imports: [DynamicFormComponent, JsonEditorComponent, HeaderComponent, FooterComponent],
  templateUrl: './json-form-container.component.html',
  styleUrl: './json-form-container.component.scss'
})
export class JsonFormContainerComponent {

}
