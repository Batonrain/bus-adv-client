import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, forkJoin } from 'rxjs';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css'],
  providers: [],
})
export class AddDeviceComponent implements OnInit {
  newDeviceForm: FormGroup;
  cities: any;
  types_of_allocation: any;

  constructor(
    public deviceService: DevicesService,
    public ref: DynamicDialogRef) {
    this.newDeviceForm = new FormGroup(
      {
        'deviceName': new FormControl('qqq', Validators.required),
        'deviceCity': new FormControl('', Validators.required),
        'deviceAllocationType': new FormControl('', Validators.required),
        'deviceRoute': new FormControl('qqq', Validators.required),
        'deviceMachineNumber': new FormControl('qqq', Validators.required),
        'deviceTechName': new FormControl('qqq', Validators.required),
        'deviceVersion': new FormControl('qqq', Validators.required),
        'deviceBucketName': new FormControl('qqq', Validators.required),
        'deviceBucketPrefix': new FormControl('qqq', Validators.required),
        'deviceTranslationUrl': new FormControl('qqq', Validators.required),
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

  submit() {
    const device = {
      name: this.newDeviceForm.value['deviceName'],
      cityId: this.newDeviceForm.value['deviceCity']['Id'],
      allocationTypeId: this.newDeviceForm.value['deviceAllocationType']['Id'],
      route: this.newDeviceForm.value['deviceRoute'],
      machineNumber: this.newDeviceForm.value['deviceMachineNumber'],
      techName: this.newDeviceForm.value['deviceTechName'],
      version: this.newDeviceForm.value['deviceVersion'],
      bucket: this.newDeviceForm.value['deviceBucketName'],
      prefix: this.newDeviceForm.value['deviceBucketPrefix'],
      translationUrl: this.newDeviceForm.value['deviceTranslationUrl'],
    }
    this.deviceService.addNewDevice(device)
    .subscribe({
      next: result => {
        console.log("Новое устройство успешно добавлено")
        console.log(this.ref)
        //this.ref.close(result.isAdded)
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
