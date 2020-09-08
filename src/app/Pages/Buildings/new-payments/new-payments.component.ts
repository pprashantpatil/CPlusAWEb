import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-payments',
  templateUrl: './new-payments.component.html',
  styleUrls: ['./new-payments.component.css']
})
export class NewPaymentsComponent implements OnInit {

  public newPaymentLanguageTitle;
  public pageMenuTitle;
  public newPayment_PaymentFor;
  public newPayment_PaymentTo;
  public newPayment_PaymentDate;
  public newPayment_PaymentTime;
  public newPayment_Building;
  public newPayment_Address;
  public newPayment_Bill;
  public newPayment_TotalAmount;
  public newPayment_PaymentType;
  public newPayment_Comments;
  public newPayment_Document;
  public newPayment_Save;
  public newPayment_BreadChrumb;
  selectedlanguage: any;
  Paymentlist: any;
  Buildinglist: any;
  BuildingID: any;
  BuildAddrress: any;

  pyamentfor: any;



  paymentto: any;
  time: any;
  buildaddress: any;
  bill: any;
  totalamount: any;
  paymenttype: any;
  Chequeno: any;
  bankname: any;
  paymenttypeID: any;
  PaymentFor: any;
  comments: any;
  CNumber: any;
  cardtypeID: any;
  Paymenttype: any;
  FileName: any;
  FileType: any;
  base64textString: any;
  Currencylist: any;
  Currency: any;
  currencytype: any

  Transaction: any;
  Isempty: any;

  minDate: Date;
  minDate2: Date;
  otherpaymentto: any;
  paramID: any;
  paymentdetailslist: any;
  Building1: any;
  currency1: any;
  paytype: any;

  ////====Date Formate====////
  Date: any;
  DateChanged: boolean = false;

  Date2: any;
  DateChanged2: boolean = false;


  constructor(public fmsservice: FmsService, public activatedRoute: ActivatedRoute, private datePipe: DatePipe) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 0);

    this.minDate2 = new Date();
    this.minDate2.setDate(this.minDate2.getDate() - 0);
  }

  ngOnInit() {



    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetNewPaymentLanguage(this.selectedlanguage);

    this.fmsservice.GetCurrencyType().subscribe(data => {
      debugger

      this.Currencylist = data;
    })

    this.fmsservice.GetPaymentsFor(this.selectedlanguage).subscribe(data => {
      debugger

      this.Paymentlist = data;
    })

    this.fmsservice.GetBuildinglist1(this.selectedlanguage).subscribe(data => {
      debugger
      this.Buildinglist = data;
    })

    this.fmsservice.GetPaymentType(this.selectedlanguage).subscribe(data => {
      debugger
      this.paymenttype = data;
    })


    this.paramID = this.activatedRoute.snapshot.params['id']
    debugger

    if (this.paramID != null || this.paramID != undefined) {

      this.fmsservice.GetBuildingPaymentsID(this.paramID).subscribe(data => {
        debugger

        this.paymentdetailslist = data
        this.pyamentfor = this.paymentdetailslist[0].paymentFor
        this.PaymentFor = this.paymentdetailslist[0].paymentFor
        this.otherpaymentto = this.paymentdetailslist[0].otherpaymentfor
        this.paymentto = this.paymentdetailslist[0].paymentTo
        this.Date = this.paymentdetailslist[0].paymentDate
        this.Building1 = this.paymentdetailslist[0].buildingID
        this.BuildAddrress = this.paymentdetailslist[0].location
        this.bill = this.paymentdetailslist[0].billNo
        this.totalamount = this.paymentdetailslist[0].totalAmount
        this.currency1 = this.paymentdetailslist[0].paymentFor
        this.paymenttypeID = this.paymentdetailslist[0].paymentType
        this.paytype = this.paymentdetailslist[0].paymentType
        this.Transaction = this.paymentdetailslist[0].transactionID
        this.Chequeno = this.paymentdetailslist[0].chequeNo
        this.Date2 = this.paymentdetailslist[0].chech_Trans_Date
        this.bankname = this.paymentdetailslist[0].bankName
        this.CNumber = this.paymentdetailslist[0].cardNumber
        this.comments = this.paymentdetailslist[0].comments

        debugger

      });

    }

  }

  GetpaymenttypeID(pay) {
    debugger
    this.paymenttypeID = pay.target.value;
    debugger
  }




  getbuildingID(eve) {
    debugger

    this.BuildingID = eve.target.value;

    var Building = this.Buildinglist.filter(X => X.id == this.BuildingID)

    this.BuildAddrress = Building[0].address
    debugger
  }

  DateChange() {
    debugger
    this.DateChanged = true;
    this.Date.toLocaleDateString();
    var date = this.Date.getFullYear() + '-' + (this.Date.getMonth() + 1) + '-' + this.Date.getDate();
    this.Date = date;
    debugger
    console.log(this.Date)

  }

  DateChange2() {
    debugger
    this.DateChanged2 = true;
    this.Date2.toLocaleDateString();
    var date2 = this.Date2.getFullYear() + '-' + (this.Date2.getMonth() + 1) + '-' + this.Date2.getDate();
    this.Date2 = date2;
    debugger
    console.log(this.Date2)

  }

  public GetNewPaymentLanguage(languageid) {
    this.fmsservice.GetNewPaymentLanguage(languageid).subscribe(
      res => {
        debugger;
        this.newPaymentLanguageTitle = res[0].newPaymentLanguageTitle;
        this.newPayment_BreadChrumb = res[0].newPayment_BreadChrumb;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.newPayment_PaymentFor = res[0].newPayment_PaymentFor;
        this.newPayment_PaymentTo = res[0].newPayment_PaymentTo;
        this.newPayment_PaymentDate = res[0].newPayment_PaymentDate;
        this.newPayment_PaymentTime = res[0].newPayment_PaymentTime;
        this.newPayment_Building = res[0].newPayment_Building;
        this.newPayment_Address = res[0].newPayment_Address;
        this.newPayment_Bill = res[0].newPayment_Bill;
        this.newPayment_TotalAmount = res[0].newPayment_TotalAmount;
        this.newPayment_PaymentType = res[0].newPayment_PaymentType;
        this.newPayment_Comments = res[0].newPayment_Comments;
        this.newPayment_Document = res[0].newPayment_Document;
        this.newPayment_Save = res[0].newPayment_Save;
        this.Currency = res[0].currency;
      }
    )
  }

  GetPayment(paymentfor) {
    debugger

    this.PaymentFor = paymentfor.target.value;
  }

  getcardttype(getcardttype) {
    debugger
    this.cardtypeID = getcardttype.target.value;
  }


  handleFileSelect(evt) {
    debugger
    //console.log(evt);
    var File = evt.target.value;
    // console.log(File);
    let subStringData = File.substr(12, 10000);
    //console.log(X);
    var FileName = subStringData.split('.')[0];
    var FileType = subStringData.split('.')[1];
    console.log(FileName);
    console.log(FileType);
    this.FileName = FileName;
    this.FileType = FileType;
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }


  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(this.base64textString);
  }

  Getcurrencytype1(Getcurrencytype) {
    debugger
    this.currencytype = Getcurrencytype.target.value;

  }


  InsertBuildingPayments() {
    debugger
    var mand = {

      "PaymentTo": this.paymentto,
      "PaymentFor": this.PaymentFor,
      "PaymentDate": this.Date,
      "BuildingID": this.BuildingID,
      "Location": this.BuildAddrress,
      "BillNo": this.bill,
      "TotalAmount": this.totalamount,
      "currencytype": this.currencytype,
      "PaymentType": this.paymenttypeID,
      'FileType': this.FileType,
    }
    debugger

    let validate = this.fmsservice.isEmpty(mand);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;


      debugger
    }


    else {

      var entity = {

        "PaymentTo": this.paymentto,
        "PaymentFor": this.PaymentFor,
        'otherpaymentfor': this.otherpaymentto != undefined ? this.otherpaymentto : null,
        "PaymentDate": this.Date,
        "PaymentTime": '10:00',
        "BuildingID": this.BuildingID != undefined ? this.BuildingID : this.Building1,
        "Location": this.BuildAddrress,
        "BillNo": this.bill,
        "TotalAmount": this.currencytype + ':' + this.totalamount,
        "PaymentType": this.paymenttypeID,
        "Comments": this.comments != undefined ? this.comments : 'No Comments',
        "Chequeno": this.Chequeno != undefined ? this.Chequeno : null,
        "CardNumber": this.CNumber != undefined ? this.CNumber : null,
        "BankName": this.bankname != undefined ? this.bankname : null,
        // this.buildingphoto   this.base64textString !=undefined?this.base64textString :this.coursePhoto,
        "CardType": this.cardtypeID != undefined ? this.cardtypeID : null,
        'FileName': this.FileName,
        'FileType': this.FileType,
        'modifieddate': new Date(),
        'Base64Data': this.base64textString,
        'LanguageID': this.selectedlanguage,
        'TransactionID': this.Transaction,
        'Chech_Trans_Date': this.Date2 != undefined ? this.Date2 : '2019-08-03',
      };

      debugger
      this.fmsservice.InsertBuildingPayments(entity).subscribe(data => {
        if (data != undefined) {
          this.InsertLoginDetails();
          Swal.fire("Payment Saved Successfully ")
          this.clear();
        }
      });
    }

  }

  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Building Payments done by' + localStorage.getItem("username"),
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Building Payments",
      "Action": 'Add New Building Payments',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        this.clear();
      }
    })

  }



  updateBuildingPayments() {
    debugger
    var mand = {
      "PaymentTo": this.paymentto,
      "PaymentFor": this.PaymentFor,
      "PaymentDate": this.Date,
      "BuildingID": this.BuildingID != undefined ? this.BuildingID : this.Building1,

      "BillNo": this.bill,
      "TotalAmount": this.totalamount,

      "PaymentType": this.paymenttypeID,

    }
    debugger

    let validate = this.fmsservice.isEmpty(mand);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;


      debugger
    }


    else {

      var entity = {
        "ID": this.paramID,
        "PaymentTo": this.paymentto,
        "PaymentFor": this.PaymentFor != undefined ? this.PaymentFor : this.pyamentfor,
        'otherpaymentfor': this.otherpaymentto != undefined ? this.otherpaymentto : null,
        "PaymentDate": this.Date,
        "PaymentTime": '10:00',
        "BuildingID": this.BuildingID != undefined ? this.BuildingID : this.Building1,
        "Location": this.BuildAddrress,
        "BillNo": this.bill,
        "TotalAmount": this.totalamount,
        "PaymentType": this.paymenttypeID,
        "Comments": this.comments != undefined ? this.comments : 'No Comments',
        "Chequeno": this.Chequeno != undefined ? this.Chequeno : null,
        "CardNumber": this.CNumber != undefined ? this.CNumber : null,
        "BankName": this.bankname != undefined ? this.bankname : null,
        // this.buildingphoto   this.base64textString !=undefined?this.base64textString :this.coursePhoto,
        "CardType": this.cardtypeID != undefined ? this.cardtypeID : null,
        'LanguageID': this.selectedlanguage,
        'TransactionID': Number(this.Transaction),
        'Chech_Trans_Date': this.Date2 != undefined ? this.Date2 : '2019-08-03',
      };

      debugger
      this.fmsservice.UpdateBuildingPayments(entity).subscribe(data => {
        if (data != undefined) {

          Swal.fire("Payment Updated Successfully ")
          this.InsertLoginDetails1();
          this.clear();


        }
      });
    }
  }


  InsertLoginDetails1() {
    debugger
    var obj = {
      "ApplicationName": 'Building Payments done by ' + localStorage.getItem("username"),
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Building Payments",
      "Action": 'Update Building Payments',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        this.clear();
      }
    })

  }

  clear() {
    debugger
    this.paymentto = '',
      this.PaymentFor = '',
      this.Date = '',
      this.time = '',
      this.BuildingID = '',
      this.BuildAddrress = '',
      this.bill = '',
      this.currencytype = '',
      this.totalamount = '',
      this.paymenttypeID = '',
      this.comments = '',
      this.Chequeno = '',
      this.CNumber = '',
      this.bankname = '',
      this.cardtypeID = '',
      this.FileName = '',
      this.FileType = ''

  }



}
