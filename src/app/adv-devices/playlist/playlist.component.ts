import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { CitiesService } from 'src/app/services/cities.service';
import { City } from 'src/app/models/city.models';
import { PlaylistService } from 'src/app/services/playlist.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeFolderNameModel } from 'src/app/models/change-folders-name.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class PlaylistComponent implements OnInit {
  public cities: City[] = [];
  selectedCity: City | undefined;
  public folders: string[] = ['Выберите город...']
  public selectedFolder: string = '';
  public routes: string[] = [];
  public selectedRoutes: any[] = [];
  public selectedRoute: any = {};
  public updateButtonDisabled: boolean = true;
  public folderListDisabled: boolean = true;
  public addRouteDisabled: boolean = true;
  public newRoute: string = '';

  constructor(
    public citiesService: CitiesService,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.loadData();
  }

  public onCitySelect(selectedValue: any) {
    this.selectedCity = selectedValue;
    this.addRouteDisabled = true;
    forkJoin({
      bucketReques: this.playlistService.getBucketFolders(selectedValue.bucketName),
      routesRequest: this.playlistService.getCityRoutes(selectedValue.id),
    })
      .pipe(
        map(results => {
          const bucketReques = results.bucketReques;
          const routesRequest = results.routesRequest;
          return { bucketReques, routesRequest };
        }))
      .subscribe({
        next: combinedResults => {
          this.folders = combinedResults.bucketReques;
          this.routes = combinedResults.routesRequest;
          let strArray: string[] = [];
          this.folders.forEach(f => {
            let rts: string[] = this.extractNumbers(f);
            rts.forEach(r => strArray.push(r));
          });
          this.routes = strArray
            .filter((n, i) => strArray.indexOf(n) === i)
            .map(n => n.toString());
          this.folderListDisabled = false;
        },
        error: error => console.error('Произошла ошибка', error)
      });
  }

  public onFolderSelection(selectedValue: string) {
    const numbers = this.extractNumbers(selectedValue).map(n => n.toString());
    this.selectedRoutes = numbers;
    this.updateButtonDisabled = false;
    this.addRouteDisabled = false;
  }

  public onRouteClick(event: any) {
    //console.log('onRouteClick', event);
  }

  public submitRename() {
    let model: ChangeFolderNameModel = {
      selectedFolder: this.selectedFolder,
      selectedRoutes: this.selectedRoutes,
      bucketName: this.selectedCity?.bucketName ?? '',
    };
    //console.log(model);

    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите переименовать папки?',
      header: 'Подверждение операции',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.playlistService.updateFoldersNames(model).subscribe({
          next: result => {
            this.messageService.add({ severity: 'info', summary: 'Подтверждение операции', detail: 'Вы подтвердили операцию по переименованию папок' });
            window.location.reload();
          },
          error: err => {
            console.log(err);
          }
        })
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Отмена переименования', detail: 'Вы отменили операцию по переименованию папок' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Отмена переименования', detail: 'Вы отменили операцию по переименованию папок' });
            break;
        }
      }
    });
  }

  public addNewRoute(): void{
    this.routes.push(this.newRoute);
    this.newRoute = '';
  }

  private extractNumbers(str: string): string[] {
    const parts = str.split('.');
    const regex = /^[A-Za-z0-9]{1,3}$/; // Регулярное выражение для проверки каждой части

    return parts.filter(part => regex.test(part));
  }

  private loadData(): void {
    this.citiesService.get().subscribe({
      next: result => {
        this.cities = result;
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
