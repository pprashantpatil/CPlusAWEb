import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';


@Component({
  selector: 'app-vendor-outstanding-payments',
  templateUrl: './vendor-outstanding-payments.component.html',
  styleUrls: ['./vendor-outstanding-payments.component.css']
})
export class VendorOutstandingPaymentsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  public pageMenuTitle;
  public vendor_Title;
  public vendor_BreadChrumb;
  public vendor_SelectDate;
  public vendor_SelectVendor;
  public vendor_GrandTotal;
  public vendor_ExportToExcel;
  public vendor_InvoiceNo;
  public vendor_Type;
  public vendor_InvoiceDate;
  public vendor_Vendor;
  public vendor_InvoiceAmount;
  public vendor_Aging;
  public vendor_Invoice;
  public VendorList;
  public VPaymentsList;
  public FilteredVPaymentsList;

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  value: any;
  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetVendorOutstandingPaymentsLanguage(selectedlanguage);
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,
    };
    this.GetVendorList(selectedlanguage);
    this.GetVendorPaymentDashboard();
  }

  GetVendorOutstandingPaymentsLanguage(id) {
    this.fmsservice.GetVendorOutstandingPaymentsLanguage(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.vendor_Title = res[0].vendor_Title;
        this.vendor_BreadChrumb = res[0].vendor_BreadChrumb;
        this.vendor_SelectDate = res[0].vendor_SelectDate;
        this.vendor_SelectVendor = res[0].vendor_SelectVendor;
        this.vendor_GrandTotal = res[0].vendor_GrandTotal;
        this.vendor_ExportToExcel = res[0].vendor_ExportToExcel;
        this.vendor_InvoiceNo = res[0].vendor_InvoiceNo;
        this.vendor_Type = res[0].vendor_Type;
        this.vendor_InvoiceDate = res[0].vendor_InvoiceDate;
        this.vendor_Vendor = res[0].vendor_Vendor;
        this.vendor_InvoiceAmount = res[0].vendor_InvoiceAmount;
        this.vendor_Aging = res[0].vendor_Aging;
        this.vendor_Invoice = res[0].vendor_Invoice;
      }
    )
  }

  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Outstanding Payments List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Outstanding Payments List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.VPaymentsList);
  }



  public GetVendorList(languageid) {
    this.fmsservice.GetVendorList(languageid).subscribe(
      res => {
        debugger;
        this.VendorList = res;

      }
    )
  }


  public GetVendorPaymentDashboard() {
    debugger;
    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetVendorPaymentDashboard("2019-01-01", "2019-12-31").subscribe(
      res => {
        debugger
        this.VPaymentsList = res;
        this.FilteredVPaymentsList = this.VPaymentsList;
      }
    )
  }


  public FilterByVendorName(evn) {
    if (evn.target.value == "none") 
    {
      this.FilteredVPaymentsList = this.VPaymentsList;
    }
    else 
    {
      let selected = evn.target.value;
      this.FilteredVPaymentsList = this.VPaymentsList.filter(x => x.vendorName == selected);
    }
  }





}
