import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { CitiesService } from 'src/app/services/cities.service';
import { City } from 'src/app/models/city.models';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class PlaylistComponent implements OnInit {
  public cities: City[] = [];
  selectedCity: City | undefined;
  public folders: string[] = []
  public selectedFolder: string = '';

  constructor(
    public citiesService: CitiesService,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public playlistService: PlaylistService) { }

    ngOnInit(): void {
      this.loadData();
    }

    onSelectionChange(selectedValue: any) {
      console.log('Выбранный элемент: ', selectedValue);
      this.selectedCity = selectedValue;
      this.playlistService.getBucketFolders(selectedValue.bucketName).subscribe({
        next: result => {
          console.log(result);
          this.folders = result;
        },
        error: err => {
          console.log(err);
        }
      })
    }

    loadData(): void {
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
