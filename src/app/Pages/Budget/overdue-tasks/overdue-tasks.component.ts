import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-overdue-tasks',
  templateUrl: './overdue-tasks.component.html',
  styleUrls: ['./overdue-tasks.component.css']
})
export class OverdueTasksComponent implements OnInit {

  projectlist1
  constructor(public fmsservice: FmsService, ) { }
  LoginTypeID: any;
  ProjectID: any;
  Search: any;
  TextMessage: any;
  pickeroptions: any
  StaffID;
  value: any;
  ngOnInit() {

    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.StaffID = localStorage.getItem('UserID');
    this.GetMyTasks();
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist1 = data;
    })
  }

  projectlist
  Count
  public GetMyTasks() {
    debugger
    this.fmsservice.GetMyTasks().subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.staffID == this.StaffID && x.text == 1);
      this.Count = this.projectlist.length;
    })


  }

  public DeleteProject(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.fmsservice.DeleteMyTasks(id).subscribe(res => {
          let test = res;
          this.GetMyTasks();
        })
        Swal.fire(
          'Deleted!',
          'Task has been deleted.',
          'success'
        )
      }
      else {
        this.GetMyTasks();
      }
    })
  }


  datelist;
  startdate: Date;
  enddate: Date;

  public selectedDate(value) {
    debugger
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];
    debugger
    //Date date= new Date('dd-MM-yyyy');
    this.fmsservice.GetMyTasksByDate(this.startdate, this.enddate).subscribe(data => {
      debugger
      this.projectlist = data.filter(x => x.staffID == this.StaffID && x.text == 1);
      this.Count = this.projectlist.length;
    })
  }


  public CompleteTask(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Complete it!'
    }).then((result) => {
      if (result.value) {
        this.fmsservice.CompleteMyTasks(id).subscribe(res => {
          let test = res;
          this.GetMyTasks();
        })
        Swal.fire(
          'Completed!',
          'Task has been Completed.',
          'success'
        )
      }
      else {
        this.GetMyTasks();
      }
    })
  }



}
