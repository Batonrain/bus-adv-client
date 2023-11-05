import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AllocationsService } from 'src/app/services/allocations.service';
import { AllocationType } from 'src/app/models/allocation-type.models';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-allocation',
  templateUrl: './add-allocation.component.html',
  styleUrls: ['./add-allocation.component.css']
})
export class AddAllocationComponent {
  constructor(
    public allocationsService: AllocationsService,
    public dialogConfig: DynamicDialogConfig,
    public ref: DynamicDialogRef) {
    this.isEdit = this.dialogConfig.data['isEdit']
    let initAllocationTypeNameValue = '';
    let initShortAllocationTypeNameValue = '';
    let initFolderPrefixValue = '';

    if (this.isEdit) {
      this.approveButtonText = 'Сохранить';
      this.id = this.dialogConfig.data['id'];
      initAllocationTypeNameValue = this.dialogConfig.data['allocationType'];
      initShortAllocationTypeNameValue = this.dialogConfig.data['shortAllocationType'];
      initFolderPrefixValue = this.dialogConfig.data['folderPrefix'];
    }

    this.allocationTypeForm = new FormGroup(
      {
        'allocationType': new FormControl(initAllocationTypeNameValue, Validators.required),
        'shortAllocationType': new FormControl(initShortAllocationTypeNameValue, Validators.required),
        'folderPrefix': new FormControl(initFolderPrefixValue, Validators.required),
      });
  }

  id: string = '';
  isEdit: boolean = false;
  approveButtonText = 'Добавить'
  allocationTypeForm: FormGroup;

  ngOnInit(): void { }

  submit() {
    let city: AllocationType = {
      id: Number(this.id),
      name: this.allocationTypeForm.value['allocationType'],
      shortName: this.allocationTypeForm.value['shortAllocationType'],
      folderPrefix: this.allocationTypeForm.value['folderPrefix']
    }
    if (this.isEdit) {
      this.allocationsService.update(city.id, city)
        .subscribe({
          next: result => {
            this.ref.close(true)
          },
          error: err => {
            console.log(err);
          }
        });
    } else {
      this.allocationsService.create(city)
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
