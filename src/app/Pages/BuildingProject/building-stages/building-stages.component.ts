import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-building-stages',
  templateUrl: './building-stages.component.html',
  styleUrls: ['./building-stages.component.css']
})
export class BuildingStagesComponent implements OnInit {

  constructor(public fmsService: FmsService, public router: Router) { }
  Stageslist: any;
  ngOnInit() {
    this.fmsService.GetBuildingStages().subscribe(data => {
      debugger
      this.Stageslist = data;
    })
  }


  public Edit(evn) {
    debugger;

    let AssetsID = evn.id;
    this.router.navigate(['/NewBuildingStages', AssetsID]);
  }

}
