import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { CitiesService } from 'src/app/services/cities.service';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css'],
})
export class AddDeviceComponent implements OnInit {
  newDeviceForm: FormGroup;
  cities: any;
  types_of_allocation: any;
  isEdit: boolean = false;
  id: string = ''

  constructor(
    public deviceService: DevicesService,
    public citiesService: CitiesService,
    public dialogConfig: DynamicDialogConfig,
    public ref: DynamicDialogRef) {
    //this.isEdit = this.dialogConfig.data['isEdit'];

    this.newDeviceForm = new FormGroup(
      {
        'deviceName': new FormControl('', Validators.required),
        'deviceCity': new FormControl('', Validators.required),
        'deviceAllocationType': new FormControl('', Validators.required),
        'deviceRoute': new FormControl('', Validators.required),
        'deviceMachineNumber': new FormControl('', Validators.required),
        'deviceTechName': new FormControl('', Validators.required),
        'deviceVersion': new FormControl('', Validators.required),
        'deviceBucketName': new FormControl('', Validators.required),
        'deviceBucketPrefix': new FormControl('', Validators.required),
        'deviceTranslationUrl': new FormControl('', Validators.required),
      });

    // if (!this.isEdit) {
    //   this.initEditForm(this.dialogConfig.data['device'])
    // }
  }

  ngOnInit(): void {
    let cities = this.citiesService.get();
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
    this.deviceService.addDevice(device)
      .subscribe({
        next: result => {
          this.ref.close(result.isAdded)
        },
        error: err => {
          console.log(err);
        }
      });
  }

  private initEditForm(device: any): void {
    console.log(device);
    this.newDeviceForm = new FormGroup(
      {
        'deviceName': new FormControl('', Validators.required),
        'deviceCity': new FormControl('', Validators.required),
        'deviceAllocationType': new FormControl('', Validators.required),
        'deviceRoute': new FormControl('', Validators.required),
        'deviceMachineNumber': new FormControl('', Validators.required),
        'deviceTechName': new FormControl('', Validators.required),
        'deviceVersion': new FormControl('', Validators.required),
        'deviceBucketName': new FormControl('', Validators.required),
        'deviceBucketPrefix': new FormControl('', Validators.required),
        'deviceTranslationUrl': new FormControl('', Validators.required),
      });
  }
}
