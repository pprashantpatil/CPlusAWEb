import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-benefits',
  templateUrl: './employee-benefits.component.html',
  styleUrls: ['./employee-benefits.component.css']
})
export class EmployeeBenefitsComponent implements OnInit {
  search: any;
  constructor(public fmsservice: FmsService, public router: Router, private datePipe: DatePipe) { }

  ngOnInit() {

    this.GetEmployeeBenefitsWithoutId();

  }

  EmployeeBenefitsList;
  public GetEmployeeBenefitsWithoutId() {
    this.fmsservice.GetEmployeeBenefitsWithoutId().subscribe(
      res => {
        debugger;
        this.EmployeeBenefitsList = res.filter(x => x.companyID == 1);

      }
    )
  }




  public EditEB(evn) {
    debugger;
    let ID = evn.id;
    this.router.navigate(['/AddEmployeeBenefits', ID]);
  }


  public confirmButtonText;
  public Delete(evn) {
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
          this.DeleteEmployee_Benefits(evn.id);
          this.InsertLoginDetails(evn.benefitName);

        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }

  public DeleteEmployee_Benefits(ID) {
    debugger;
    //this.EventPlannerEntity.LanguageID=Number(localStorage.getItem('selectedLanguageID'))
    // let test = this.AssetsEntity;
    this.fmsservice.DeleteEmployee_Benefits(ID).subscribe(res => {
      debugger;
      this.GetEmployeeBenefitsWithoutId();
    })
  }
  InsertLoginDetails(benefitName) {
    debugger
    var obj = {
      "ApplicationName": 'Employee Benefit ' + benefitName + ' Deleted',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Employee Benefit",
      "Action": 'Delete Employee Benefit',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }




}
