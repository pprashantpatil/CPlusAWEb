import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';


@Component({
  selector: 'app-maintenancereport',
  templateUrl: './maintenancereport.component.html',
  styleUrls: ['./maintenancereport.component.css']
})
export class MaintenancereportComponent implements OnInit {
  options1: NgDateRangePickerOptions;


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
  startdate: any;
  datelist: any;
  enddate: any;
  selectedlanguage: any;
  SelectedDateRange: any;
  Buildinglist: any;
  buildname: any;

  ngOnInit() {
    this.options1 = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.selectedlanguage = localStorage.getItem('selectedLanguageID');

    this.GetVendorPaymentReport(this.selectedlanguage);



    this.fmsservice.GetBuildinglist(this.selectedlanguage).subscribe(
      res => {
        debugger
        this.Buildinglist = res;

        this.Buildinglist.sort(function (a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
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


  filterbuilding(buildname) {
    debugger
    this.buildname = buildname.target.value;
  }

  GrandTotal
  public GetVendorPaymentReport(languageid) {
    debugger
    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(new Date(new Date().getFullYear(), 0, 1), 'yyyy-MM-dd');
    let edate = this.datePipe.transform(new Date(new Date().getFullYear(), 31, 11), 'yyyy-MM-dd');
    debugger
    this.fmsservice.GetReportmaintenanceRequest(1, sdate, edate, languageid).subscribe(
      res => {
        debugger;
        this.VendorpaymentsList = res;
        this.FilteredVendorpaymentsList = this.VendorpaymentsList;
        this.GrandTotal = this.VendorpaymentsList[0].grandTotal;

      }
    )
  }









  public captureScreen() {
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




  selectedDate(value) {
    debugger

    debugger
    this.datelist = value.split('-')

    this.startdate = this.datelist[0].replace(/\//g, '-')
    this.enddate = this.datelist[1].replace(/\//g, '-')
    debugger

    this.fmsservice.GetReportmaintenanceRequest(1, this.startdate, this.enddate, this.selectedlanguage).subscribe(data => {
      debugger
      this.FilteredVendorpaymentsList = data;
    })
  }

}
