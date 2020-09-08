import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-tasks',
  templateUrl: './new-tasks.component.html',
  styleUrls: ['./new-tasks.component.css']
})
export class NewTasksComponent implements OnInit {
  paramID
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {


    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.GetTaskByID(this.paramID);
      }
    }
    );


  }
  Budget

  public GetTaskByID(ProjectID) {


    this.fmsservice.GetMyTasks().subscribe(data => {
      debugger
      let temp: any = data;
      this.Budget = temp.filter(x => x.id == ProjectID);
      let Project = this.Budget[0];
      this.StartDate = this.datepipe.transform(Project["startDate"], 'yyyy-MM-dd');
      this.EndDate = this.datepipe.transform(Project["endDate"], 'yyyy-MM-dd');
      this.TaskName = Project["taskName"];
      this.Description = Project["description"];
    })

  }
  NoOfHours: any
  Description: any
  StartDate
  EndDate
  TaskName
  public Save() {
    debugger
    let object = {
      'StartDate': this.StartDate,
      'EndDate': this.EndDate,
      'TaskName': this.TaskName,
      'Description': this.Description,
      'StaffID': localStorage.getItem('UserID')

    }

    this.fmsservice.InsertMyTasks(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Task Saved Successfully!');
      location.href = "#/Mytasks";
    })

  }
  public Update() {
    let object = {
      'Id': this.paramID,
      'StartDate': this.StartDate,
      'EndDate': this.EndDate,
      'TaskName': this.TaskName,
      'Description': this.Description,
    }

    this.fmsservice.UpdateMyTasks(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Task Updated Successfully!');
      location.href = "#/Mytasks";
    })

  }

}

