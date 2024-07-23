import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserFormComponent } from './create-user-form.component';

describe('CreateUserFormComponent', () => {
  let component: CreateUserFormComponent;
  let fixture: ComponentFixture<CreateUserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserFormComponent]
    });
    fixture = TestBed.createComponent(CreateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
