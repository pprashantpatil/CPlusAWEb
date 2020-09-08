import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';




@Component({
  selector: 'app-open-poreport',
  templateUrl: './open-poreport.component.html',
  styleUrls: ['./open-poreport.component.css']
})
export class OpenPOReportComponent implements OnInit {
  options: NgDateRangePickerOptions;


  constructor(public fmsservice: FmsService,private datePipe: DatePipe) { }
  public pageMenuTitle;
  public openPoReport_PageTitle;
  public openPoReport_BreadChrumb;
  public openPoReport_SelectDate;
  public openPoReport_SelectVendor;
  public openPoReport_PO;
  public openPoReport_Type;
  public openPoReport_User;
  public openPoReport_Vendor;
  public openPoReport_Raised;
  public VendorPurchaseList;
  public POList;
  public FilteredPOList;


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
    this.GetOpenPoReportLanguage(selectedlanguage);
    this.GetVendorForPurchase(selectedlanguage);
    this.GetPODashboard(selectedlanguage);
  }

  public GetOpenPoReportLanguage(languageid) {
    this.fmsservice.GetOpenPoReportLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.openPoReport_PageTitle = res[0].openPoReport_PageTitle;
        this.openPoReport_BreadChrumb = res[0].openPoReport_BreadChrumb;
        this.openPoReport_SelectDate = res[0].openPoReport_SelectDate;
        this.openPoReport_SelectVendor = res[0].openPoReport_SelectVendor;
        this.openPoReport_PO = res[0].openPoReport_PO;
        this.openPoReport_Type = res[0].openPoReport_Type;
        this.openPoReport_User = res[0].openPoReport_User;
        this.openPoReport_Vendor = res[0].openPoReport_Vendor;
        this.openPoReport_Raised = res[0].openPoReport_Raised;


      }
    )
  }

  public GetPODashboard(languageid){

    let startdate=new Date();
    startdate.setDate(startdate.getMonth()-1);
    let enddate=new Date();
    debugger;
    let sdate =  this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate =  this.datePipe.transform(enddate, 'yyyy-MM-dd');
    
    this.fmsservice.GetPODashboard("2019-01-01","2019-12-31",languageid).subscribe(
      res => {
        debugger;
        this.POList=res;
        this.FilteredPOList=this.POList;
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


  public Vendor(evn) {
    debugger;
    if (evn.target.value == "none") {
       this.FilteredPOList = this.POList;
    }
    else {
      let selected = evn.target.value;
       this.FilteredPOList = this.POList.filter(x => x.vendor == selected);

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
      title: 'Open PO List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Open PO List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.FilteredPOList);
  }

}
