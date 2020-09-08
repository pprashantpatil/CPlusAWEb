import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-update-vendor',
  templateUrl: './update-vendor.component.html',
  styleUrls: ['./update-vendor.component.css']
})
export class UpdateVendorComponent implements OnInit {

  public pageMenuTitle;
  public vendor_PageTitle;
  public vendor_BreadChrumb;
  public vendor_Name;
  public vendor_Email;
  public vendor_Phone;
  public vendor_ServiceArea;
  public vendor_Address;
  public vendor_Website;
  public vendor_ContactName;
  public vendor_Type;
  public vendor_BankName;
  public vendor_AccountNumber;
  public vendor_AccountType;
  public vendor_BankAddress;
  public vendor_IFSC;
  public vendor_BranchName;
  public vendor_Payment;
  public vendor_CreditLimit;
  public vendor_CreditDays;
  public vendor_Service;
  public vendor_Supplies;
  public vendor_save;

  public VendorServiceAreaList: any;
  public ServiceTypeList: any;
  public BankTypeList: any;
  public AccountTypeList: any;
  public VendorTypeList: any;

  public selectedlanguage: any;

  public vname: any;
  public EmailID: any;
  public PhoneNo: any;
  public ContactName: any;
  public vendortypeID: any;
  public banktypeID: any;
  public AccountNumber: any;
  public accounttypeID: any;
  public BankAddress: any;
  public SwiftCode: any;
  public BranchName: any;
  public PaymentTerms: any;
  public CreditLimit: any;
  public CreditDays: any;
  public servicetypeID: any;
  public SupplyID: any;
  public Website: any;
  public Address: any;
  public serviceareaID: any;
  public VendorID;
  public buildinglist;
  public BuildingID: any;

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  UserID
  ngOnInit() {
    debugger;
    this.UserID = localStorage.getItem('UserID');
    this.BuildingID=localStorage.getItem('ProjectID');
    this.serviceareaID = 0;
    this.vendortypeID = 0;
    this.banktypeID = 0;
    this.accounttypeID = 0;
    this.servicetypeID = 0;
    this.AccountNumber = "";
    this.BankAddress = "";
    this.BranchName = "";
    this.CreditDays = "";
    this.CreditLimit = "";
    this.PaymentTerms = "";
    this.SwiftCode = "";
  
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetNewvendorLanguage(this.selectedlanguage);
    this.getbuildingList(this.selectedlanguage);
    this.fmsservice.GetVendorServiceAreaMaster(this.selectedlanguage).subscribe(data => {
      this.VendorServiceAreaList = data;
    })

    this.fmsservice.GetServiceType(this.selectedlanguage).subscribe(data => {
      debugger;

      this.ServiceTypeList = data;
    })

    this.fmsservice.GetBankType(this.selectedlanguage).subscribe(data => {

      this.BankTypeList = data;
    })

    this.fmsservice.GetAccountType(this.selectedlanguage).subscribe(data => {

      this.AccountTypeList = data;
    })

    this.fmsservice.GetVendorType(this.selectedlanguage).subscribe(data => {

      this.VendorTypeList = data;
    })

    this.route.params.subscribe(params => {

      this.VendorID = params['id'];
      this.GetVendorByID(this.VendorID);
    }
    );



  }



  GetNewvendorLanguage(id) {
    this.fmsservice.GetNewvendorLanguage(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.vendor_PageTitle = res[0].vendor_PageTitle;
        this.vendor_BreadChrumb = res[0].vendor_BreadChrumb;
        this.vendor_Name = res[0].vendor_Name;
        this.vendor_Email = res[0].vendor_Email;
        this.vendor_Phone = res[0].vendor_Phone;
        this.vendor_ServiceArea = res[0].vendor_ServiceArea;
        this.vendor_Address = res[0].vendor_Address;
        this.vendor_Website = res[0].vendor_Website;
        this.vendor_ContactName = res[0].vendor_ContactName;
        this.vendor_Type = res[0].vendor_Type;
        this.vendor_BankName = res[0].vendor_BankName;
        this.vendor_AccountNumber = res[0].vendor_AccountNumber;
        this.vendor_AccountType = res[0].vendor_AccountType;
        this.vendor_BankAddress = res[0].vendor_BankAddress;
        this.vendor_IFSC = res[0].vendor_IFSC;
        this.vendor_BranchName = res[0].vendor_BranchName;
        this.vendor_Payment = res[0].vendor_Payment;
        this.vendor_CreditLimit = res[0].vendor_CreditLimit;
        this.vendor_CreditDays = res[0].vendor_CreditDays;
        this.vendor_Service = res[0].vendor_Service;
        this.vendor_Supplies = res[0].vendor_Supplies;
        this.vendor_save = res[0].vendor_save;
      }
    )
  }

  public GetVendorByID(ID) {

    this.fmsservice.GetVendorByID(ID).subscribe(
      res => {
        debugger;
        this.vname = res[0].name;
        this.EmailID = res[0].emailID;
        this.PhoneNo = res[0].phoneNo;
        this.ContactName = res[0].contactName;
        this.vendortypeID = res[0].typeID;
        this.banktypeID = res[0].bankID;
        this.AccountNumber = res[0].accountNumber;
        this.accounttypeID = res[0].accountTypeID;
        this.BankAddress = res[0].bankAddress;
        this.SwiftCode = res[0].swiftCode;
        this.BranchName = res[0].branchName;
        this.PaymentTerms = res[0].paymentTerms;
        this.CreditLimit = res[0].creditLimit;
        this.CreditDays = res[0].creditDays;
        this.servicetypeID = res[0].serviceID;
        this.SupplyID = res[0].supplyID;
        this.Website = res[0].website;
        this.Address = res[0].address,
        this.BuildingID=res[0].buildingID
          this.GetVendorTypeID(res[0].typeID);
        this.GetBankTypeID(res[0].bankID);
        this.GetserviceareaID(res[0].serviceArea);
        this.GetAccountTypeID(res[0].accountTypeID);
        this.GetServiceTypeID(res[0].serviceID);


      }
    )
  }




  public GetserviceareaID(even) {

    if (even.target) {
      this.serviceareaID = even.target.value;
    } else {
      this.serviceareaID = even;
    }

  }

  public GetVendorTypeID(even) {

    if (even.target) {
      this.vendortypeID = even.target.value;
    }
    else {
      this.vendortypeID = even;
    }

  }

  public GetBankTypeID(even) {

    if (even.target) {
      this.banktypeID = even.target.value;
    }
    else {
      this.banktypeID = even;
    }

  }

  public GetAccountTypeID(even) {

    if (even.target) {
      this.accounttypeID = even.target.value;
    }
    else {
      this.accounttypeID = even;
    }

  }

  public GetServiceTypeID(even) {
    let yttt = this.ServiceTypeList;
    if (even.target) {
      this.servicetypeID = even.target.value;
    }
    else {
      this.servicetypeID = even;
    }
  }

  public getbuildingList(languageid) {
    debugger;
    this.fmsservice.GetBuildinglist(languageid).subscribe(res => {
      let temp: any = res;
      this.buildinglist = temp;
    })
  }


  EmailValid;
  PhoneNumberValid;
  Isempty = false;
  public insertvendor() {
    var mand = {
      'Name': this.vname,
      'EmailID': this.EmailID,
      'PhoneNo': this.PhoneNo,
      'ContactName': this.ContactName,
      'TypeID': this.vendortypeID,
      //'BankID': this.banktypeID,
      //'AccountNumber': this.AccountNumber,
      //'AccountTypeID': this.accounttypeID,
      //'BankAddress': this.BankAddress,
      //'SwiftCode': this.SwiftCode,
      //'BranchName': this.BranchName,
      //'PaymentTerms': this.PaymentTerms,
      //'CreditLimit': this.CreditLimit,
      //'CreditDays': this.CreditDays,
      'ServiceID': this.servicetypeID,
      'SupplyID': this.SupplyID,
      'Address': this.Address,
      'ServiceArea': this.serviceareaID,
      'UserTypeID': '4',
    }
    let validate = this.fmsservice.isEmpty(mand);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;
      debugger
    }
    else {

      this.EmailValid = this.fmsservice.validateEmail(this.EmailID);
      debugger;
      //this.PhoneNumberValid = this.fmsservice.phonenumber(this.PhoneNo);

      if (this.EmailValid == false || this.PhoneNumberValid == false) {

        debugger;
      } else {
        var Entity =
        {
          'Name': this.vname,
          'EmailID': this.EmailID,
          'PhoneNo': this.PhoneNo,
          'ContactName': this.ContactName,
          'TypeID': this.vendortypeID,
          //'BankID': this.banktypeID,
          //'AccountNumber': this.AccountNumber,
          //'AccountTypeID': this.accounttypeID,
          //'BankAddress': this.BankAddress,
          //'SwiftCode': this.SwiftCode,
          //'BranchName': this.BranchName,
          //'PaymentTerms': this.PaymentTerms,
          //'CreditLimit': this.CreditLimit,
          //'CreditDays': this.CreditDays,
          'ServiceID': this.servicetypeID,
          'SupplyID': this.SupplyID,
          'Website': this.Website,
          'Address': this.Address,
          'ServiceArea': this.serviceareaID,
          'UserTypeID': '4',
          'LanguageID': this.selectedlanguage,
          'BuildingID': this.BuildingID
        }

        this.fmsservice.InsertVendor(Entity).subscribe(data => {
          if (data != undefined) {
            Swal.fire('Vendor added Successfully');
            this.Clear();
            location.href='#/Vendor'
            this.InsertLoginDetails();

          }
        })
      }
    }
  }

  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Vendor ' + this.vname + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Vendor",
      "Action": 'Add New Vendor',
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
      "ApplicationName": 'Vendor ' + this.vname + ' Updated',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Vendor",
      "Action": 'Update Vendor',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  public Clear() {
    this.vname = "",
      this.EmailID = "",
      this.PhoneNo = "",
      this.ContactName = "",
      this.vendortypeID = 0,
      this.banktypeID = 0,
      this.AccountNumber = "",
      this.accounttypeID = 0,
      this.BankAddress = "",
      this.SwiftCode = "",
      this.BranchName = "",
      this.PaymentTerms = "",
      this.CreditLimit = "",
      this.CreditDays = "",
      this.servicetypeID = 0,
      this.SupplyID = "",
      this.Website = "",
      this.Address = "",
      this.serviceareaID = 0
    this.selectedlanguage = 0
  }

  public UpdateVendor() {
    var mand = {
      'Name': this.vname,
      'EmailID': this.EmailID,
      'PhoneNo': this.PhoneNo,
      'ContactName': this.ContactName,
      'TypeID': this.vendortypeID,
      'ServiceArea': this.serviceareaID,
      'UserTypeID': '4',


    }
    let validate = this.fmsservice.isEmpty(mand);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;
      debugger
    } else {
      this.EmailValid = this.fmsservice.validateEmail(this.EmailID);
      debugger;
      //this.PhoneNumberValid = this.fmsservice.phonenumber(this.PhoneNo);
      if (this.EmailValid == false || this.PhoneNumberValid == false) {
        debugger;
      } else {
        var Entity =
        {
          'Name': this.vname,
          'EmailID': this.EmailID,
          'PhoneNo': this.PhoneNo,
          'ContactName': this.ContactName,
          'TypeID': this.vendortypeID,
          'BankID': this.banktypeID,
          'AccountNumber': this.AccountNumber,
          'AccountTypeID': this.accounttypeID,
          'BankAddress': this.BankAddress,
          'SwiftCode': this.SwiftCode,
          'BranchName': this.BranchName,
          'PaymentTerms': this.PaymentTerms,
          'CreditLimit': this.CreditLimit,
          'CreditDays': this.CreditDays,
          'ServiceID': this.servicetypeID,
          'SupplyID': this.SupplyID,
          'Website': this.Website,
          'Address': this.Address,
          'ServiceArea': this.serviceareaID,
          'UserTypeID': '4',
          'LanguageID': this.selectedlanguage,
          'BuildingID': this.BuildingID
        }
        this.fmsservice.UpdateVendor(this.VendorID, Entity).subscribe(res => {

          Swal.fire('Supplier Details Updated Successfully!');
          location.href='#/Vendor'
          this.InsertLoginDetails1();

        })
      }

    }

  }

}
