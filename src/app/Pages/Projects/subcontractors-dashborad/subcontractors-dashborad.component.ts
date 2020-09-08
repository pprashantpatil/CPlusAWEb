import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
@Component({
  selector: 'app-subcontractors-dashborad',
  templateUrl: './subcontractors-dashborad.component.html',
  styleUrls: ['./subcontractors-dashborad.component.css']
})
export class SubcontractorsDashboradComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }
  projectlist1: any;
  value: any;
  pickeroptions: any;
  UserID: any;
  ngOnInit() {
    debugger;
    this.UserID = localStorage.getItem('UserID');
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.Get_SubContractor();
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist1 = data;
    })
  }

  SubContractorList
  public Get_SubContractor() {
    debugger;
    this.fmsservice.Get_SubContractor().subscribe(data => {
      debugger
      this.SubContractorList = data.filter(x => x.companyID == this.UserID);
    })
  }
  projectID
  GetProjectID(event) {

    this.projectID = event.target.value;
    // if (event.target.value == 0) {
    //   this.Get_SubContractor();
    // }
    // else {
    //   this.fmsservice.Get_SubContractor().subscribe(data => {
    //     debugger
    //     let temp: any = data;
    //     this.SubContractorList = temp.filter(x => x.projectID == projectID);
    //   })
    // }
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
    this.fmsservice.Get_SubContractorByDate(this.startdate, this.enddate).subscribe(data => {
      debugger
      this.SubContractorList = data;
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
        this.fmsservice.Delete_SubContractor(id).subscribe(res => {
          let test = res;
          this.Get_SubContractor();
        })
        Swal.fire(
          'Deleted!',
          'Transmittal has been deleted.',
          'success'
        )
      }
      else {
        this.Get_SubContractor();
      }
    })
  }
}
