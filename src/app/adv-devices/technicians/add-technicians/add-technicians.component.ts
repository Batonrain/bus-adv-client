import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AllocationType } from 'src/app/models/allocation-type.models';
import { ChangeDeviceNetNameModel } from 'src/app/models/change-device-net-name.models';
import { City } from 'src/app/models/city.models';
import { AllocationsService } from 'src/app/services/allocations.service';
import { CitiesService } from 'src/app/services/cities.service';
import { DevicesService } from 'src/app/services/devices.service';
import { UserDevicesService } from 'src/app/services/user-devices.service';

@Component({
  selector: 'app-add-technicians',
  templateUrl: './add-technicians.component.html',
  styleUrls: ['./add-technicians.component.css']
})
export class AddTechniciansComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dialogService: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private userDeviceService: UserDevicesService) { }


  ngOnInit() { }
}
