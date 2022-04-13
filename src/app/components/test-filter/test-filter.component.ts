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

    console.log('this.filterAgoraList: ',this.filterAgoraList);
    console.log('this.groupFilters: ',this.groupFilters);
    console.log('this.agorespaces: ',this.agorespaces);
}

filterAgoraList(filters: any, agorespaces: any): void {
    this.filteredAgorespaces = this.agorespaces; //Reset Agorespace List
    const keys = Object.keys(filters);

    const filterAgora = (agora: any) => {
      let result = keys.map (key => {
        if(agora[key]) {
            return String(agora[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase())
        } else {
          return false;
        }
      });
      return result.reduce((acc, cur: any) => { return acc & cur }, 1)
    }
    this.filteredAgorespaces = this.agorespaces.filter(filterAgora);

        console.log('HALLO this.filteredAgorespaces', this.filteredAgorespaces);

}

loadAgorespaces(): void {
  this.agorespaceService.fetchAgorespaces()
  .subscribe((agorespaces: any[]) => this.agorespaces = agorespaces);
  this.filteredAgorespaces = this.filteredAgorespaces.length > 0 ? this.filteredAgorespaces : this.agorespaces;
}

}
