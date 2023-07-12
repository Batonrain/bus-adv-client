import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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
    console.log(this.dialogConfig.data)

    if (this.isEdit) {
      this.id = this.dialogConfig.data['id']
      initCityNameValue = this.dialogConfig.data['name']
    }

    this.cityForm = new FormGroup(
      {
        'cityName': new FormControl(initCityNameValue, Validators.required),
      });
  }

  id: string = '';
  isEdit: boolean = false;
  cityForm: FormGroup;

  ngOnInit(): void { }

  submit() {
    const city = {
      id: this.id,
      name: this.cityForm.value['cityName']
    }
    if (this.isEdit) {
      this.citiesService.edit(city)
        .subscribe({
          next: result => {
            this.ref.close(result.isEdited)
          },
          error: err => {
            console.log(err);
          }
        });
    } else {
      this.citiesService.add(city)
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
}
