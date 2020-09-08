import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ExportToCsv } from 'export-to-csv';
import { DatePipe } from '@angular/common';
import { NgDateRangePickerOptions } from '../../../../../node_modules/ng-daterangepicker';

@Component({
  selector: 'app-company-payments',
  templateUrl: './company-payments.component.html',
  styleUrls: ['./company-payments.component.css']
})
export class CompanyPaymentsComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }
  BuildingSearch: any;
  SDate: any;
  EDate: any;
  options: NgDateRangePickerOptions;
  value: any;
  CompanyInvoiceLists: any;
  ngOnInit() {
    this.SDate = '2020-01-01';
    this.EDate = '2020-12-31';
    this.fmsservice.GetCompanyInvoice('2020-01-01', '2020-12-31').subscribe(
      res => {
        debugger;
        this.CompanyInvoiceLists = res.filter(x => x.paymentsBit == 1);
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


  // CompanyInvoiceLists;
  // public GetCompanyInvoice() {
  //   this.fmsservice.GetCompanyInvoice().subscribe(
  //     res => {
  //       debugger;
  //       this.CompanyInvoiceLists = res.filter(x => x.paymentsBit == 1);
  //     }
  //   )
  // }


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
        this.CompanyInvoiceLists = res.filter(x => x.paymentsBit == 1);;
      }
    )

  }
}
