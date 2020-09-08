import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-invoice-dashboard',
  templateUrl: './invoice-dashboard.component.html',
  styleUrls: ['./invoice-dashboard.component.css']
})
export class InvoiceDashboardComponent implements OnInit {
  pickeroptions: NgDateRangePickerOptions;
  options: { theme: string; range: string; dayNames: string[]; presetNames: string[]; dateFormat: string; outputFormat: string; startOfWeek: number; };
  public pageMenuTitle;
  public vendor_Button;
  public vendor_BreadChrumb;
  public vendor_search;
  public vendor_SelDate;
  public vendor_Vendor;
  public vendor_Date;
  public vendor_Invoice;
  public vendor_VendorName;
  public vendor_Amount;
  public vendor_PaymentStatus;
  public vendor_Attachment;
  public Search;
  public InvoiceList: any;
  public FilteredInvoiceList;
  public VendorList;
  public FilteredVendorList;
  datelist = [];
  public fileUrl;
  StatusTest: any;
  LoginTypeID: any;
  Grandtotal
  constructor(public fmsservice: FmsService, private datePipe: DatePipe, private sanitizer: DomSanitizer, public router: Router) { }
  value: any;
  ngOnInit() {

    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1,

    };
    const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetInvoicedashboardLanguage(selectedlanguage);
    // this.GetInvoiceAttachments(selectedlanguage);
    this.GetVendorList(selectedlanguage);

    this.fmsservice.GetInvoiceAttachments("2020-01-01", "2020-12-31", 1).subscribe(
      res => {
        debugger;
        this.InvoiceList = res;
        this.FilteredInvoiceList = this.InvoiceList.filter(x => x.buildingID == localStorage.getItem('ProjectID'));
        let total: any = 0;
        this.FilteredInvoiceList.forEach(element => {
          total += Number(element.grandTotal.replace(/[^0-9\.-]+/g, ""))
        });
        this.Grandtotal = total.toLocaleString();
        for (var i = 0; i < this.FilteredInvoiceList.length; i++) {
          debugger
          if (this.FilteredInvoiceList[i].attachment.includes(".pdf")) {
            this.FilteredInvoiceList[i]['frame'] = 1
          }
          else if (this.FilteredInvoiceList[i].attachment.includes(".xlsx")) {
            this.FilteredInvoiceList[i]['frame'] = 2
          }
          else {
            this.FilteredInvoiceList[i]['frame'] = 0
          }

        }

      }
    )
  }

  startdate;
  enddate;
  selectedDate(value) {
    this.datelist.pop()
    debugger
    this.datelist = value.split('-')

    this.startdate = this.datelist[0]
    this.enddate = this.datelist[1]
    debugger
    this.fmsservice.GetInvoiceAttachments(this.startdate, this.enddate, 1).subscribe(
      res => {
        debugger;
        this.InvoiceList = res;
        this.FilteredInvoiceList = this.InvoiceList;
        let total: any = 0;
        this.FilteredInvoiceList.forEach(element => {
          total += Number(element.grandTotal.replace(/[^0-9\.-]+/g, ""))
        });
        this.Grandtotal = total.toLocaleString();
        for (var i = 0; i < this.FilteredInvoiceList.length; i++) {
          debugger
          if (this.FilteredInvoiceList[i].attachment.includes(".pdf")) {
            this.FilteredInvoiceList[i]['frame'] = 1
          }
          else if (this.FilteredInvoiceList[i].attachment.includes(".xlsx")) {
            this.FilteredInvoiceList[i]['frame'] = 2
          }
          else {
            this.FilteredInvoiceList[i]['frame'] = 0
          }

        }

      }
    )

  }


  public Delete(evn) {
    debugger;
  }

  GetInvoicedashboardLanguage(id) {
    this.fmsservice.GetInvoicedashboardLanguage(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.vendor_Button = res[0].vendor_Button;
        this.vendor_BreadChrumb = res[0].vendor_BreadChrumb;
        this.vendor_search = res[0].vendor_search;
        this.vendor_SelDate = res[0].vendor_SelDate;
        this.vendor_Vendor = res[0].vendor_Vendor;
        this.vendor_Date = res[0].vendor_Date;
        this.vendor_Invoice = res[0].vendor_Invoice;
        this.vendor_VendorName = res[0].vendor_VendorName;
        this.vendor_Amount = res[0].vendor_Amount;
        this.vendor_PaymentStatus = res[0].vendor_PaymentStatus;
        this.vendor_Attachment = res[0].vendor_Attachment;
      }
    )
  }


  public GetInvoiceAttachments(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');
    this.fmsservice.GetInvoiceAttachments("2020-01-01", "2020-12-31", languageid).subscribe(
      res => {
        debugger;
        this.InvoiceList = res;
        this.FilteredInvoiceList = this.InvoiceList;
        let total: any = 0;
        this.FilteredInvoiceList.forEach(element => {
          total += Number(element.grandTotal.replace(/[^0-9\.-]+/g, ""))
        });
        this.Grandtotal = total.toLocaleString();
        for (var i = 0; i < this.FilteredInvoiceList.length; i++) {
          debugger
          if (this.FilteredInvoiceList[i].attachment.includes(".pdf")) {
            this.FilteredInvoiceList[i]['frame'] = 1
          }
          else if (this.FilteredInvoiceList[i].attachment.includes(".xlsx")) {
            this.FilteredInvoiceList[i]['frame'] = 2
          }
          else {
            this.FilteredInvoiceList[i]['frame'] = 0
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
        this.FilteredVendorList = this.VendorList;
      }
    )
  }
  selected
  public FilterByVendorName(evn) {
    debugger;
    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredInvoiceList = this.InvoiceList;
      let total: any = 0;
      this.FilteredInvoiceList.forEach(element => {
        total += Number(element.grandTotal.replace(/[^0-9\.-]+/g, ""))
      });
      this.Grandtotal = total.toLocaleString();
      for (var i = 0; i < this.FilteredInvoiceList.length; i++) {
        debugger
        if (this.FilteredInvoiceList[i].attachment.includes(".pdf")) {
          this.FilteredInvoiceList[i]['frame'] = 1
        }
        else if (this.FilteredInvoiceList[i].attachment.includes(".xlsx")) {
          this.FilteredInvoiceList[i]['frame'] = 2
        }
        else {
          this.FilteredInvoiceList[i]['frame'] = 0
        }

      }

    }
    else {
      this.StatusTest = "none"
      this.selected = evn.target.value;
      this.FilteredInvoiceList = this.InvoiceList.filter(x => x.name == this.selected);
      let total: any = 0;
      this.FilteredInvoiceList.forEach(element => {
        total += Number(element.grandTotal.replace(/[^0-9\.-]+/g, ""))
      });
      this.Grandtotal = total.toLocaleString();
      for (var i = 0; i < this.FilteredInvoiceList.length; i++) {
        debugger
        if (this.FilteredInvoiceList[i].attachment.includes(".pdf")) {
          this.FilteredInvoiceList[i]['frame'] = 1
        }
        else if (this.FilteredInvoiceList[i].attachment.includes(".xlsx")) {
          this.FilteredInvoiceList[i]['frame'] = 2
        }
        else {
          this.FilteredInvoiceList[i]['frame'] = 0
        }

      }


    }
  }
  downloadUrl(url: string, fileName: string) {
    let a: any = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  };


  POID
  public GotoVendorPayment(evn) {
    debugger;
    this.POID = evn.id
    this.router.navigate(['/VendorPayments', this.POID]);
  }




  public FilterStatus(evn) {
    debugger;
    if (evn.target.value == 0) {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredInvoiceList = this.InvoiceList.filter(x => x.name == this.selected);
      let total: any = 0;
      this.FilteredInvoiceList.forEach(element => {
        total += Number(element.grandTotal.replace(/[^0-9\.-]+/g, ""))
      });
      this.Grandtotal = total.toLocaleString();
      for (var i = 0; i < this.FilteredInvoiceList.length; i++) {
        debugger
        if (this.FilteredInvoiceList[i].attachment.includes(".pdf")) {
          this.FilteredInvoiceList[i]['frame'] = 1
        }
        else if (this.FilteredInvoiceList[i].attachment.includes(".xlsx")) {
          this.FilteredInvoiceList[i]['frame'] = 2
        }
        else {
          this.FilteredInvoiceList[i]['frame'] = 0
        }

      }

    }
    else {

      let statustext = evn.target.value;
      this.FilteredInvoiceList = this.InvoiceList.filter(x => x.status == statustext && x.name == this.selected);
      let total: any = 0;
      this.FilteredInvoiceList.forEach(element => {
        total += Number(element.grandTotal.replace(/[^0-9\.-]+/g, ""))
      });
      this.Grandtotal = total.toLocaleString();
      for (var i = 0; i < this.FilteredInvoiceList.length; i++) {
        debugger
        if (this.FilteredInvoiceList[i].attachment.includes(".pdf")) {
          this.FilteredInvoiceList[i]['frame'] = 1
        }
        else if (this.FilteredInvoiceList[i].attachment.includes(".xlsx")) {
          this.FilteredInvoiceList[i]['frame'] = 2
        }
        else {
          this.FilteredInvoiceList[i]['frame'] = 0
        }

      }

    }
  }

}
