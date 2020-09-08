import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-building-project-tracking',
  templateUrl: './building-project-tracking.component.html',
  styleUrls: ['./building-project-tracking.component.css']
})
export class BuildingProjectTrackingComponent implements OnInit {

  constructor(public fmsService: FmsService) { }
  trackinglist: any;
  ProjectSearch: any;
  Buildinglist: any;
  BuildingID: any;

  ngOnInit() {
    this.BuildingID = 0
    this.fmsService.GetAllProjectProgressTracking().subscribe(data => {
      debugger
      this.trackinglist = data;
    })

    this.fmsService.GetBuildinglist(1).subscribe(
      res => {
        this.Buildinglist = res;
      }
    )
  }

  ProjectProgressTrackingList;
  CurMilestone;
  public GetBuildingID(evn) {
    debugger;
    let BuildingID = evn.target.value;
    this.fmsService.GetProjectProgressTracking(BuildingID).subscribe(
      res => {
        debugger;
        this.trackinglist = res;
      }
    )

  }
}
