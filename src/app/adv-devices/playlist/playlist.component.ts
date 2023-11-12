import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CitiesService } from 'src/app/services/cities.service';
import { City } from 'src/app/models/city.models';
import { PlaylistService } from 'src/app/services/playlist.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

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
          let strArray: number[] = [];
          this.folders.forEach(f => {
            let rts: number[] = this.extractNumbers(f);
            rts.forEach(r => strArray.push(r));
          });
          this.routes = strArray
                          .sort((a, b) => a - b)
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
  }

  public onRouteClick(event: any) {
    console.log('onRouteClick', event);
  }

  public onUpdatePlaylistClick(){
    console.log('this.selectedRoutes', this.selectedRoutes);
    console.log('selectedFolder', this.selectedFolder);
  }

  private extractNumbers(str: string): number[] {
    const parts = str.split('.');
    return parts
      .map(part => parseInt(part, 10))
      .filter(part => !isNaN(part));
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
