import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { ExportToCsv } from 'export-to-csv';


@Component({
  selector: 'app-vendor-return-dashboard',
  templateUrl: './vendor-return-dashboard.component.html',
  styleUrls: ['./vendor-return-dashboard.component.css']
})
export class VendorReturnDashboardComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }

  public pageMenuTitle;
  public vendor_PageTitle;
  public vendor_BreadChrumb;
  public vendor_Search;
  public vendor_Button;
  public vendor_Excel;
  public vendor_VendorName;
  public vendor_ItemName;
  public vendor_Invoice;
  public vendor_Available;
  public vendor_RemarksNo;
  public vendor_TotalAmount;
  public vendor_Remarks;
  public FilteredPurchaseReturnList;
  public PurchaseReturnList;
  public Search;

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetVendorReturnLanguage(selectedlanguage);
    this.GetallPurchaseReturn();
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,
    };
  }
  GetVendorReturnLanguage(id) {
    this.fmsservice.GetVendorReturnLanguage(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.vendor_PageTitle = res[0].vendor_PageTitle;
        this.vendor_BreadChrumb = res[0].vendor_BreadChrumb;
        this.vendor_Search = res[0].vendor_Search;
        this.vendor_Button = res[0].vendor_Button;
        this.vendor_Excel = res[0].vendor_Excel;
        this.vendor_VendorName = res[0].vendor_VendorName;
        this.vendor_ItemName = res[0].vendor_ItemName;
        this.vendor_Invoice = res[0].vendor_Invoice;
        this.vendor_Available = res[0].vendor_Available;
        this.vendor_RemarksNo = res[0].vendor_RemarksNo;
        this.vendor_TotalAmount = res[0].vendor_TotalAmount;
        this.vendor_Remarks = res[0].vendor_Remarks;
      }
    )
  }

  Grandtotal
  public GetallPurchaseReturn() {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();

    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetallPurchaseReturn("2020-01-01", "2020-12-31").subscribe(
      res => {
        debugger
        this.PurchaseReturnList = res;
        this.FilteredPurchaseReturnList = this.PurchaseReturnList;
        let total1 = 0;
        this.FilteredPurchaseReturnList.forEach(element => {
          total1 += Number(element.totalAmount);
        });
        this.Grandtotal = total1
      }
    )
  }

  exporttoexcel() {
    debugger;
    let ExportData = [];
    for (let i = 0; i < this.FilteredPurchaseReturnList.length; i++) {
      let singleData = {
        vendorName: String,
        itemName: String,
        invoiceNo: String,
        availableQty: 0,
        returnQty: 0,
        totalAmount: 0,
        remarks: ""
      }

      singleData.vendorName = this.FilteredPurchaseReturnList[i].vendorName;
      singleData.itemName = this.FilteredPurchaseReturnList[i].itemName;
      singleData.invoiceNo = this.FilteredPurchaseReturnList[i].invoiceNo;
      singleData.availableQty = this.FilteredPurchaseReturnList[i].availableQty;
      singleData.returnQty = this.FilteredPurchaseReturnList[i].returnQty;
      singleData.totalAmount = this.FilteredPurchaseReturnList[i].totalAmount;
      singleData.remarks = this.FilteredPurchaseReturnList[i].remarks;

      ExportData.push(singleData);



    }

    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Vendors Returns List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Vendors Returns List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(ExportData);
  }

}
