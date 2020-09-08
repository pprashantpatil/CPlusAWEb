import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';



@Component({
  selector: 'app-vendor-payment-report',
  templateUrl: './vendor-payment-report.component.html',
  styleUrls: ['./vendor-payment-report.component.css']
})
export class VendorPaymentReportComponent implements OnInit {
  options: NgDateRangePickerOptions;


  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public pageMenuTitle;
  public vendorPaymentReport_Title;
  public vendorPaymentReport_BreadChrumb;
  public vendorPaymentReport_SelectDate;
  public vendorPaymentReport_SelectVendor;
  public vendorPaymentReport_GrandTotal;
  public vendorPaymentReport_Invoice;
  public vendorPaymentReport_Vendor;
  public vendorPaymentReport_Date;
  public vendorPaymentReport_Amount;
  public vendorPaymentReport_Credit;
  public vendorPaymentReport_Grand;
  public building_Phone_Number;
  public building_Email;
  public building_Actions;
  public VendorpaymentsList: any;
  public VendorPurchaseList;
  public FilteredVendorpaymentsList;

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
    this.GetVendorPaymentReportLanguage(selectedlanguage);
    this.GetVendorPaymentReport(selectedlanguage);
    this.GetVendorForPurchase(selectedlanguage);
  }

  public GetVendorPaymentReportLanguage(languageid) {
    this.fmsservice.GetVendorPaymentReportLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.vendorPaymentReport_Title = res[0].vendorPaymentReport_Title;
        this.vendorPaymentReport_BreadChrumb = res[0].vendorPaymentReport_BreadChrumb;
        this.vendorPaymentReport_SelectDate = res[0].vendorPaymentReport_SelectDate;
        this.vendorPaymentReport_SelectVendor = res[0].vendorPaymentReport_SelectVendor;
        this.vendorPaymentReport_GrandTotal = res[0].vendorPaymentReport_GrandTotal;
        this.vendorPaymentReport_Invoice = res[0].vendorPaymentReport_Invoice;
        this.vendorPaymentReport_Vendor = res[0].vendorPaymentReport_Vendor;
        this.vendorPaymentReport_Date = res[0].vendorPaymentReport_Date;
        this.vendorPaymentReport_Amount = res[0].vendorPaymentReport_Date;
        this.vendorPaymentReport_Credit = res[0].vendorPaymentReport_Credit;
        this.vendorPaymentReport_Grand = res[0].vendorPaymentReport_Grand;


      }
    )
  }
  public GetVendorPaymentReport(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetVendorPaymentReport("  2019-01-01 ", "2019-12-31", languageid).subscribe(
      res => {
        debugger;
        this.VendorpaymentsList = res;
        this.FilteredVendorpaymentsList = this.VendorpaymentsList;
      }
    )
  }

  public GetVendorForPurchase(languageid) {
    this.fmsservice.GetVendorForPurchase(languageid).subscribe(
      res => {
        debugger;
        this.VendorPurchaseList = res;
      }
    )
  }
 

  public t:any;
  public VendorSelected(evn) {
    debugger;
    if (evn.target.value == "none") {
      this.FilteredVendorpaymentsList = this.VendorpaymentsList;
    } else {
      let selectedVendor = evn.target.value;
      this.FilteredVendorpaymentsList = this.VendorpaymentsList.filter(x => x.vendorName == selectedVendor);

      this.t = 0;
      for (let count = 0; count < this.FilteredVendorpaymentsList.length; count++) {
        this.t += parseInt(this.FilteredVendorpaymentsList[count].totalAmount, 10);
      }
    }

  }


  exporttoexcel() {
    debugger;
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
    csvExporter.generateCsv(this.FilteredVendorpaymentsList);
  }
}
