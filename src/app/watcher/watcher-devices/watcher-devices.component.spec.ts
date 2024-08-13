import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatcherDevicesComponent } from './watcher-devices.component';

describe('WatcherDevicesComponent', () => {
  let component: WatcherDevicesComponent;
  let fixture: ComponentFixture<WatcherDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatcherDevicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatcherDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
