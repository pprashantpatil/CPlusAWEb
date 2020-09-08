import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service';
import Swal from 'sweetalert2'
import { build$ } from 'protractor/built/element';


@Component({
  selector: 'app-supstaffleave',
  templateUrl: './supstaffleave.component.html',
  styleUrls: ['./supstaffleave.component.css']
})
export class SupstaffleaveComponent implements OnInit {

  constructor(public fmsservice: FmsService,) { }
  public leavelist:any;
  selectedlanguage:any;
  StaffLeaves:any;
  StaffLeaveslist:any;
  Staffsearch:any;
  staffID:any;
  Reason:any;

 
  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.fmsservice.GetStaffLeaves(this.selectedlanguage).subscribe(
      res => {
        debugger;
        this.StaffLeaves = res;
debugger
        var List=this.StaffLeaves.filter(x=>x.supervisorID==119)

        this.StaffLeaveslist=List
      }
    )
  }


  getrejectid(staffID) {

    this.staffID = staffID

  }



  approveleave(staffID) {
    debugger

    var procs = {
      'ID': staffID,
      'LeaveReason': "NA",
      'Status1': "Approved"
    };

    this.fmsservice.UpdateStaffLeaves(procs).subscribe(data => {
      debugger

      if (data != undefined) {

        Swal.fire("Approved Successfully")

        debugger
        this.fmsservice.GetStaffLeaves(this.selectedlanguage).subscribe(
          res => {
            debugger;
            this.StaffLeaves = res;
            let StaffID = localStorage.getItem("userid")
            var List=this.StaffLeaves.filter(x=>x.supervisorID==StaffID)
    
            this.StaffLeaveslist=List
          }
        )
      }

    })

  }



  Rejectleave() {
    debugger



    var procs = {
      'ID': this.staffID,
      'LeaveReason': this.Reason,
      'Status1': "Rejected"
    };

    this.fmsservice.UpdateStaffLeaves(procs).subscribe(data => {
      debugger

      if (data != undefined) {

        Swal.fire("Rejected Successfully")

        debugger
        this.fmsservice.GetStaffLeaves(this.selectedlanguage).subscribe(
          res => {
            debugger;
            this.StaffLeaves = res;
            let StaffID = localStorage.getItem("userid");
            var List=this.StaffLeaves.filter(x=>x.supervisorID==StaffID)
            this.StaffLeaveslist=List
          }
        )
      }

    })


  }

}
