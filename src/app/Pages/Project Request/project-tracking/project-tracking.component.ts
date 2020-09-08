import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-tracking',
  templateUrl: './project-tracking.component.html',
  styleUrls: ['./project-tracking.component.css']
})
export class ProjectTrackingComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }

  ngOnInit() {
    this.GetAllvendorbidprojects();
    this.ProjectID = 0;
    this.GetBuildinglist(1);

  }

  public ProjectID;
  public Projectlist;
  public ProjectPercentage;
  public FileredProjectlist;
  public GetAllvendorbidprojects() {
    debugger;
    this.fmsservice.GetAllvendorbidprojects().subscribe(
      res => {
        debugger;
        this.Projectlist = res;
      }
    )
  }

  public Projecttasks(evn) {
    debugger;
    if (evn == "0") {
      this.ProjectDetails = null;
    }
    else {
      this.GetProjectTrackingByProjectID(evn);
    }
  }


  public ProjectDetails = [];
  public GetProjectTrackingByProjectID(ProjectID) {
    debugger;
    this.fmsservice.GetProjectTrackingByProjectID(ProjectID).subscribe(
      res => {
        debugger;
        this.ProjectDetails = res;
        this.FileredProjectlist = this.Projectlist.filter(x => x.projectID == ProjectID);
        let Iscompleted = this.ProjectDetails.filter(x => x.isCompleted == true);

        this.ProjectPercentage = (Iscompleted.length * 100) / this.ProjectDetails.length;
      }
    )
  }
  Buildinglist
  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;
      }
    )
  }
}
