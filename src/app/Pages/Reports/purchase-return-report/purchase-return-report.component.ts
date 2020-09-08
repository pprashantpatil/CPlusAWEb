import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';




@Component({
  selector: 'app-purchase-return-report',
  templateUrl: './purchase-return-report.component.html',
  styleUrls: ['./purchase-return-report.component.css']
})
export class PurchaseReturnReportComponent implements OnInit {
  options: NgDateRangePickerOptions;


  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }

  public pageMenuTitle;
  public purchasereturnreport_PageTitle;
  public purchasereturnreport_breadchrumb;
  public purchasereturnreport_SelectDate;
  public purchasereturnreport_Selectvendor;
  public purchasereturnreport_GrandTotal;
  public purchasereturnreport_Invoice;
  public purchasereturnreport_Return;
  public purchasereturnreport_Vendor;
  public purchasereturnreport_Item;
  public purchasereturnreport_Available;
  public purchasereturnreport_ReturnQTY;
  public purchasereturnreport_TotalAmount;
  public PurchaseList: any;
  public VendorPurchaseList;
  public FilteredVendorPurchaseList;


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
    this.GetPurchasereturnreportLanguage(selectedlanguage);
    this.GetPurchaseReturnReport(selectedlanguage);
    this.GetVendorForPurchase(selectedlanguage);
  }

  public GetPurchasereturnreportLanguage(languageid) {
    this.fmsservice.GetPurchasereturnreportLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.purchasereturnreport_PageTitle = res[0].purchasereturnreport_PageTitle;
        this.purchasereturnreport_breadchrumb = res[0].purchasereturnreport_breadchrumb;
        this.purchasereturnreport_SelectDate = res[0].purchasereturnreport_SelectDate;
        this.purchasereturnreport_Selectvendor = res[0].purchasereturnreport_Selectvendor;
        this.purchasereturnreport_GrandTotal = res[0].purchasereturnreport_GrandTotal;
        this.purchasereturnreport_Invoice = res[0].purchasereturnreport_Invoice;
        this.purchasereturnreport_Return = res[0].purchasereturnreport_Return;
        this.purchasereturnreport_Vendor = res[0].purchasereturnreport_Vendor;
        this.purchasereturnreport_Item = res[0].purchasereturnreport_Item;
        this.purchasereturnreport_Available = res[0].purchasereturnreport_Available;
        this.purchasereturnreport_ReturnQTY = res[0].purchasereturnreport_ReturnQTY;
        this.purchasereturnreport_TotalAmount = res[0].purchasereturnreport_TotalAmount;


      }
    )
  }

  public GetPurchaseReturnReport(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetPurchaseReturnReport('2019-01-01', '2019-12-31', 1).subscribe(
      res => {
        debugger;
        this.PurchaseList = res;
        this.FilteredVendorPurchaseList= this.PurchaseList;
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


  public t:any;

  public VendorSelected(evn) {
    debugger;
    if (evn.target.value == "none") {
      this.FilteredVendorPurchaseList = this.PurchaseList;
    } else {
      let selectedVendor = evn.target.value;
      this.FilteredVendorPurchaseList = this.PurchaseList.filter(x => x.vendorName == selectedVendor);
      this.t=0;
      for(let count=0; count <this.FilteredVendorPurchaseList .length; count++){
        this.t += parseInt(this.FilteredVendorPurchaseList[count].totalAmount, 10);
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
      title: 'Purchase Return Report ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Purchase Return Report'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.FilteredVendorPurchaseList);
  }

}
