import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-vendor-payments-dashboard',
  templateUrl: './vendor-payments-dashboard.component.html',
  styleUrls: ['./vendor-payments-dashboard.component.css']
})
export class VendorPaymentsDashboardComponent implements OnInit {

  options: { theme: string; range: string; dayNames: string[]; presetNames: string[]; dateFormat: string; outputFormat: string; startOfWeek: number; };
  public pageMenuTitle;
  public vendor_PageTitle;
  public vendor_BreadChrumb;
  public vendor_SelectDate;
  public vendor_SelectInvoice;
  public vendor_InvoiceNumber;
  public vendor_Type;
  public vendor_VendorName;
  public vendor_Date;
  public vendor_TotalAmount;
  public vendor_Status;
  public vendor_Invoice;
  public VPaymentsList;
  public FilteredVPaymentsList;
  public VendorList;
  value: any;
  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }

  ngOnInit() {

    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetVendorPaymentsDashboardLanguage(selectedlanguage);
    this.GetVendorPaymentDashboard();
    this.GetVendorList(selectedlanguage);
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1,

    };
  }

  GetVendorPaymentsDashboardLanguage(id) {
    this.fmsservice.GetVendorPaymentsDashboardLanguage(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.vendor_PageTitle = res[0].vendor_PageTitle;
        this.vendor_BreadChrumb = res[0].vendor_BreadChrumb;
        this.vendor_SelectDate = res[0].vendor_SelectDate;
        this.vendor_SelectInvoice = res[0].vendor_SelectInvoice;
        this.vendor_InvoiceNumber = res[0].vendor_InvoiceNumber;
        this.vendor_Type = res[0].vendor_Type;
        this.vendor_VendorName = res[0].vendor_VendorName;
        this.vendor_Date = res[0].vendor_Date;
        this.vendor_TotalAmount = res[0].vendor_TotalAmount;
        this.vendor_Status = res[0].vendor_Status;
        this.vendor_Invoice = res[0].vendor_Invoice;
      }
    )
  }

  Grandtotal
  public GetVendorPaymentDashboard() {
    debugger;


    this.fmsservice.GetVendorPaymentDashboard("2020-01-01", "2020-12-31").subscribe(
      res => {
        debugger
        this.VPaymentsList = res;
        this.FilteredVPaymentsList = this.VPaymentsList.filter(x => x.status == "Paid");
        let total1 = 0;
        this.FilteredVPaymentsList.forEach(element => {
          total1 += Number(element.grandTotal);
        });
        this.Grandtotal = total1

        for (var i = 0; i < this.FilteredVPaymentsList.length; i++) {
          debugger
          if (this.FilteredVPaymentsList[i].attachment.includes(".pdf")) {
            this.FilteredVPaymentsList[i]['frame'] = 1
          }
          else if (this.FilteredVPaymentsList[i].attachment.includes(".xlsx")) {
            this.FilteredVPaymentsList[i]['frame'] = 2
          }
          else {
            this.FilteredVPaymentsList[i]['frame'] = 0
          }

        }

      }
    )
  }

  public GetVendorList(languageid) {
    this.fmsservice.GetVendorList(languageid).subscribe(
      res => {
        debugger;
        this.VendorList = res;

      }
    )
  }

  public FilterByVendorName(evn) {
    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredVPaymentsList = this.VPaymentsList.filter(x => x.status == "Paid");
      let total1 = 0;
      this.FilteredVPaymentsList.forEach(element => {
        total1 += Number(element.grandTotal);
      });
      this.Grandtotal = total1

    }
    else {
      let selected = evn.target.value;
      this.FilteredVPaymentsList = this.VPaymentsList.filter(x => x.vendorName == selected && x.status == "Paid");
      let total1 = 0;
      this.FilteredVPaymentsList.forEach(element => {
        total1 += Number(element.grandTotal);
      });
      this.Grandtotal = total1


    }
  }
  datelist = [];
  startdate: any;
  enddate: any;
  selectedDate(value) {
    this.datelist.pop()
    debugger
    this.datelist = value.split('-')

    this.startdate = this.datelist[0]
    this.enddate = this.datelist[1]
    debugger
    this.fmsservice.GetVendorPaymentDashboard(this.startdate, this.enddate).subscribe(
      res => {
        debugger
        this.VPaymentsList = res;
        this.FilteredVPaymentsList = this.VPaymentsList.filter(x => x.status == "Paid");
        let total1 = 0;
        this.FilteredVPaymentsList.forEach(element => {
          total1 += Number(element.grandTotal);
        });
        this.Grandtotal = total1.toLocaleString();


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
      title: 'Vendor Payments List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Vendor Payments List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.FilteredVPaymentsList);
  }


  invoiceview
  InvoiceView(evn) {
    debugger;
    this.invoiceview = evn;
  }

}
