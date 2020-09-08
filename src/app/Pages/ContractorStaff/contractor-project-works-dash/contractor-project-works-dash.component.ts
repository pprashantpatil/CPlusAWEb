import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-contractor-project-works-dash',
  templateUrl: './contractor-project-works-dash.component.html',
  styleUrls: ['./contractor-project-works-dash.component.css']
})
export class ContractorProjectWorksDashComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }
  projectlist1
  pickeroptions
  value: any
  ProjectID: any
  ngOnInit() {
    this.ProjectID = localStorage.getItem('ProjectID');
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.GetContractorProjectWorks();
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist1 = data;
    })
  }
  projectlist
  public GetContractorProjectWorks() {
    this.fmsservice.GetContractorProjectWorks().subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.contractorID == localStorage.getItem('userid') && x.projectID == localStorage.getItem('ProjectID'));
    })
  }

  GetProjectID(event) {
    let projectID = event.target.value;
    if (event.target.value == 0) {
      this.GetContractorProjectWorks();
    }
    else {
      this.fmsservice.GetContractorProjectWorks().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.contractorID == localStorage.getItem('userid') && x.projectID == localStorage.getItem('ProjectID'));
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
        this.fmsservice.DeleteContractorProjectWorks(id).subscribe(res => {
          let test = res;
          this.GetContractorProjectWorks();
        })
        Swal.fire(
          'Deleted!',
          'Project Work has been deleted.',
          'success'
        )
      }
      else {
        this.GetContractorProjectWorks();
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
    this.fmsservice.GetContractorProjectWorksByDate(this.startdate, this.enddate).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.contractorID == localStorage.getItem('userid') && x.projectID == localStorage.getItem('ProjectID'));
    })
  }

}
