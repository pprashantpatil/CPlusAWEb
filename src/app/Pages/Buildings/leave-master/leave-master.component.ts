import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leave-master',
  templateUrl: './leave-master.component.html',
  styleUrls: ['./leave-master.component.css']
})
export class LeaveMasterComponent implements OnInit {
  Search: any;
  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public leavelist: any;
  CompanyID: any;
  ngOnInit() {
    this.CompanyID = localStorage.getItem('userid');
    this.GetLeave();

  }
  public GetLeave() {
    debugger
    this.fmsservice.GetLeaves().subscribe(data => {
      debugger
      this.leavelist = data.filter(x => x.companyID == 1);
    })
  }
  LeavesName;
  public Deleteleave(id, LeaveName) {
    debugger;
    this.LeavesName = LeaveName;
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
        this.fmsservice.DeleteLeaves(id).subscribe(res => {
          let test = res;
          this.GetLeave()
        })
        Swal.fire(
          'Deleted!',
          'Project been deleted.',
          'success'
        )
        this.InsertLoginDetails();
      }
      else {
        this.GetLeave();
      }
    })
  }

  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Leave Master ' + this.LeavesName + ' Deleted',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Leave Master",
      "Action": 'Delete Leave Master ',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }
}
