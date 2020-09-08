import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ExportToCsv } from 'export-to-csv';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.css']
})
export class CompanyDashboardComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }
  BuildingSearch: any;
  ngOnInit() {
    this.GetCompanyDetails();
  }

  CompanyLists: any;
  public GetCompanyDetails() {
    this.fmsservice.GetCompanyDetails().subscribe(
      res => {
        debugger;
        this.CompanyLists = res;
      }
    )
  }

  confirmButtonText: any;
  public DeleteCompany(evn) {
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
          this.DeleteCompany1(evn);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )

      }
    })
  }

  public DeleteCompany1(ID) {
    debugger;
    //this.EventPlannerEntity.LanguageID=Number(localStorage.getItem('selectedLanguageID'))
    // let test = this.AssetsEntity;
    this.fmsservice.DeleteCompany(ID).subscribe(res => {
      debugger;
      this.GetCompanyDetails();
    })
  }



  public DisableCompanyLogin(id) {
    debugger;
    this.fmsservice.DeleteCompany(id).subscribe(
      data => {
        debugger
        Swal.fire('Disabled', ' Company has been Disabled');
        this.GetCompanyDetails();

      }, error => {
      }
    )
  }

  public EnableCompanyLogin(id) {
    debugger;
    this.fmsservice.EnableCompany(id).subscribe(
      data => {
        debugger
        Swal.fire('Enabled', ' Company has been Enabled');
        this.GetCompanyDetails();

      }, error => {
      }
    )
  }

}
