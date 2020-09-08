import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';



@Component({
  selector: 'app-purchase-order-report',
  templateUrl: './purchase-order-report.component.html',
  styleUrls: ['./purchase-order-report.component.css']
})
export class PurchaseOrderReportComponent implements OnInit {
  options: NgDateRangePickerOptions;


  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public pageMenuTitle;
  public purchaseOrderReport_PageTitle;
  public purchaseOrderReport_breadchrumb;
  public purchaseOrderReport_Button;
  public purchaseOrderReport_SelectDate;
  public purchaseOrderReport_SelectVendor;
  public purchaseOrderReport_SelectStatus;
  public purchaseOrderReport_PO;
  public purchaseOrderReport_POType;
  public purchaseOrderReport_Vendor;
  public purchaseOrderReport_Date;
  public purchaseOrderReport_User;
  public purchaseOrderReport_Status;
  public purchaseOrderReport_Details;
  public PurchaseList: any;
  public VendorPurchaseList;
  public StatusList;
  public POItemsList;
  public FilteredPurchaseList;
  public selectedVendor;
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
    this.GetPurchaseOrderReportLanguage(selectedlanguage);
    this.GetPODashboard(selectedlanguage);
    this.GetVendorForPurchase(selectedlanguage);
    this.GetStatusType();
  }

  public GetPurchaseOrderReportLanguage(languageid) {
    this.fmsservice.GetPurchaseOrderReportLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.purchaseOrderReport_PageTitle = res[0].purchaseOrderReport_PageTitle;
        this.purchaseOrderReport_breadchrumb = res[0].purchaseOrderReport_breadchrumb;
        this.purchaseOrderReport_Button = res[0].purchaseOrderReport_Button;
        this.purchaseOrderReport_SelectDate = res[0].purchaseOrderReport_SelectDate;
        this.purchaseOrderReport_SelectVendor = res[0].purchaseOrderReport_SelectVendor;
        this.purchaseOrderReport_SelectStatus = res[0].purchaseOrderReport_SelectStatus;
        this.purchaseOrderReport_PO = res[0].purchaseOrderReport_PO;
        this.purchaseOrderReport_POType = res[0].purchaseOrderReport_POType;
        this.purchaseOrderReport_Vendor = res[0].purchaseOrderReport_Vendor;
        this.purchaseOrderReport_Date = res[0].purchaseOrderReport_Date;
        this.purchaseOrderReport_User = res[0].purchaseOrderReport_User;
        this.purchaseOrderReport_Status = res[0].purchaseOrderReport_Status;
        this.purchaseOrderReport_Details = res[0].purchaseOrderReport_Details;

      }
    )
  }

  public GetPODashboard(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetPODashboard("2019-01-01", "2019-12-31", languageid).subscribe(
      res => {
        debugger;
        this.PurchaseList = res;
        this.FilteredPurchaseList = this.PurchaseList;
      }
    )
  }

  public GetVendorForPurchase(languageid) {
    this.fmsservice.GetVendorForPurchase(languageid).subscribe(
      res => {
        debugger;
        this.VendorPurchaseList = res;
        this.VendorPurchaseList.sort(function(a, b) {
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

  public GetStatusType() {
    this.fmsservice.GetStatusType().subscribe(
      res => {
        debugger;
        this.StatusList = res;
      }
    )
  }

  public Information(evn) {
    debugger;
    this.GetPOItemDetails(evn.poid);

  }

  public GetPOItemDetails(POID) {
    this.fmsservice.GetPOItemDetails(POID).subscribe(
      res => {
        debugger;
        this.POItemsList = res;
      }
    )
  }
 public t:any;
  public Vendor(evn) {
    debugger;
    if (evn.target.value == "none") {
      this.FilteredPurchaseList = this.PurchaseList;
    }
    else {
      this.selectedVendor = evn.target.value;
      this.FilteredPurchaseList = this.PurchaseList.filter(x => x.vendor == this.selectedVendor);
      this.t=0;
      for(let count=0; count <this.FilteredPurchaseList .length; count++){
        this.t += parseInt(this.FilteredPurchaseList[count].grandTotal, 10);
      }
    }
  }


  public FilterByStatus(evn) {
    debugger;
    if (evn.target.value == "none" || this.selectedVendor=="none") {
      this.FilteredPurchaseList = this.PurchaseList;
    }
    else {
      let selected = evn.target.value;
      this.FilteredPurchaseList = this.PurchaseList.filter(x => x.status == selected && x.vendor== this.selectedVendor);

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
      title: 'Purchase Order Report ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Purchase Order Report'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.FilteredPurchaseList);
  }

}
