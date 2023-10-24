import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DevicesService } from 'src/app/services/devices.service';

@Component({
  selector: 'app-change-device-name',
  templateUrl: './change-device-name.component.html',
  styleUrls: ['./change-device-name.component.css']
})
export class ChangeDeviceNameComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private dialogService: DynamicDialogConfig,
    private deviceService: DevicesService) { }

  ngOnInit() {
    console.log(this.dialogService.data);
    const cleanedInput = this.dialogService.data.currentName.replace('.local', '');
    const parts = cleanedInput.split('-');
    console.log(parts);
    this.form = this.fb.group({
      oldPart1: [{value: parts[0], disabled: true}],
      oldPart2: [{value: parts[1], disabled: true}],
      oldPart3: [{value: parts[2], disabled: true}],
      oldPart4: [{value: parts[3], disabled: true}],
      newPart1: ['', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
      newPart2: ['', [Validators.required, Validators.pattern(/[A-Za-z]/)]],
      newPart3: ['', [Validators.required, Validators.pattern(/\d{1,3}/)]],
      newPart4: ['', [Validators.required, Validators.pattern(/\d{1,3}/)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const oldName = `${this.form.value.oldPart1}-${this.form.value.oldPart2}-${this.form.value.oldPart3}-${this.form.value.oldPart4}`;
      const newName = `${this.form.value.newPart1}-${this.form.value.newPart2}-${this.form.value.newPart3}-${this.form.value.newPart4}`;
      console.log(`Старое имя: ${oldName}, Новое имя: ${newName}`);
    }
  }
}
