import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationsListComponent } from './allocations-list.component';

describe('AllocationsListComponent', () => {
  let component: AllocationsListComponent;
  let fixture: ComponentFixture<AllocationsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllocationsListComponent]
    });
    fixture = TestBed.createComponent(AllocationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
