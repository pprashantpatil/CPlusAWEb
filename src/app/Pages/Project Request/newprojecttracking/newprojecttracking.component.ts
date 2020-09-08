import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-newprojecttracking',
  templateUrl: './newprojecttracking.component.html',
  styleUrls: ['./newprojecttracking.component.css']
})
export class NewprojecttrackingComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }

  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public mintime = this.datepipe.transform(new Date(), 'hh:mm aa');
  public ProjectTasksEntity = {
    ProjectID: 0,
    ProjectName: "",
    StartDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    EndDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    StartTime: "",
    EndTime: this.datepipe.transform(new Date(), 'hh:mm aa'),
    Tasks: "",
    IsMilestone: false
  }
  ngOnInit() {
    this.GetAllvendorbidprojects();
  }

  public tasks(evn) {
    debugger;
    let ProjectName = this.Projectlist.filter(x => x.projectID == +evn);
    this.ProjectTasksEntity.ProjectName = ProjectName[0].request;
    this.GetProjectTrackingByProjectID(ProjectName[0].projectID);
  }

  public Projectlist;
  public GetAllvendorbidprojects() {
    debugger;
    this.fmsservice.GetAllvendorbidprojects().subscribe(
      res => {
        debugger;
        this.Projectlist = res;
      }
    )
  }

  public ProjectDetails;
  public GetProjectTrackingByProjectID(ProjectID) {
    debugger;
    this.fmsservice.GetProjectTrackingByProjectID(ProjectID).subscribe(
      res => {
        debugger;
        this.ProjectDetails = res;
      }
    )
  }

  public OnMilestonecheck(evn) {
    debugger;
    if (evn.target.checked) {
      this.ProjectTasksEntity.IsMilestone = true;
    }
    else {
      this.ProjectTasksEntity.IsMilestone = false;
    }
  }


  Isempty = false;
  TimeValidation = false;
  public AddTasks() {
    debugger;
    let mandatoryfields = {
      projectID: this.ProjectTasksEntity.ProjectID,
      StartDate: this.ProjectTasksEntity.StartDate,
      StartTime: this.ProjectTasksEntity.StartTime,
      Tasks: this.ProjectTasksEntity.Tasks
    }
    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    } else {

      this.fmsservice.InsertProjectTracking(this.ProjectTasksEntity).subscribe(res => {
        debugger;
        this.GetProjectTrackingByProjectID(this.ProjectTasksEntity.ProjectID);
        this.Clear();
        Swal.fire('Project Scheduled Sucessfully');

      })
    }



  }

  public Clear() {
    this.ProjectTasksEntity.ProjectID = 0,
      this.ProjectTasksEntity.ProjectName = "",
      this.ProjectTasksEntity.StartDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.ProjectTasksEntity.EndDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.ProjectTasksEntity.StartTime = this.datepipe.transform(new Date(), 'hh:mm aa');
    this.ProjectTasksEntity.EndTime = this.datepipe.transform(new Date(), 'hh:mm aa');
    this.ProjectTasksEntity.Tasks = "";
    this.ProjectTasksEntity.IsMilestone = false;

  }

  public SaveEntireProjectTasks() {
    Swal.fire("Tasks For Project " + this.ProjectTasksEntity.ProjectName + " Saved Successfully");
    this.Clear();
    this.GetProjectTrackingByProjectID(0);
  }


}
