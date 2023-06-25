import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAllocationComponent } from './add-allocation.component';

describe('AddAllocationComponent', () => {
  let component: AddAllocationComponent;
  let fixture: ComponentFixture<AddAllocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAllocationComponent]
    });
    fixture = TestBed.createComponent(AddAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
