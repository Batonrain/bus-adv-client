import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AllocationType } from 'src/app/models/allocation-type.models';
import { ChangeDeviceNetNameModel } from 'src/app/models/change-device-net-name.models';
import { City } from 'src/app/models/city.models';
import { AllocationsService } from 'src/app/services/allocations.service';
import { CitiesService } from 'src/app/services/cities.service';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-change-device-name',
  templateUrl: './change-device-name.component.html',
  styleUrls: ['./change-device-name.component.css']
})
export class ChangeDeviceNameComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  cleanedName: string = '';
  public cities: City[] = [];
  public allocationTypes: AllocationType[] = [];

  buttonDisabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogService: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private deviceService: DevicesService,
    private citiesService: CitiesService,
    private allocationsService: AllocationsService) { }

  ngOnInit() {
    this.loadCities();
    this.loadAllocations();
    this.cleanedName = this.dialogService.data.currentName.replace('.local', '');
    const parts = this.cleanedName.split('-');
    console.log(parts);
    this.form = this.fb.group({
      oldPart1: [{value: parts[0], disabled: true}],
      oldPart2: [{value: parts[1], disabled: true}],
      oldPart3: [{value: parts[2], disabled: true}],
      oldPart4: [{value: parts[3], disabled: true}],
      newPart1: ['', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
      newPart2: ['', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
      newPart3: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]/)]],
      newPart4: ['', [Validators.required, Validators.pattern(/\d{1,3}/)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.buttonDisabled = true;
      console.log(this.form.value)
      console.log(this.cleanedName)
      const newName = `${this.form.value.newPart1.shortName}-${this.form.value.newPart2.shortName}-${this.form.value.newPart3}-${this.form.value.newPart4}`;
      let model: ChangeDeviceNetNameModel = {
        currentName: this.cleanedName,
        newName: newName
      }
      this.deviceService.updateNetName(model).subscribe({
        next: result => {
          console.log("result", result);
          this.ref.close(true)
        },
        error: err => {
          this.buttonDisabled = true;
          console.log(err);
        }
      });
      console.log(model);
    }
  }

  loadCities(): void {
    this.citiesService.get().subscribe({
      next: result => {
        this.cities = result;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  loadAllocations(): void {
    this.allocationsService.get().subscribe({
      next: result => {
        this.allocationTypes = result;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
