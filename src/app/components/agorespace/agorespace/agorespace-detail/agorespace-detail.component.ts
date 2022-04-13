import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Agorespace } from 'src/app/shared/interface/agorespace';
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
    private agorespaceService: AgorespaceService,
    private location: Location,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getAgora();
  }

  getAgora(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.agorespaceService.getAgora(id)
      .subscribe(agora => this.agora = agora);
  }

  save(): void {
    if (this.agora) {
      this.agorespaceService.updateAgora(this.agora)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

//openGoogleMaps(address:string) {
    //this.router.navigate([url])
    //this.router.navigateByUrl(`https://www.google.com/maps/search/?api=1&query=${{address}}`);
//}

}
