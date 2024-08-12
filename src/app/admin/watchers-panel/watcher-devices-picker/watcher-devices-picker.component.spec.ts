import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatcherDevicesPickerComponent } from './watcher-devices-picker.component';

describe('WatcherDevicesPickerComponent', () => {
  let component: WatcherDevicesPickerComponent;
  let fixture: ComponentFixture<WatcherDevicesPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatcherDevicesPickerComponent]
    });
    fixture = TestBed.createComponent(WatcherDevicesPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
