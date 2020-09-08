import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { document } from 'ngx-bootstrap';


@Component({
  selector: 'app-new-account-details',
  templateUrl: './new-account-details.component.html',
  styleUrls: ['./new-account-details.component.css']
})
export class NewAccountDetailsComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  public AccountsEntity = {
    AccountName: "",
    Account_Industry: "",
    Account_Contact_Name: "",
    Phone_No: 0,
    Email: "",
    Address: "",
    BankName: "",
    Bank_Account_no: 0,
    Bank_Account_type: 0,
    ShiftCode: 0,
    TaxIdenficatoin: ""
  }

  AccountID;
  ngOnInit() {
    this.GetAccountTypelist(1);
    this.route.params.subscribe(params => {
      debugger;
      this.AccountID = params['id'];
      if (params['id'] != undefined) {
        this.AccountID = params['id'];
        this.GetAccount_CreationByID(this.AccountID);

      }

    }
    );
  }


  bankAccountTypelist
  public GetAccountTypelist(languageid) {
    this.fmsservice.GetAccountTypelist(languageid).subscribe(res => {
      this.bankAccountTypelist = res;
    })
  }




  public GetAccount_CreationByID(ID) {
    this.fmsservice.GetAccount_CreationByID(ID).subscribe(res => {
      debugger;
      this.AccountsEntity.AccountName = res[0].accountName;
      this.AccountsEntity.Account_Industry = res[0].account_Industry;
      this.AccountsEntity.Account_Contact_Name = res[0].account_Contact_Name;
      this.AccountsEntity.Phone_No = res[0].phone_No;
      this.AccountsEntity.Email = res[0].email;
      this.AccountsEntity.Address = res[0].address;
      this.AccountsEntity.BankName = res[0].bankName;
      this.AccountsEntity.Bank_Account_no = res[0].bank_Account_no;
      this.AccountsEntity.Bank_Account_type = res[0].bank_Account_type;
      this.AccountsEntity.ShiftCode = res[0].shiftCode;
      this.AccountsEntity.TaxIdenficatoin = res[0].taxIdenficatoin;

    })
  }




  public InsertAccount_Creation() {
    debugger;
    this.fmsservice.InsertAccount_Creation(this.AccountsEntity).subscribe(res => {
      debugger;
      Swal.fire('Your Account Has Created Successfully');
      this.Clear();

    })

  }


  public UpdateAccount_Creation() {
    this.fmsservice.UpdateAccount_Creation(this.AccountID, this.AccountsEntity).subscribe(res => {
      debugger;
      Swal.fire('Accounts Details Updated Successfully!');
    })
  }


  public Clear() {
    this.AccountsEntity.AccountName = "",
      this.AccountsEntity.Account_Industry = "",
      this.AccountsEntity.Account_Contact_Name = "",
      this.AccountsEntity.Phone_No = 0,
      this.AccountsEntity.Email = "",
      this.AccountsEntity.Address = "",
      this.AccountsEntity.BankName = "",
      this.AccountsEntity.Bank_Account_no = 0,
      this.AccountsEntity.Bank_Account_type = 0,
      this.AccountsEntity.ShiftCode = 0,
      this.AccountsEntity.TaxIdenficatoin = ""
  }




}
