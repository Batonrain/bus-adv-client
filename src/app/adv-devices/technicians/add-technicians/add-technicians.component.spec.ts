import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTechniciansComponent } from './add-technicians.component';

describe('AddTechniciansComponent', () => {
  let component: AddTechniciansComponent;
  let fixture: ComponentFixture<AddTechniciansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTechniciansComponent]
    });
    fixture = TestBed.createComponent(AddTechniciansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
