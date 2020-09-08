import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-employee-benefits',
  templateUrl: './new-employee-benefits.component.html',
  styleUrls: ['./new-employee-benefits.component.css']
})
export class NewEmployeeBenefitsComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe, private route: ActivatedRoute) { }
  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public EmployeeID;
  public EmployeeEntity = {
    BenefitName: "",
    Title: "",
    Description: "",
    Date: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    CompanyID: localStorage.getItem('userid')

  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      debugger;
      this.EmployeeID = params['id'];
      if (params['id'] != undefined) {
        this.EmployeeID = params['id'];
        this.GetEmployeeBenefits(this.EmployeeID);

      }

    }
    );

  }


  public GetEmployeeBenefits(ID) {
    debugger;
    this.fmsservice.GetEmployeeBenefits(ID).subscribe(
      res => {

        this.EmployeeEntity.BenefitName = res[0].benefitName;
        this.EmployeeEntity.Date = this.datepipe.transform(res[0].date, 'yyyy-MM-dd')
        this.EmployeeEntity.Description = res[0].description;
        this.EmployeeEntity.Title = res[0].title;



      }
    )
  }

  public InsertEmployee_Benifits() {
    debugger;
    this.fmsservice.InsertEmployee_Benifits(this.EmployeeEntity).subscribe(res => {
      debugger;
      Swal.fire('Employee Benefits Saved Successfully');
      location.href = '#/EmployeeBenefits'
      this.InsertLoginDetails();

    })

  }

  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Employee Benefit ' + this.EmployeeEntity.BenefitName + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Employee Benefit",
      "Action": 'Add New Employee Benefit',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  InsertLoginDetails1() {
    debugger
    var obj = {
      "ApplicationName": 'Employee Benefit ' + this.EmployeeEntity.BenefitName + ' Updated',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Update Employee Benefit",
      "Action": 'Add New Employee Benefit',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  public UpdateBenifits() {
    debugger;
    this.fmsservice.UpdateEmployeeBenifits(this.EmployeeID, this.EmployeeEntity).subscribe(res => {
      debugger;
      Swal.fire('Employee Benefits Updated Successfully!');
      location.href = '#/EmployeeBenefits'
      this.InsertLoginDetails1();
    })
  }

}
