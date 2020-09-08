import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-contractor-project-works',
  templateUrl: './contractor-project-works.component.html',
  styleUrls: ['./contractor-project-works.component.css']
})
export class ContractorProjectWorksComponent implements OnInit {
  projectlist
  projectID
  memberlist
  TeamMembers
  SDate
  EDate
  Task
  Description
  paramID
  typeID
  ProjectID
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {

    this.ProjectID = localStorage.getItem('ProjectID');
    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.GetProjectWorksByID(this.paramID);
      }
    }
    );

    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist = data;
    })

    this.fmsservice.GetContractorStaff(1).subscribe(data => {
      debugger
      this.memberlist = data.filter(x => x.contractorID == localStorage.getItem('userid'));
    })
  }

  ProjectWorks
  public GetProjectWorksByID(ProjectID) {
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist = data;
    })

    this.fmsservice.GetContractorProjectWorks().subscribe(data => {
      debugger
      let temp: any = data;
      this.ProjectWorks = temp.filter(x => x.id == ProjectID);
      let Project = this.ProjectWorks[0];
      this.projectID = Project["projectID"];
      this.StartTime = this.datepipe.transform(Project["startTime"], 'h:mm');
      this.EndTime = this.datepipe.transform(Project["endTime"], 'h:mm');
      this.fmsservice.GetContractorProjectWorks().subscribe(data => {
        debugger
        let temp: any = data
        this.memberlist = temp.filter(x => x.projectID == Project["projectID"]);
      })
      this.TeamMembers = Project["teamMembers"];
      this.SDate = this.datepipe.transform(Project["sDate"], 'yyyy-MM-dd');
      this.EDate = this.datepipe.transform(Project["eDate"], 'yyyy-MM-dd');
      this.Task = Project["task"];
      this.Description = Project["description"];


    })

  }



  public GetProjectID(event) {
    this.projectID = event.target.value;

    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      let temp: any = data
      this.memberlist = temp.filter(x => x.projectID == this.projectID);
    })
  }
  public GetEndDate() {
    debugger
    if (this.SDate > this.EDate) {
      Swal.fire("End Date Should be Greater than Start Date");
      this.EDate = "";
    }
  }

  public GetMemberID(event) {
    this.TeamMembers = event.target.value;
  }


  EndTime: any;
  StartTime: any;
  public Save() {
    let object = {
      'ProjectID': this.ProjectID,
      'TeamMembers': this.TeamMembers,
      'SDate': this.SDate,
      'EDate': this.EDate,
      'Task': this.Task,
      'Description': this.Description,
      'StartTime': this.StartTime,
      'EndTime': this.EndTime
    }
    this.fmsservice.InsertContractorProjectWorks(object).subscribe(res => {
      debugger;
      Swal.fire('Project Work Saved Successfully!');
      location.href = "#/ContractorProjectWorksDash";
    })
  }

  public Update() {

    let object = {
      'Id': this.paramID,
      'ProjectID': this.projectID,
      'TeamMembers': this.TeamMembers,
      'SDate': this.SDate,
      'EDate': this.EDate,
      'Task': this.Task,
      'Description': this.Description,
      'StartTime': this.StartTime,
      'EndTime': this.EndTime
    }
    this.fmsservice.Update_ContractorProjectWorks(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Project Works Updated Successfully!');
      location.href = "#/ContractorProjectWorksDash";
    })
  }

}
