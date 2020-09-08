import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-budget',
  templateUrl: './new-budget.component.html',
  styleUrls: ['./new-budget.component.css']
})
export class NewBudgetComponent implements OnInit {
  ProjectID
  paramID
  projectlist: any
  StageList: any
  Stage: any
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {

    this.Stage = 'none';
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.id == localStorage.getItem('ProjectID'));
    })
    this.fmsservice.GetArchitecturalStages().subscribe(data => {
      debugger
      this.StageList = data;
    })
    this.ProjectID = localStorage.getItem('ProjectID');
    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.GetBudgetByID(this.paramID);
      }
    }
    );


  }
  Budget
  public GetBudgetByID(ProjectID) {
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.id == localStorage.getItem('ProjectID'));
    })

    this.fmsservice.GetBudgetReport().subscribe(data => {
      debugger
      let temp: any = data;
      this.Budget = temp.filter(x => x.id == ProjectID);
      let Project = this.Budget[0];
      this.ProjectID = Project["projectID"];
      this.Stage = Project["stage"];
      this.NoOfHours = Project["noOfHours"];
      this.Description = Project["description"];
    })

  }
  NoOfHours: any
  Description: any
  public GetStage(event) {
    debugger
    this.Stage = event.target.value;
  }

  public Save() {
    debugger
    let object = {
      'ProjectID': this.ProjectID,
      'Stage': this.Stage,
      'NoOfHours': this.NoOfHours,
      'Description': this.Description

    }

    this.fmsservice.InsertBudgetReport(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Budget Hours Saved Successfully!');
      location.href = "#/BudgetDashboard";
    })

  }
  public Update() {
    let object = {
      'Id': this.paramID,
      'ProjectID': this.ProjectID,
      'Stage': this.Stage,
      'NoOfHours': this.NoOfHours,
      'Description': this.Description
    }

    this.fmsservice.UpdateBudgetReport(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Budget Hours Updated Successfully!');
      location.href = "#/BudgetDashboard";
    })

  }

}
