import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-project-time-line',
  templateUrl: './project-time-line.component.html',
  styleUrls: ['./project-time-line.component.css']
})
export class ProjectTimeLineComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  projectlist: any;
  paramID
  BuildingID
  StageList: any;
  ngOnInit() {


    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.Get_ProjectTimeLineByID(this.paramID);
      }
    }
    );
    this.ProjectID = localStorage.getItem('ProjectID');
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.id == localStorage.getItem('ProjectID'));
    })
    this.BuildingID = this.ProjectID;
    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      this.ProjectTeamList = data.filter(x => x.projectID == this.ProjectID);
    })

    this.fmsservice.Get_ClientContacts().subscribe(data => {
      debugger
      this.ClientList = data.filter(x => x.projectID == this.ProjectID);
    })

    this.fmsservice.GetBuildingStages().subscribe(data => {
      debugger
      this.StageList = data;
    })
  }

  ProjectWorks
  public Get_ProjectTimeLineByID(ProjectID) {
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.id = this.ProjectID);
    })

    this.fmsservice.Get_ProjectTimeLine().subscribe(data => {
      debugger
      let temp: any = data;
      this.ProjectWorks = temp.filter(x => x.id == ProjectID);
      let Project = this.ProjectWorks[0];
      this.ProjectID = Project["projectID"];
      this.fmsservice.GetProjectTeam().subscribe(data => {
        debugger
        this.ProjectTeamList = data.filter(x => x.projectID == this.ProjectID);
      })
      this.MileStone_Staf = Project["mileStone_Staf"];
      this.MileStone_Name = Project["mileStone_Name"];
      this.fmsservice.Get_ClientContacts().subscribe(data => {
        debugger
        this.ClientList = data.filter(x => x.projectID == this.ProjectID);
      })
      this.S_Date = this.datepipe.transform(Project["s_Date"], 'yyyy-MM-dd');
      this.E_Date = this.datepipe.transform(Project["e_Date"], 'yyyy-MM-dd');

      this.Description = Project["description"];

      this.MileStone_Client = Project["mileStone_Client"];
      this.StageID = Project["stageID"];
      this.Ismilestone = Project["ismilestone"];



    })

  }




  public GetStageID(evn) {
    this.StageID = evn.target.value;
  }

  ProjectTeamList: any;
  ClientList: any;
  ProjectID: any;
  S_Date: any;
  E_Date: any;
  MileStone_Name: any;
  MileStone_Staf: any;
  MileStone_Client: any;
  Description: any;
  StageID: any;
  Ismilestone: any;
  public Save() {
    debugger;
    let object = {
      'ProjectID': this.BuildingID,
      'S_Date': this.S_Date,
      'E_Date': this.E_Date,
      'MileStone_Name': this.MileStone_Name,
      'MileStone_Staf': this.MileStone_Staf,
      'MileStone_Client': 1,
      'Description': this.Description,
      'StagesID': this.StageID,
      'Ismilestone': this.Ismilestone
    }

    this.fmsservice.Insert_ProjectTimeLine(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Project Timelines Saved Successfully!');
      location.href = "#/ProjectTimeLineDashboard";
    })
  }

  public Update() {
    debugger;
    let object = {
      'ID': this.paramID,
      'ProjectID': this.ProjectID,
      'S_Date': this.S_Date,
      'E_Date': this.E_Date,
      'MileStone_Name': this.MileStone_Name,
      'MileStone_Staf': this.MileStone_Staf,
      'MileStone_Client': this.MileStone_Client,
      'Description': this.Description,
      'StagesID': this.StageID,
      'Ismilestone': this.Ismilestone

    }

    this.fmsservice.Update_ProjectTimeLine(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Project Timelines Updated Successfully!');
      location.href = "#/ProjectTimeLineDashboard";
    })
  }

}
