import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDeviceNameComponent } from './change-device-name.component';

describe('ChangeDeviceNameComponent', () => {
  let component: ChangeDeviceNameComponent;
  let fixture: ComponentFixture<ChangeDeviceNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeDeviceNameComponent]
    });
    fixture = TestBed.createComponent(ChangeDeviceNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
