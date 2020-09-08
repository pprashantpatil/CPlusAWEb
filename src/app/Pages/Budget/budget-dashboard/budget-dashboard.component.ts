import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-budget-dashboard',
  templateUrl: './budget-dashboard.component.html',
  styleUrls: ['./budget-dashboard.component.css']
})
export class BudgetDashboardComponent implements OnInit {

  projectlist1
  constructor(public fmsservice: FmsService,) { }
  LoginTypeID: any;
  ProjectID: any;
  Search: any;
  TextMessage:any;
  ngOnInit() {
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.GetBudgetReport();
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist1 = data;
    })
  }

  projectlist
  Count
  public GetBudgetReport() {
    debugger
    this.fmsservice.GetBudgetReport().subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
      this.Count = this.projectlist.length;
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
        this.fmsservice.DeleteBudgetReport(id).subscribe(res => {
          let test = res;
          this.GetBudgetReport();
        })
        Swal.fire(
          'Deleted!',
          'Budget Hours has been deleted.',
          'success'
        )
      }
      else {
        this.GetBudgetReport();
      }
    })
  }








}
