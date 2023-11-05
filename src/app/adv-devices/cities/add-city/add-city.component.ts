import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { City } from 'src/app/models/city.models';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  constructor(
    public citiesService: CitiesService,
    public dialogConfig: DynamicDialogConfig,
    public ref: DynamicDialogRef) {
    this.isEdit = this.dialogConfig.data['isEdit']
    let initCityNameValue = '';
    let initShortCityNameValue = '';
    let initCityBucketValue = '';

    if (this.isEdit) {
      this.approveButtonText = 'Сохранить';
      this.id = this.dialogConfig.data['id'];
      initCityNameValue = this.dialogConfig.data['cityName'];
      initShortCityNameValue = this.dialogConfig.data['cityShortName'];
      initCityBucketValue = this.dialogConfig.data['cityBucket'];
    }

    this.cityForm = new FormGroup(
      {
        'cityName': new FormControl(initCityNameValue, Validators.required),
        'cityShortName': new FormControl(initShortCityNameValue, Validators.required),
        'cityBucket': new FormControl(initCityBucketValue, Validators.required),
      });
  }

  id: string = '';
  isEdit: boolean = false;
  approveButtonText = 'Добавить'
  cityForm: FormGroup;

  ngOnInit(): void { }

  submit() {
    let city: City = {
      id: Number(this.id),
      name: this.cityForm.value['cityName'],
      shortName: this.cityForm.value['cityShortName'],
      bucketName: this.cityForm.value['cityBucket'],
    }
    if (this.isEdit) {
      this.citiesService.update(city.id, city)
        .subscribe({
          next: result => {
            this.ref.close(true)
          },
          error: err => {
            console.log(err);
          }
        });
    } else {
      this.citiesService.create(city)
        .subscribe({
          next: result => {
            this.ref.close(result.name)
          },
          error: err => {
            console.log(err);
          }
        });
    }
  }
}
