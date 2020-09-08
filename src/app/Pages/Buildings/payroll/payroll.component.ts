import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ExportToCsv } from 'export-to-csv';
import { stringify } from '@angular/compiler/src/util';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {


  constructor(public fmsservice: FmsService, public router: Router, public datepipe: DatePipe) { }

  ngOnInit() {
    this.GetStaffDetails()
  }


  StaffDetails
  public GetStaffDetails() {
    this.fmsservice.GetStaffDetails().subscribe(
      res => {
        debugger;
        this.StaffDetails = res;

      }
    )
  }


  public EditPayrolls(evn) {
    debugger;
    let PayrollsID = evn.id;
    this.router.navigate(['/NewPayrolls', PayrollsID]);
  }

  public confirmButtonText;
  public DeletePayrolls(evn) {
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
          this.DeleteStaffDetails(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }

  public DeleteStaffDetails(ID) {
    debugger;
    //this.EventPlannerEntity.LanguageID=Number(localStorage.getItem('selectedLanguageID'))
    // let test = this.AssetsEntity;
    this.fmsservice.DeleteStaffDetails(ID).subscribe(res => {
      debugger;
      this.GetStaffDetails();
    })
  }

  StaffName;
  Designation;
  Department;
  LOPDays;
  LOPAmount;
  GrossSalary;
  BaseSalary;
  DeductionPF;
  DeductionPT;
  Deductiontax;
  DeductionInsurance;
  netPayMonthly;
  public ViewPayrollsDetails(evn) {
    debugger;
    this.StaffName = evn.name;
    this.Designation=evn.designation;
    this.Department=evn.department;
    this.LOPDays=evn.lopDays;
    this.LOPAmount=evn.lopAmount;
    this.GrossSalary=evn.grossSalaryMonthly;
    this.BaseSalary=3600;
    this.DeductionPF=evn.deductionPF;
    this.DeductionPT=evn.deductionPT;
    this.Deductiontax=evn.deductionTax;
    this.DeductionInsurance=evn.deductionInsurance;
    this.netPayMonthly=evn.netPayMonthly
  }

}
