import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ThemeService } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-staff-expenses',
  templateUrl: './new-staff-expenses.component.html',
  styleUrls: ['./new-staff-expenses.component.css']
})
export class NewStaffExpensesComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  public StaffExpenseEntity = {
    StaffID: 0,
    DOB: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    TIN_NO: 0,
    Pagbig_NO: 0,
    Location: "",
    EmploymentStatus: "none"

  }

  StaffID
  ngOnInit() {
    this.GetAllStaff();
    this.route.params.subscribe(params => {
      this.StaffID = params['id'];
      this.GetStaffExpenseByID(this.StaffID);
    }
    );

  }

  StaffExpenses;
  public GetStaffExpenseByID(ID) {
    this.fmsservice.GetStaffExpenseByID(ID).subscribe(res => {
      debugger
      this.StaffExpenses = res;
      this.StaffExpenseEntity.StaffID = res[0].staffID;
      this.StaffExpenseEntity.DOB = this.datepipe.transform(res[0].dob, 'yyyy-MM-dd');
      this.StaffExpenseEntity.Pagbig_NO = res[0].pagbig_NO;
      this.StaffExpenseEntity.TIN_NO = res[0].tiN_NO;
      this.StaffExpenseEntity.EmploymentStatus = res[0].employmentStatus;
      this.StaffExpenseEntity.Location = res[0].location;

    })
  }



  Stafflist
  public GetAllStaff() {
    this.fmsservice.GetStaff(1).subscribe(data => {
      debugger
      this.Stafflist = data;
    })
  }



  public InsertStaffExpense() {
    this.fmsservice.InsertStaffExpense(this.StaffExpenseEntity).subscribe(res => {
      debugger;
      Swal.fire('Staff Expenses Completed Successfully!');
      this.Clear();
    })
  }

  public Clear() {
    this.StaffExpenseEntity.StaffID = 0,
      this.StaffExpenseEntity.DOB = this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      this.StaffExpenseEntity.TIN_NO = 0,
      this.StaffExpenseEntity.Pagbig_NO = 0,
      this.StaffExpenseEntity.Location = "",
      this.StaffExpenseEntity.EmploymentStatus = "none"
  }


  public UpdateStaffExpense() {
    debugger;
    this.fmsservice.UpdateStaffExpense(this.StaffID, this.StaffExpenseEntity).subscribe(res => {
      Swal.fire('Staff Expenses Updated Successfully!');
    })
  }

}
