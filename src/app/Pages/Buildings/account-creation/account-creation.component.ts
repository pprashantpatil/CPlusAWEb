import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ExportToCsv } from 'export-to-csv';
import { stringify } from '@angular/compiler/src/util';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account-creation',
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.css']
})
export class AccountCreationComponent implements OnInit {

  constructor(public fmsservice: FmsService, public router: Router, public datepipe: DatePipe) { }

  ngOnInit() {
    this.GetAllAccount_Creation();

  }
  AccountsLists;
  public GetAllAccount_Creation() {
    this.fmsservice.GetAllAccount_Creation().subscribe(
      res => {
        debugger;
        this.AccountsLists = res;
      }
    )
  }

  public EditAccounts(evn) {
    debugger;
    let AccountsID = evn.id;
    this.router.navigate(['/NewAccountCreation', AccountsID]);
  }

  confirmButtonText
  public DeleteAccounts(evn) {
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
          this.DeleteAccount_Creation(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }

  public DeleteAccount_Creation(ID) {
    debugger;
    //this.EventPlannerEntity.LanguageID=Number(localStorage.getItem('selectedLanguageID'))
    // let test = this.AssetsEntity;
    this.fmsservice.DeleteAccount_Creation(ID).subscribe(res => {
      debugger;
      this.GetAllAccount_Creation();
    })
  }



}
