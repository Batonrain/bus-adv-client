import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit{
  constructor(
    public citiesService: CitiesService,
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
