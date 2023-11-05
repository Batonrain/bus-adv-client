import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AllocationsService } from 'src/app/services/allocations.service';
import { AllocationType } from 'src/app/models/allocation-type.models';
import { AddAllocationComponent } from '../add-allocation/add-allocation.component';

@Component({
  selector: 'app-allocations-list',
  templateUrl: './allocations-list.component.html',
  styleUrls: ['./allocations-list.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class AllocationsListComponent {
  constructor(
    public allocationsService: AllocationsService,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService) { }

  public allocationTypes: AllocationType[] = [];
  ref: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this.loadData();
  }

  addAllocationType(): void {
    this.ref = this.dialogService.open(AddAllocationComponent, {
      header: 'Добавление нового типа размещения',
      width: '50%',
      height: '65%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      closeOnEscape: true,
      closable: true,
      data: {
        isEdit: false,
      }
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
        this.messageService.add({ severity: 'success', summary: 'Тип раземещения успешно добавлен' });
      }
    });
  }

  edit(id: string, name: string, shortName: string, folderPrefix: string): void {
    this.ref = this.dialogService.open(AddAllocationComponent, {
      header: 'Редактирование типа размещения',
      width: '50%',
      height: '65%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      closeOnEscape: true,
      closable: true,
      data: {
        isEdit: true,
        id: id,
        allocationType: name,
        shortAllocationType: shortName,
        folderPrefix: folderPrefix,
      }
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
        this.messageService.add({ severity: 'success', summary: 'Тип размещения успешно изменен' });
      }
    });
  }

  delete(id: string, name: string): void {
    const city = {
      Id: id
    };
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите удалить тип размещения <b>' + name + '</b>?',
      header: 'Подтверждение удаления',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.allocationsService.delete(Number(id)).subscribe({
          next: result => {
            this.messageService.add(
              { severity: 'info', summary: 'Подтверждено', detail: 'Тип размещения ' + name + ' удален' });
            this.loadData();
          },
          error: err => {
            console.log(err);
          }
        })
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Отказ', detail: 'Тип размещения не был удален' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Отмена', detail: 'Вы отменили удаление типа размещения' });
            break;
        }
      },
      key: 'deleteDialog'
    });
  }

  filter(table: Table, text: any): void {
    table.filterGlobal(text.value, 'contains');
  }

  loadData(): void {
    this.allocationsService.get().subscribe({
      next: result => {
        console.log(result);
        this.allocationTypes = result;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
