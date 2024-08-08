import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchersTableComponent } from './watchers-table.component';

describe('WatchersTableComponent', () => {
  let component: WatchersTableComponent;
  let fixture: ComponentFixture<WatchersTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatchersTableComponent]
    });
    fixture = TestBed.createComponent(WatchersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
