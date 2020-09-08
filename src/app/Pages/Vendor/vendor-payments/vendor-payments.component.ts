import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ExportToCsv } from 'export-to-csv';
import { stringify } from '@angular/core/src/util';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-vendor-payments',
  templateUrl: './vendor-payments.component.html',
  styleUrls: ['./vendor-payments.component.css']
})
export class VendorPaymentsComponent implements OnInit {
  pickeroptions: NgDateRangePickerOptions;
  options: { theme: string; range: string; dayNames: string[]; presetNames: string[]; dateFormat: string; outputFormat: string; startOfWeek: number; };

  public pageMenuTitle;
  public vendor_PageTitle;
  public vendor_BreadChrumb;
  public vendor_SelectDate;
  public vendor_SelectVendor;
  public vendor_SelectCredits;
  public vendor_InvoiceNumber;
  public vendor_Type;
  public vendor_VendorName;
  public vendor_Date;
  public vendor_TotAmount;
  public vendor_Status;
  public vendor_Aging;
  public vendor_Invoice;
  public vendor_Pay;
  public vendor_VenName;
  public vendor_NetAmount;
  public vendor_TotalAmount;
  public vendor_UseCredit;
  public vendor_Payable;
  public vendor_PaySave;
  public VendorPurchase;
  public FilteredVendorPurchase;
  public Credits;
  public VendorPaymentsList;
  public VendorID;
  public PaymentTypelist;
  public ChequeID;
  public NetAmount;
  public TotalAmount;
  public InvoiceNo;
  public VendorPaymentsEntity = {
    LanguageID: 0,
    PaymentTypeID: 0,
    TotalAmount: 0,
    PaidAmount: 0,
    ModifiedBy: "",
    InvoiceNo: "",
    VendorID: 0,
    VendorUsedCredits: 0,
    Chequeno: "",
    BankName: "",
    Comment: ""
  }

  public partialpaymentEntity = {
    InvoiceNo: "",
    PaidAmount: 0,
    Chequeno: "",
    PaymentTypeID: 0,
    BankName: "",
    Comment: ''
  }

  public FilteredVendorPaymentsList;
  public VendorPartialPaymentsList;
  FilteredVendorPartialPaymentsList;

  public AllPayments = [];
  public FilteredAllpayments = [];
  Comment: string;
  datelist = [];
  constructor(public fmsservice: FmsService, private datePipe: DatePipe, private route: ActivatedRoute) { }
  value: any;
  POID: any;
  ngOnInit() {
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetVendorPaymentsLanguage(selectedlanguage);
    this.GetVendorForPurchase(selectedlanguage);
    this.GetVendorPaymentDashboard();
    this.GetPaymentType(selectedlanguage);
    //this.GetPaymentType1(selectedlanguage);

    this.route.params.subscribe(params => {

      this.POID = params['id'];
      if (params['id'] != undefined) {
        this.POID = params['id'];

      }
    }
    );
  }


  startdate;
  enddate;
  selectedDate(value) {
    this.datelist.pop()
    debugger
    this.datelist = value.split('-')

    this.startdate = this.datelist[0]
    this.enddate = this.datelist[1]

    this.FilteredAllpayments.length = 0;

    for (let i = 0; i < this.AllPayments.length; i++) {

      var paymentdate = this.AllPayments[i].date.substr(0, this.AllPayments[i].date.indexOf('T'));
      paymentdate = paymentdate.replace(/-/g, '/');
      var d1 = this.startdate.split("/");
      var d2 = this.enddate.split("/");
      var c = paymentdate.split("/");
      var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  // -1 because months are from 0 to 11
      var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
      var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

      if (check >= from && check <= to) {

        this.FilteredAllpayments.push(this.AllPayments[i]);
        let total1 = 0;
        this.FilteredAllpayments.forEach(element => {
          total1 += Number(element.grandTotal);
        });
        this.Grandtotal = total1.toLocaleString();


      }

    }


  }

  GetVendorPaymentsLanguage(id) {
    this.fmsservice.GetVendorPaymentsLanguage(id).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.vendor_PageTitle = res[0].vendor_PageTitle;
        this.vendor_BreadChrumb = res[0].vendor_BreadChrumb;
        this.vendor_SelectDate = res[0].vendor_SelectDate;
        this.vendor_SelectVendor = res[0].vendor_SelectVendor;
        this.vendor_SelectCredits = res[0].vendor_SelectCredits;
        this.vendor_InvoiceNumber = res[0].vendor_InvoiceNumber;
        this.vendor_Type = res[0].vendor_Type;
        this.vendor_VendorName = res[0].vendor_VendorName;
        this.vendor_Date = res[0].vendor_Date;
        this.vendor_TotAmount = res[0].vendor_TotAmount;
        this.vendor_Status = res[0].vendor_Status;
        this.vendor_Aging = res[0].vendor_Aging;
        this.vendor_Invoice = res[0].vendor_Invoice;
        this.vendor_Pay = res[0].vendor_Pay;
        this.vendor_VenName = res[0].vendor_VenName;
        this.vendor_NetAmount = res[0].vendor_NetAmount;
        this.vendor_TotalAmount = res[0].vendor_TotalAmount;
        this.vendor_UseCredit = res[0].vendor_UseCredit;
        this.vendor_PaySave = res[0].vendor_PaySave;
      }

    )
  }

  public GetVendorForPurchase(languageid) {
    this.fmsservice.GetVendorForPurchase(languageid).subscribe(
      res => {

        this.VendorPurchase = res;
        this.FilteredVendorPurchase = this.VendorPurchase.filter(x => x.status == 'Pending');
      }
    )
  }
  public PendingVendorPaymentsList;
  public Status;
  public vendorCredits(evn) {

    let vc = evn.target.value;
    if (vc == "none") {
      this.FilteredVendorPaymentsList = this.VendorPaymentsList;
      
    }
    else {
      this.FilteredVendorPurchase = this.VendorPurchase.filter(x => x.id == vc);
      this.Credits = this.FilteredVendorPurchase[0].vendorCredits;
      if (evn.target.value == "none") {
        this.FilteredVendorPaymentsList = this.VendorPaymentsList.filter(x => x.status == 'Pending');
      }
      else {
        let selectedBuilding = evn.target.value;
        this.FilteredVendorPaymentsList = this.VendorPaymentsList.filter(x => x.vendorID == selectedBuilding && x.status == 'Pending');
      }
    }

  }


  public GetVendorPaymentDashboard() {
    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();

    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');
    this.fmsservice.GetVendorPaymentDashboard("2020-01-01", "2020-12-31").subscribe(
      res => {
        debugger;
        this.VendorPaymentsList = res;
        this.FilteredVendorPaymentsList = this.VendorPaymentsList.filter(x => x.status == 'Pending');
        this.fmsservice.GetVendorPartialPayments("2020-01-01", "2020-12-31").subscribe(
          res => {
            debugger;
            this.VendorPartialPaymentsList = res.filter(x => x.invoiceNo != 'INVPEST');
            this.FilteredVendorPartialPaymentsList = this.VendorPartialPaymentsList.filter(x => x.status == 'Pending');

            //merging logic

            for (let i = 0; i < this.FilteredVendorPaymentsList.length; i++) {


              let AllPayment = {
                vendorID: 0,
                invoiceNo: String,
                vendorName: String,
                phoneNo: 0,
                date: Date,
                grandTotal: 0,
                status: String,
                aging: 0,
                paidAmount: 0,
                attachment: String,
                amounttopay: 0,
                netTotal: 0
              }
              AllPayment.vendorID = this.FilteredVendorPaymentsList[i].vendorID;
              AllPayment.invoiceNo = this.FilteredVendorPaymentsList[i].invoiceNo;
              AllPayment.vendorName = this.FilteredVendorPaymentsList[i].vendorName;
              AllPayment.phoneNo = this.FilteredVendorPaymentsList[i].phoneNo;
              AllPayment.date = this.FilteredVendorPaymentsList[i].date;
              AllPayment.grandTotal = this.FilteredVendorPaymentsList[i].grandTotal;
              AllPayment.status = this.FilteredVendorPaymentsList[i].status;
              AllPayment.aging = this.FilteredVendorPaymentsList[i].aging;
              AllPayment.paidAmount = this.FilteredVendorPaymentsList[i].paidAmount;
              AllPayment.attachment = this.FilteredVendorPaymentsList[i].attachment;
              AllPayment.netTotal = this.FilteredVendorPaymentsList[i].netTotal;
              AllPayment.amounttopay = 0;
              this.AllPayments.push(AllPayment);
              this.FilteredAllpayments.push(AllPayment);
              let total1 = 0;
              this.FilteredAllpayments.forEach(element => {
                total1 += Number(element.grandTotal);
              });
              this.Grandtotal = total1.toLocaleString();
            }
            debugger;
            for (let i = 0; i < this.VendorPartialPaymentsList.length; i++) {

              if (this.VendorPartialPaymentsList[i].totalAmount != this.VendorPartialPaymentsList[i].paidAmount) {
                this.VendorPartialPaymentsList[i].status = "Partial";
              }
              let AllPayment = {
                vendorID: 0,
                invoiceNo: String,
                vendorName: String,
                phoneNo: 0,
                date: Date,
                grandTotal: 0,
                status: String,
                aging: 0,
                paidAmount: 0,
                attachment: String,
                amounttopay: 0,
                netTotal: 0
              }
              AllPayment.vendorID = this.VendorPartialPaymentsList[i].vendorID;
              AllPayment.invoiceNo = this.VendorPartialPaymentsList[i].invoiceNo;
              AllPayment.vendorName = this.VendorPartialPaymentsList[i].vendorName;
              AllPayment.phoneNo = this.VendorPartialPaymentsList[i].phoneNo;
              AllPayment.date = this.VendorPartialPaymentsList[i].date;
              AllPayment.grandTotal = this.VendorPartialPaymentsList[i].totalAmount;
              AllPayment.status = this.VendorPartialPaymentsList[i].status;
              AllPayment.aging = this.VendorPartialPaymentsList[i].aging;
              AllPayment.paidAmount = this.VendorPartialPaymentsList[i].paidAmount;
              AllPayment.attachment = this.VendorPartialPaymentsList[i].attachment;
              AllPayment.amounttopay = this.VendorPartialPaymentsList[i].grandTotal;
              AllPayment.netTotal = this.VendorPartialPaymentsList[i].netTotal;
              this.AllPayments.push(AllPayment);
              this.FilteredAllpayments.push(AllPayment);
              let total1 = 0;
              this.FilteredAllpayments.forEach(element => {
                total1 += Number(element.grandTotal);
              });
              this.Grandtotal = total1.toLocaleString();
            }
            debugger;
          }
        )
      }
    )
  }
  Grandtotal
  // PartialPaymentTypelist
  public GetPaymentType(languageid) {

    this.fmsservice.GetPaymentType(languageid).subscribe(
      res => {

        this.PaymentTypelist = res;
      }
    )
  }

  // public GetPaymentType1(languageid) {
  //   debugger;
  //   this.fmsservice.GetPaymentType(languageid).subscribe(
  //     res => {
  //       debugger;
  //       this.PartialPaymentTypelist = res;
  //     }
  //   )
  // }

  amounttopay;
  FullPaymentDiv;
  PartialPaymentDiv;
  public vendorName;
  public CheckedForPayments(evn) {
    debugger;

    if (evn.status == "Pending") {
      this.FullPaymentDiv = true;
      this.PartialPaymentDiv = false;
      this.VendorID = evn.vendorID;
      this.NetAmount = evn.netTotal;
      this.TotalAmount = evn.grandTotal;
      this.InvoiceNo = evn.invoiceNo;
      this.VendorPaymentsEntity.InvoiceNo = this.InvoiceNo;
      this.VendorPaymentsEntity.TotalAmount = this.TotalAmount;
      this.VendorPaymentsEntity.VendorID = this.VendorID;
      this.VendorPaymentsEntity.Comment = this.Comment;
      this.vendorName = evn.vendorName;
    }
    else {

      this.PartialPaymentDiv = true;
      this.FullPaymentDiv = false;
      // this.GetPaymentType(1);
      this.VendorID = evn.vendorID;
      this.NetAmount = evn.netTotal;
      this.TotalAmount = evn.grandTotal;
      this.InvoiceNo = evn.invoiceNo;
      this.partialpaymentEntity.InvoiceNo = this.InvoiceNo;
      // this.partialpaymentEntity.TotalAmount = this.TotalAmount;
      // this.partialpaymentEntity.VendorID = this.VendorID;
      this.vendorName = evn.vendorName;
      this.amounttopay = evn.amounttopay;
    }

  }

  public UpdatePurchasePayment() {
    debugger;
    //this.partialpaymentEntity.LanguageID=Number(localStorage.getItem('selectedLanguageID'))
    this.fmsservice.UpdatePurchasePayment(this.partialpaymentEntity).subscribe(res => {

      Swal.fire('Vendor Payments Done Successfully');
      //this.GetVendorPaymentDashboard();
      //location.reload();
      this.savenotification();
      // this.GetVendorPartialPayments();
      this.Clear1();


    })
  }

  public Clear1() {
    this.partialpaymentEntity.InvoiceNo = "",
      this.partialpaymentEntity.PaidAmount = 0,
      this.partialpaymentEntity.Chequeno = "",
      this.partialpaymentEntity.PaymentTypeID = 0,
      this.partialpaymentEntity.BankName = "",
      this.partialpaymentEntity.Comment = "",
      this.amounttopay = 0
  }


  public InsertPurchasePayment() {

    this.VendorPaymentsEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'));
    // if(this.VendorPaymentsEntity.VendorUsedCredits>0){
    //    this.VendorPaymentsEntity.PaidAmount=this.VendorPaymentsEntity.PaidAmount+this.VendorPaymentsEntity.VendorUsedCredits;
    // }
    debugger;
    this.VendorPaymentsEntity.PaidAmount = this.VendorPaymentsEntity.PaidAmount + this.VendorPaymentsEntity.VendorUsedCredits;

    this.fmsservice.InsertPurchasePayment(this.VendorPaymentsEntity).subscribe(res => {
      debugger;
      Swal.fire('Vendor Payments Done Successfully');
      //this.GetVendorPaymentDashboard();
      //location.reload();
      this.savenotification();
      this.Clear();
    })
  }

  public Clear() {
    this.VendorPaymentsEntity.LanguageID = 0,
      this.VendorPaymentsEntity.PaymentTypeID = 0,
      this.VendorPaymentsEntity.TotalAmount = 0,
      this.VendorPaymentsEntity.PaidAmount = 0,
      this.VendorPaymentsEntity.ModifiedBy = "",
      this.VendorPaymentsEntity.InvoiceNo = "",
      this.VendorPaymentsEntity.VendorID = 0,
      this.VendorPaymentsEntity.VendorUsedCredits = 0,
      this.VendorPaymentsEntity.Chequeno = "",
      this.VendorPaymentsEntity.BankName = ""
    this.VendorPaymentsEntity.Comment = ""
    this.NetAmount = "";
    this.TotalAmount = ""
  }

  // public GetPaymentType(languageid) {
  //   this.fmsservice.GetPaymentType(languageid).subscribe(
  //     res => {
  //       debugger;
  //       this.PaymentTypelist = res;
  //     }
  //   )
  // }

  public PaymentBasedTextBox(evn) {

    this.ChequeID = evn.target.value;
  }

  PartialChequeID
  public partialpaymentsddl(evn) {

    this.PartialChequeID = evn.target.value;
  }

  date = new Date();
  public savenotification() {
    let notification = {
      Date: this.date,
      Event: 'Vendor Payment',
      FromUser: localStorage.getItem('username'),
      ToUser: this.vendorName,
      Message: 'Payment made to ' + this.vendorName,
      Photo: 'photo',
      Building: 'NA',
    };
    this.fmsservice.InsertNotification(notification).subscribe(
      res => {

      }
    )
  }



  exporttoexcel() {

    let ExportData = [];

    for (let i = 0; i < this.FilteredAllpayments.length; i++) {

      let singleData = {
        invoiceNo: String,
        vendorName: String,
        date: "",
        grandTotal: 0,
        status: "",
        amounttopay: 0,
        // aging:0
      }
      singleData.invoiceNo = this.FilteredAllpayments[i].invoiceNo;
      singleData.vendorName = this.FilteredAllpayments[i].vendorName;
      singleData.date = this.datePipe.transform(this.FilteredAllpayments[i].date, 'yyyy-MM-dd');
      singleData.status = this.FilteredAllpayments[i].status;
      singleData.grandTotal = this.FilteredAllpayments[i].grandTotal;
      singleData.amounttopay = this.FilteredAllpayments[i].amounttopay;
      // singleData.aging=this.AllPayments[i].aging;

      ExportData.push(singleData);

    }

    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Vendor Payments List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Vendor Payments List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(ExportData);
  }

}
