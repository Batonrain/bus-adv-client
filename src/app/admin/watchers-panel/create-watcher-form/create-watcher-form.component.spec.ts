import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWatcherFormComponent } from './create-watcher-form.component';

describe('CreateWatcherFormComponent', () => {
  let component: CreateWatcherFormComponent;
  let fixture: ComponentFixture<CreateWatcherFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateWatcherFormComponent]
    });
    fixture = TestBed.createComponent(CreateWatcherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
