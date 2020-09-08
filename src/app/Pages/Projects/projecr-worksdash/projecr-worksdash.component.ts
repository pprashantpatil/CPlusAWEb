import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-projecr-worksdash',
  templateUrl: './projecr-worksdash.component.html',
  styleUrls: ['./projecr-worksdash.component.css']
})
export class ProjecrWorksdashComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }
  projectlist1
  pickeroptions
  value: any
  ProjectID: any
  ngOnInit() {
    this.ProjectID = localStorage.getItem('ProjectID');
    this.fmsservice.GetProjectWorks().subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
    })
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.GetProjectWorks();
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist1 = data;
    })
  }
  projectlist
  public GetProjectWorks() {
    this.fmsservice.GetProjectWorks().subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
    })
  }

  GetProjectID(event) {
    let projectID = event.target.value;
    if (event.target.value == 0) {
      this.GetProjectWorks();
    }
    else {
      this.fmsservice.GetProjectWorks().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == projectID);
      })
    }
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
        this.fmsservice.DeleteProjectWorks(id).subscribe(res => {
          let test = res;
          this.GetProjectWorks();
        })
        Swal.fire(
          'Deleted!',
          'Project Work has been deleted.',
          'success'
        )
      }
      else {
        this.GetProjectWorks();
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
    this.fmsservice.GetProjectWorksByDate(this.startdate, this.enddate).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
    })
  }


}
