import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ExportToCsv } from 'export-to-csv';
import { DatePipe } from '@angular/common';
import { NgDateRangePickerOptions } from '../../../../../node_modules/ng-daterangepicker';
@Component({
  selector: 'app-company-invoice',
  templateUrl: './company-invoice.component.html',
  styleUrls: ['./company-invoice.component.css']
})
export class CompanyInvoiceComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }
  BuildingSearch: any;
  SDate: any;
  EDate: any;
  value:any;
  ngOnInit() {

    debugger;
    this.SDate = '2020-01-01';
    this.EDate = '2020-12-31';

    this.fmsservice.GetCompanyInvoice('2020-01-01', '2020-12-31').subscribe(
      res => {
        debugger;
        this.CompanyInvoiceLists = res.filter(x => x.paymentsBit == null);
      }
    )

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

  }

  CompanyInvoiceLists;
  public GetCompanyInvoice(SDate, EDate) {
    this.fmsservice.GetCompanyInvoice(SDate, EDate).subscribe(
      res => {
        debugger;
        this.CompanyInvoiceLists = res.filter(x => x.paymentsBit == null);
      }
    )
  }


  BuildingLists: any;
  companyName: any;
  forTheMonthOf: any;
  invoiceAmount: any;
  invoiceDate: any;
  totalAmount: any;
  address: any;
  emailID: any;
  descriptions: any;
  public GetDetails(evn) {
    debugger;
    this.companyName = evn.companyName,
      this.forTheMonthOf = evn.forTheMonthOf,
      this.invoiceAmount = evn.invoiceAmount,
      this.invoiceDate = this.datepipe.transform(evn.invoiceDate, 'yyyy-MM-dd');
    this.totalAmount = evn.totalAmount,
      this.address = evn.address,
      this.emailID = evn.emailID,
      this.descriptions = evn.decriptions


  }


  public DeleteProject(id) {
    debugger;
    Swal.fire({
      // title: 'Are you sure?',
      text: "Did you get the Payments!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Proceed!'
    }).then((result) => {
      if (result.value) {
        this.fmsservice.UpdateCompanyInvoice(id).subscribe(res => {
          let test = res;
          this.GetCompanyInvoice(this.SDate, this.EDate);
        })
        Swal.fire(
          'Payments Updated Successfully!',
          '.',
          'success'
        )
      }
      else {
        this.GetCompanyInvoice(this.SDate, this.EDate);
      }
    })
  }

  datelist: any;
  startdate: any;
  enddate: any;
  selectedDate(value) {
    debugger;
    this.datelist = value.split('-')

    this.startdate = this.datelist[0]
    this.enddate = this.datelist[1]
    debugger
    this.fmsservice.GetCompanyInvoice(this.startdate, this.enddate).subscribe(
      res => {
        debugger;
        this.CompanyInvoiceLists = res.filter(x => x.paymentsBit == null);;
      }
    )

  }

}
