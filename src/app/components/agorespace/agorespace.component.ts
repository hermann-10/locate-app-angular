import { Component, OnInit } from '@angular/core';

import { Agorespace } from 'src/app/shared/interface/agorespace';
import { AGORESPACES_DATA } from '../../shared/data/mock-agora';
import { AgorespaceService } from 'src/app/shared/services/agorespace.service';

@Component({
  selector: 'app-agorespace',
  templateUrl: './agorespace.component.html',
  styleUrls: ['./agorespace.component.css']
})
export class AgorespaceComponent implements OnInit {

 
  agorespaces: Agorespace[] = [];


  //agorespace_data = AGORESPACE_DATA;
  //selectedAgora?: Agorespace;

  constructor(private agoraService: AgorespaceService) { }

  ngOnInit(): void {
    this.getAgoraspaces();
  }


  getAgoraspaces(): void {
    this.agoraService.getAgorespaces()
        .subscribe(agorespaces => this.agorespaces = agorespaces);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.agoraService.addAgora({ name } as Agorespace)
      .subscribe(agora => {
        this.agorespaces.push(agora);
      });
  }

  delete(agora: Agorespace): void {
    this.agorespaces = this.agorespaces.filter(h => h !== agora);
    this.agoraService.deleteAgora(agora.id).subscribe();
  }

}
