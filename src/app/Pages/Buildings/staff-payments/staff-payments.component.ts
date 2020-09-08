import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ExportToCsv } from 'export-to-csv';
import { stringify } from '@angular/compiler/src/util';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-staff-payments',
  templateUrl: './staff-payments.component.html',
  styleUrls: ['./staff-payments.component.css']
})
export class StaffPaymentsComponent implements OnInit {

  constructor(public fmsservice: FmsService, public router: Router, public datepipe: DatePipe) { }
  PaymentSearch;
  ngOnInit() {
    this.GetStaff_Payment();
  }


  StaffPaymentsDetails;
  public GetStaff_Payment() {
    this.fmsservice.GetStaff_Payment().subscribe(
      res => {
        debugger;
        this.StaffPaymentsDetails = res.filter(x => x.companyID == localStorage.getItem('userid'));

      }
    )
  }


  public EditStaffPayments(evn) {
    debugger;
    let ID = evn.id;
    this.router.navigate(['/NewStaffPayments', ID]);
  }


  public confirmButtonText;
  public DeleteStaffPayments(evn) {
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
        if (this.confirmButtonText = "Yes, delete it!") {
          this.DeleteStaff_Payment(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }

  public DeleteStaff_Payment(ID) {
    debugger;
    this.fmsservice.DeleteStaff_Payment(ID).subscribe(res => {
      debugger;
      this.GetStaff_Payment();
    })
  }
}
