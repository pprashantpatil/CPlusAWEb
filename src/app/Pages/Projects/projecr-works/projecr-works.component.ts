import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-projecr-works',
  templateUrl: './projecr-works.component.html',
  styleUrls: ['./projecr-works.component.css']
})
export class ProjecrWorksComponent implements OnInit {
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
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  UserID
  ngOnInit() {
    this.UserID = localStorage.getItem('UserID');
    this.projectID = localStorage.getItem('ProjectID');

    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      let temp: any = data
      this.memberlist = temp.filter(x => x.projectID == this.projectID);
    })
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
      let temp: any = data;
      this.projectlist = temp.filter(x => x.companyID == this.UserID);
    })
  }
  ProjectWorks
  public GetProjectWorksByID(ProjectID) {
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist = data;
    })

    this.fmsservice.GetProjectWorks().subscribe(data => {
      debugger
      let temp: any = data;
      this.ProjectWorks = temp.filter(x => x.id == ProjectID);
      let Project = this.ProjectWorks[0];
      this.projectID = Project["projectID"];
      this.fmsservice.GetProjectTeam().subscribe(data => {
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
  public Save() {
    let object = {
      'ProjectID': localStorage.getItem('ProjectID'),
      'TeamMembers': this.TeamMembers,
      'SDate': this.SDate,
      'EDate': this.EDate,
      'Task': this.Task,
      'Description': this.Description,

    }

    this.fmsservice.InsertProjectWorks(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Project Work Saved Successfully!');
      location.href = "#/projectworkdash";
    })


  }

  public Update() {

    let object = {
      'Id': this.paramID,
      'ProjectID': localStorage.getItem('ProjectID'),
      'TeamMembers': this.TeamMembers,
      'SDate': this.SDate,
      'EDate': this.EDate,
      'Task': this.Task,
      'Description': this.Description,
    }
    this.fmsservice.Update_ProjectWorks(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Project Works Updated Successfully!');
      location.href = "#/projectworkdash";
    })
  }




}
