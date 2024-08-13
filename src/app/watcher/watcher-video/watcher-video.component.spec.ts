import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatcherVideoComponent } from './watcher-video.component';

describe('WatcherVideoComponent', () => {
  let component: WatcherVideoComponent;
  let fixture: ComponentFixture<WatcherVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatcherVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatcherVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
