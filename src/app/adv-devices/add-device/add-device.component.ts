import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  newDeviceForm: FormGroup;
  cities: any;
  types_of_allocation: any;

  constructor(private deviceService: DevicesService) {
    this.newDeviceForm = new FormGroup(
      {
        'deviceName': new FormControl('', Validators.required),
        'deviceCity': new FormControl('', Validators.required),
        'deviceAllocationType': new FormControl('', Validators.required),
        'techName': new FormControl('', Validators.required),
        'deviceVersion': new FormControl('', Validators.required),
        
      });
  }

  ngOnInit(): void {
    let cities = this.deviceService.getCities();
    let allocations = this.deviceService.getTypesOfAllocations();

    forkJoin([cities, allocations]).subscribe({
      next: result => {
        this.cities = result[0].cities;
        this.types_of_allocation = result[1].types_of_allocation;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  submit(){}
}
