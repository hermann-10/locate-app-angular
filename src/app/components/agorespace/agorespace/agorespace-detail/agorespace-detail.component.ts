import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Agorespace } from 'src/app/shared/model/agorespace';
import { AgorespaceService } from 'src/app/shared/services/agorespace.service';

@Component({
  selector: 'app-agorespace-detail',
  templateUrl: './agorespace-detail.component.html',
  styleUrls: ['./agorespace-detail.component.css']
})
export class AgorespaceDetailComponent implements OnInit {

  agora: Agorespace | undefined;
  @Input() agorespace?: Agorespace;

  constructor(
    private route: ActivatedRoute,
    private agoreservice: AgorespaceService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getAgora();
  }

  getAgora(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.agoreservice.getAgora(id)
      .subscribe(agora => this.agora = agora);
  }

  goBack(): void {
    this.location.back();
  }

}