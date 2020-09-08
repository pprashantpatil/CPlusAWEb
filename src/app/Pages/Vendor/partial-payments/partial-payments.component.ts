import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-partial-payments',
  templateUrl: './partial-payments.component.html',
  styleUrls: ['./partial-payments.component.css']
})
export class PartialPaymentsComponent implements OnInit {
  options: NgDateRangePickerOptions;

  public pageMenuTitle;
  public partialPayments_PageTitle;
  public partialPayments_BreadChrumb;
  public partialPayments_SelectDate;
  public partialPayments_SelectVendor;
  public partialPayments_SelectCredits;
  public partialPayments_InvoiceNumber;
  public partialPayments_VendorName;
  public partialPayments_Date;
  public partialPayments_Total;
  public partialPayments_Paid;
  public partialPayments_Amount;
  public partialPayments_Status;
  public partialPayments_Pay;
  public partialPayments_PaymentType;
  public partialPayments_SectionTotal;
  public partialPayments_SectionPayable;
  public partialPayments_SectionPay;

  public VendorPurchase;
  public FilteredVendorPurchase;
  public Credits;
  public VendorPartialPaymentsList;
  public totalAmount;
  public PaymentTypelist;
  public ChequeID;
  public invoiceNo;
  public partialpaymentEntity={
    InvoiceNo:"",
    PaidAmount:"",
    Chequeno:"",
    PaymentTypeID:0,
    BankName:""
  }


  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,

    };

    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetPartialPaymentsLanguage(selectedlanguage);
    this.GetVendorForPurchase(selectedlanguage);
    this.GetVendorPartialPayments();
    this.GetPaymentType(selectedlanguage);
  }


  GetPartialPaymentsLanguage(id) {
    this.fmsservice.GetPartialPaymentsLanguage(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.partialPayments_PageTitle = res[0].partialPayments_PageTitle;
        this.partialPayments_BreadChrumb = res[0].partialPayments_BreadChrumb;
        this.partialPayments_SelectDate = res[0].partialPayments_SelectDate;
        this.partialPayments_SelectVendor = res[0].partialPayments_SelectVendor;
        this.partialPayments_SelectCredits = res[0].partialPayments_SelectCredits;
        this.partialPayments_InvoiceNumber = res[0].partialPayments_InvoiceNumber;
        this.partialPayments_VendorName = res[0].partialPayments_VendorName;
        this.partialPayments_Date = res[0].partialPayments_Date;
        this.partialPayments_Total = res[0].partialPayments_Total;
        this.partialPayments_Paid = res[0].partialPayments_Paid;
        this.partialPayments_Amount = res[0].partialPayments_Amount;
        this.partialPayments_Status = res[0].partialPayments_Status;
        this.partialPayments_Pay = res[0].partialPayments_Pay;
        this.partialPayments_PaymentType = res[0].partialPayments_PaymentType;
        this.partialPayments_SectionTotal = res[0].partialPayments_SectionTotal;
        this.partialPayments_SectionPayable = res[0].partialPayments_SectionPayable;
        this.partialPayments_SectionPay = res[0].partialPayments_SectionPay;
      }

    )
  }

  public GetVendorForPurchase(languageid) {
    this.fmsservice.GetVendorForPurchase(languageid).subscribe(
      res => {
        debugger;
        this.VendorPurchase = res;
        this.FilteredVendorPurchase = this.VendorPurchase;
      }
    )
  }

  public vendorCredits(evn,VendorPurchase) {
    debugger;
    let vc = evn.target.value;


    this.FilteredVendorPurchase = this.VendorPurchase.filter(x => x.id == vc);
    this.Credits = this.FilteredVendorPurchase[0].vendorCredits;
    if (evn.target.value == "none") {
      this.FilteredVendorPartialPaymentsList = this.VendorPartialPaymentsList.filter(x=>x.status=='Partial');
    }
    else {
      let selectedBuilding = evn.target.value;
      this.FilteredVendorPartialPaymentsList = this.VendorPartialPaymentsList.filter(x => x.vendorID == selectedBuilding  && x.status=='Partial');
     // this.PendingVendorPaymentsList = this.FilteredVendorPaymentsList.filter(x => x.status == this.Status);
    }
  }


    
  public FilteredVendorPartialPaymentsList;
  public GetVendorPartialPayments() {
    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');
    this.fmsservice.GetVendorPartialPayments("2019-01-01", "2019-12-31").subscribe(
      res => {
        debugger;
        this.VendorPartialPaymentsList = res;
        this.FilteredVendorPartialPaymentsList= this.VendorPartialPaymentsList.filter(x =>  x.status=='Pending'); 
      }
    )
  }

  public vendorName;
  public CheckedForPartialPayments(evn) {
    debugger;
    this.totalAmount=evn.grandTotal;
    this.invoiceNo=evn.invoiceNo;
    this.partialpaymentEntity.InvoiceNo=this.invoiceNo;
    this.vendorName=evn.vendorName;

  }
    
  public GetPaymentType(languageid) {
    this.fmsservice.GetPaymentType(languageid).subscribe(
      res => {
        debugger;
        this.PaymentTypelist = res;
      }
    )
  }

  public PaymentBasedTextBox(evn){
    debugger;
    this.ChequeID=evn.target.value;
  }


  public UpdatePurchasePayment() {
    debugger;
    //this.partialpaymentEntity.LanguageID=Number(localStorage.getItem('selectedLanguageID'))
    this.fmsservice.UpdatePurchasePayment(this.partialpaymentEntity).subscribe(res => {
      debugger;
      Swal.fire('Vendor Payments Done Successfully');
      this.savenotification();
      this.GetVendorPartialPayments();
      this.Clear();

    })
  }

  public Clear(){
    this.partialpaymentEntity.InvoiceNo="",
    this.partialpaymentEntity.PaidAmount="",
    this.partialpaymentEntity.Chequeno="",
    this.partialpaymentEntity.PaymentTypeID=0,
    this.partialpaymentEntity.BankName="",
    this.totalAmount=""
  }

  date = new Date();
  public savenotification() {
    let notification = {
      Date: this.date,
      Event: 'Partial Payment',
      FromUser: localStorage.getItem('username'),
      ToUser: this.vendorName,
      Message: 'Partial Payment made to ' + this.vendorName,
      Photo: 'photo',
      Building: 'NA',
    };
    this.fmsservice.InsertNotification(notification).subscribe(
      res => {
        debugger;
      }
    )

  }

}
