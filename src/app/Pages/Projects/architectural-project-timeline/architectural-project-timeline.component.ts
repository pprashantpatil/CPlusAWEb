import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-architectural-project-timeline',
  templateUrl: './architectural-project-timeline.component.html',
  styleUrls: ['./architectural-project-timeline.component.css']
})
export class ArchitecturalProjectTimelineComponent implements OnInit {

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

    this.fmsservice.GetArchitecturalStages().subscribe(data => {
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

    this.fmsservice.Get_ArchitecturalProjectTimeLine().subscribe(data => {
      debugger
      let temp: any = data;
      this.ProjectWorks = temp.filter(x => x.id == ProjectID);
      let Project = this.ProjectWorks[0];
      this.ProjectID = Project["projectID"];
      this.fmsservice.GetProjectTeam().subscribe(data => {
        debugger
        this.ProjectTeamList = data.filter(x => x.projectID == this.ProjectID);
      })
      this.fmsservice.GetArchitecturalStages().subscribe(data => {
        debugger
        this.StageList = data;
      })
      this.StageID = Project["stageid"];
      this.fmsservice.GetArchitecturalStagesProcessCheck().subscribe(data => {
        debugger
        this.ProjectCheckLists = data.filter(x => x.stagesID == this.StageID);
      })
      this.ProcessCheck = Project["processCheck"];
      this.MileStone_Staf = Project["mileStone_Staf"];
      this.MileStone_Name = Project["mileStone_Name"];
      this.fmsservice.Get_ClientContacts().subscribe(data => {
        debugger
        this.ClientList = data.filter(x => x.projectID == this.ProjectID);
      })
      this.S_Date = this.datepipe.transform(Project["s_Date"], 'yyyy-MM-dd');
      this.E_Date = this.datepipe.transform(Project["e_Date"], 'yyyy-MM-dd');
      this.Ismilestone = Project["ismilestone"];
      this.Description = Project["description"];

      this.MileStone_Client = Project["mileStone_Client"];


    })

  }



  ProjectCheckLists: any;
  public GetStageID(evn) {
    this.StageID = evn.target.value;

    if (this.StageID == 0) {
      this.fmsservice.GetPendingStagesProcessCheck(localStorage.getItem('ProjectID')).subscribe(data => {
        debugger
        this.ProjectCheckLists = data;
      })
    }
    else {
      this.fmsservice.GetPendingStagesProcessCheck(localStorage.getItem('ProjectID')).subscribe(data => {
        debugger
        this.ProjectCheckLists = data.filter(x => x.stagesID == this.StageID);
      })
    }


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
  ProcessCheck: any;
  public Save() {
    debugger;
    let object = {
      'ProjectID': this.BuildingID,
      'S_Date': this.S_Date,
      'E_Date': this.E_Date,
      'Stage': this.StageID,
      'ProcessCheck': this.ProcessCheck,
      'MileStone_Staf': this.MileStone_Staf,
      'MileStone_Client': 1,
      'Description': this.Description,
      'Ismilestone': this.Ismilestone
    }

    this.fmsservice.InsertArchitecturalProjectTimeline(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Project Timelines Saved Successfully!');
      location.href = "#/ArchitecturalProjectTimelineDasboard";
    })
  }

  public Update() {
    debugger;
    let object = {
      'ID': this.paramID,
      'ProjectID': this.BuildingID,
      'S_Date': this.S_Date,
      'E_Date': this.E_Date,
      'Stage': this.StageID,
      'ProcessCheck': this.ProcessCheck,
      'MileStone_Staf': this.MileStone_Staf,
      'MileStone_Client': 1,
      'Description': this.Description,
      'Ismilestone': this.Ismilestone
    }
    this.fmsservice.UpdateArchitecturalProjectTimeline(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Project Timelines Updated Successfully!');
      location.href = "#/ArchitecturalProjectTimelineDasboard";
    })
  }

}
