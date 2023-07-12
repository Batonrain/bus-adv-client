import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AddCityComponent } from '../add-city/add-city.component';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class CitiesListComponent implements OnInit {
  constructor(
    public citiesService: CitiesService,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService) { }

  public cities: any;
  ref: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this.loadData();
  }

  addCity(): void {
    this.ref = this.dialogService.open(AddCityComponent, {
      header: 'Добавление нового города',
      width: '50%',
      height: '50%',
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
        this.messageService.add({ severity: 'success', summary: 'Устройство успешно добавлено' });
      }
    });
  }

  edit(id: string, name: string): void {
    this.ref = this.dialogService.open(AddCityComponent, {
      header: 'Редактирование города',
      width: '50%',
      height: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      closeOnEscape: true,
      closable: true,
      data: {
        isEdit: true,
        id: id,
        name: name
      }
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
        this.messageService.add({ severity: 'success', summary: 'Устройство успешно добавлено' });
      }
    });
   }

  delete(id: string, name: string): void {
    const city = {
      Id: id
    };
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите удалить город <b>' + name + '</b>?',
      header: 'Подтверждение удаления',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.citiesService.delete(id).subscribe({
          next: result => {
            this.messageService.add(
              { severity: 'info', summary: 'Подтверждено', detail: 'Город ' + name + ' удален' });
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
            this.messageService.add({ severity: 'error', summary: 'Отказ', detail: 'Город не был удален' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Отмена', detail: 'Вы отменили удаление города' });
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
    this.citiesService.get().subscribe({
      next: result => {
        this.cities = result.cities;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
