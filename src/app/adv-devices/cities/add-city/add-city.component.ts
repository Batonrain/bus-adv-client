import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit{
  constructor(
    public deviceService: DevicesService,
    public ref: DynamicDialogRef) {
    this.cityForm = new FormGroup(
      {
        'cityName': new FormControl('', Validators.required),
      });
  }

  cityForm: FormGroup;
  ngOnInit(): void{}

  submit() {
    const city = {
      name: this.cityForm.value['cityName']
    }
    this.deviceService.addCity(city)
    .subscribe({
      next: result => {
        this.ref.close(result.isAdded)
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
