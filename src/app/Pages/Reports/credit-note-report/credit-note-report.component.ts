import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';


@Component({
  selector: 'app-credit-note-report',
  templateUrl: './credit-note-report.component.html',
  styleUrls: ['./credit-note-report.component.css']
})
export class CreditNoteReportComponent implements OnInit {
  options: NgDateRangePickerOptions;


  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public pageMenuTitle;
  public creditNotes_Title;
  public creditNotes_BreadChrumb;
  public creditNotes_Date;
  public creditNotes_SelectVendor;
  public creditNotes_Invoice;
  public creditNotes_CDate;
  public creditNotes_Vendor;
  public creditNotes_Amount;
  public creditNotes_Remarks;
  public creditNotes_User;
  public CreditList: any;
  public VendorPurchaseList;
  public FilteredCreditList;


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
    this.GetCreditNoteReportLanguage(selectedlanguage);
    this.GetCreditNoteReport(selectedlanguage);
    this.GetVendorForPurchase(selectedlanguage);
  }

  public GetCreditNoteReportLanguage(languageid) {
    this.fmsservice.GetCreditNoteReportLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.creditNotes_Title = res[0].creditNotes_Title;
        this.creditNotes_BreadChrumb = res[0].creditNotes_BreadChrumb;
        this.creditNotes_Date = res[0].creditNotes_Date;
        this.creditNotes_SelectVendor = res[0].creditNotes_SelectVendor;
        this.creditNotes_Invoice = res[0].creditNotes_Invoice;
        this.creditNotes_CDate = res[0].creditNotes_CDate;
        this.creditNotes_Vendor = res[0].creditNotes_Vendor;
        this.creditNotes_Amount = res[0].creditNotes_Amount;
        this.creditNotes_Remarks = res[0].creditNotes_Remarks;
        this.creditNotes_User = res[0].creditNotes_User;
      }
    )
  }
  public GetCreditNoteReport(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetCreditNoteReport("2019-01-01", "2019-12-31", languageid).subscribe(
      res => {
        debugger;
        this.CreditList = res;
        this.FilteredCreditList = this.CreditList;
      }
    )
  }

  public GetVendorForPurchase(languageid) {
    this.fmsservice.GetVendorForPurchase(languageid).subscribe(
      res => {
        debugger;
        this.VendorPurchaseList = res;

        this.VendorPurchaseList.sort(function (a, b) {
          var nameA = a.short.toUpperCase(); // ignore upper and lowercase
          var nameB = b.short.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {

            return -1;
          }

          if (nameA > nameB) {

            return 1;
          }

          // names must be equal
          return 0;
        });
      }
    )
  }

  public Vendor(evn) {
    debugger;
    if (evn.target.value == "none") {
      this.FilteredCreditList = this.CreditList;
    }
    else {
      let selected = evn.target.value;
      this.FilteredCreditList = this.CreditList.filter(x => x.vendorName == selected);

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
      title: 'Credits List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Credits List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.FilteredCreditList);
  }

}
