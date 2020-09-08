import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-expenses',
  templateUrl: './staff-expenses.component.html',
  styleUrls: ['./staff-expenses.component.css']
})
export class StaffExpensesComponent implements OnInit {

  constructor(public fmsservice: FmsService, public router: Router) { }

  ngOnInit() {
    this.GetStaffExpense();

  }

  StaffExpensesList;
  public GetStaffExpense() {
    this.fmsservice.GetStaffExpense().subscribe(
      res => {
        debugger;
        this.StaffExpensesList = res;

      }
    )
  }


  public EditEB(evn) {
    debugger;
    let ID = evn.id;
    this.router.navigate(['/NewStaffExpenses', ID]);
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
          this.DeleteStaffExpense(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }

  public DeleteStaffExpense(ID) {
    debugger;
    //this.EventPlannerEntity.LanguageID=Number(localStorage.getItem('selectedLanguageID'))
    // let test = this.AssetsEntity;
    this.fmsservice.DeleteStaffExpense(ID).subscribe(res => {
      debugger;
      this.GetStaffExpense();
    })
  }




}
