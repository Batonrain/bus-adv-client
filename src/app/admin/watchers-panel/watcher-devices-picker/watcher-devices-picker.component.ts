import { ChangeDetectorRef, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-watcher-devices-picker',
  templateUrl: './watcher-devices-picker.component.html',
  styleUrls: ['./watcher-devices-picker.component.css']
})
export class WatcherDevicesPickerComponent implements OnInit {

  public constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  
}
