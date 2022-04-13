import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { AgorespaceService } from 'src/app/shared/services/agorespace.service';

@Component({
  selector: 'app-test-filter',
  templateUrl: './test-filter.component.html',
  styleUrls: ['./test-filter.component.css']
})
export class TestFilterComponent implements OnChanges {
  @Input() groupFilters!: Object;
  @Input() searchByKeyword!: string;
  agorespaces: any[] = [];
  filteredAgorespaces: any[] = [];
  result: any;


  constructor(
    private agorespaceService: AgorespaceService,
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadAgorespaces();
  }

ngOnChanges(): void {
    if (this.groupFilters) this.filterAgoraList(this.groupFilters, this.agorespaces);
}

filterAgoraList(filters: any, agorespaces: any): void {
    this.filteredAgorespaces = this.agorespaces; //Reset Agorespace List
    const keys = Object.keys(filters);

    const filterAgora = (agora: any) => {
    let result = keys.map(key => {

    return String(agora[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase())

    });
    // To Clean Array from undefined if the age is passed so the map will fill the gap with (undefined)

    this.result = this.result.filter((it: any) => it !== undefined);
    // Filter the Age out from the other filters

    if (filters['ageto'] && filters['agefrom']) {
    
      if (agora['age']) {

      if (+agora['age'] >= +filters['agefrom'] && +agora['age'] <= +filters['ageto']) {
        this.result.push(true);
      } else {
        this.result.push(false);
      }

      } else {
        this.result.push(false);
      }
    }
      return this.result.reduce((acc: any, cur: any) => { return acc & cur }, 1)
    }
      this.filteredAgorespaces = this.agorespaces.filter(filterAgora);
}

loadAgorespaces(): void {
  this.agorespaceService.fetchAgorespaces()
  .subscribe((agorespaces: any[]) => this.agorespaces = agorespaces);
  this.filteredAgorespaces = this.filteredAgorespaces.length > 0 ? this.filteredAgorespaces : this.agorespaces;
}

}
