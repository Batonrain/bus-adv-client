import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesListComponent } from './routes-list.component';

describe('RoutesListComponent', () => {
  let component: RoutesListComponent;
  let fixture: ComponentFixture<RoutesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutesListComponent]
    });
    fixture = TestBed.createComponent(RoutesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
