import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonFormContainerComponent } from './json-form-container.component';

describe('JsonFormContainerComponent', () => {
  let component: JsonFormContainerComponent;
  let fixture: ComponentFixture<JsonFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonFormContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
