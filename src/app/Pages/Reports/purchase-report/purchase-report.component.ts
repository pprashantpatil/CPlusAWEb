import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';



@Component({
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.css']
})
export class PurchaseReportComponent implements OnInit {
  options: NgDateRangePickerOptions;

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public pageMenuTitle;
  public purchaseReport_PageTitle;
  public purchaseReport_BreadChrumb;
  public purchaseReport_SelectDate;
  public purchaseReport_Selectvendor;
  public purchaseReport_GrandTotal;
  public purchaseReport_POID;
  public purchaseReport_InvoiceNo;
  public purchaseReport_InvoiceDate;
  public purchaseReport_Vendor;
  public purchaseReport_Grand;
  public purchaseReport_PaymentStatus;
  public purchaseReport_Details;
  public purchaseList: any;
  public VendorPurchaseList;
  public VendorPurchaseDetailsList;
  public FilteredpurchaseList;

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
    this.GetPurchaseReportLanguage(selectedlanguage);
    this.GetPurchaseReport(selectedlanguage);
    this.GetVendorForPurchase(selectedlanguage);

  }

  public GetPurchaseReportLanguage(languageid) {
    this.fmsservice.GetPurchaseReportLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.purchaseReport_PageTitle = res[0].purchaseReport_PageTitle;
        this.purchaseReport_BreadChrumb = res[0].purchaseReport_BreadChrumb;
        this.purchaseReport_SelectDate = res[0].purchaseReport_SelectDate;
        this.purchaseReport_Selectvendor = res[0].purchaseReport_Selectvendor;
        this.purchaseReport_GrandTotal = res[0].purchaseReport_GrandTotal;
        this.purchaseReport_POID = res[0].purchaseReport_POID;
        this.purchaseReport_InvoiceNo = res[0].purchaseReport_InvoiceNo;
        this.purchaseReport_InvoiceDate = res[0].purchaseReport_InvoiceDate;
        this.purchaseReport_Vendor = res[0].purchaseReport_Vendor;
        this.purchaseReport_Grand = res[0].purchaseReport_Grand;
        this.purchaseReport_PaymentStatus = res[0].purchaseReport_PaymentStatus;
        this.purchaseReport_Details = res[0].purchaseReport_Details;


      }
    )
  }


  public GetPurchaseReport(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetPurchaseReport("  2019-01-01 ", "2019-12-31", languageid).subscribe(
      res => {
        debugger;
        this.purchaseList = res;
        this.FilteredpurchaseList=  this.purchaseList;
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

  public Information(evn) {
    debugger;
    this.GetPurchaseReportDetails(evn.invoiceNo)
  }

  public GetPurchaseReportDetails(Invoice) {
    this.fmsservice.GetPurchaseReportDetails(Invoice).subscribe(
      res => {
        debugger;
        this.VendorPurchaseDetailsList = res;
      }
    )
  }
   public t:any;
  
  public Vendor(evn) {
    debugger;
    if (evn.target.value == "none") {
     this.FilteredpurchaseList = this.purchaseList;
      
    }
    else {
      let selected = evn.target.value;
      this.FilteredpurchaseList = this.purchaseList.filter(x => x.vendorName == selected);
     this.t=0;
      for(let count=0; count <this.FilteredpurchaseList .length; count++){
        this.t += parseInt(this.FilteredpurchaseList[count].grandTotal, 10);
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
      title: 'Purchase Report ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Purchase Report'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.FilteredpurchaseList);
  }


}
