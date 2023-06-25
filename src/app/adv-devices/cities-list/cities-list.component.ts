import { Component, OnInit } from '@angular/core';
import { DevicesService } from 'src/app/services/devices.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AddCityComponent } from '../add-city/add-city.component';

@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.css'],
  providers: [DialogService, MessageService],
})
export class CitiesListComponent implements OnInit {
  constructor(
    public deviceService: DevicesService,
    public dialogService: DialogService,
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
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if (result) {
        this.loadData();
        this.messageService.add({ severity: 'success', summary: 'Устройство успешно добавлено' });
      }
    });
  }

  edit(id: string): void { }

  delete(id: string): void { }

  filter(table: Table, text: any): void {
    table.filterGlobal(text.value, 'contains');
  }

  loadData():void{
    this.deviceService.getCities().subscribe({
        next: result => {
          this.cities = result.cities;
        },
        error: err => {
          console.log(err);
        }
      })
  }
}
