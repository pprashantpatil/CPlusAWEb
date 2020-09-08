import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-project-progress-dashboard',
  templateUrl: './project-progress-dashboard.component.html',
  styleUrls: ['./project-progress-dashboard.component.css']
})
export class ProjectProgressDashboardComponent implements OnInit {

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  Buildinglist: any;
  BuildingID;
  ngOnInit() {
    this.BuildingID = 0;
    this.GetBuildinglist(1);
  }



  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;
      }
    )
  }

  ProjectProgressTrackingList;
  ProjectPercentage;
  public GetBuildingID(evn) {
    debugger;
    let BuildingID = evn.target.value;
    this.fmsservice.GetProjectProgressTracking(BuildingID).subscribe(
      res => {
        debugger;
        this.ProjectProgressTrackingList = res;
        this.ProjectPercentage = res[0].progressPercentage


      }
    )

  }






}
