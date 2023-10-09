import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechniciansListComponent } from './technicians-list.component';

describe('TechniciansListComponent', () => {
  let component: TechniciansListComponent;
  let fixture: ComponentFixture<TechniciansListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechniciansListComponent]
    });
    fixture = TestBed.createComponent(TechniciansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
