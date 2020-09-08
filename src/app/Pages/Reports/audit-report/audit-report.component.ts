import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from '../../../services/fms.service'
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-audit-report',
  templateUrl: './audit-report.component.html',
  styleUrls: ['./audit-report.component.css']
})
export class AuditReportComponent implements OnInit {
  options: NgDateRangePickerOptions;
  startdate: any;
  enddate: any;
  datelist: any;
  constructor(public fmsservice: FmsService, public router: Router, private datePipe: DatePipe) { }

  ngOnInit() {

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.startdate = this.datePipe.transform(new Date(new Date().getFullYear(), 0, 1), 'yyyy/MM/dd');
    this.enddate = this.datePipe.transform(new Date(new Date().getFullYear(), 11, 31), 'yyyy/MM/dd');

    this.fmsservice.GetLoginBy('2019-01-01', '2019-12-31').subscribe(
      res => {
        debugger;
        this.AuditLists = res;

      }
    )
  }

  AuditLists;
  selectedDate1(value) {
    debugger;
    this.datelist = value.split('-')
    this.startdate = this.datelist[0]
    this.enddate = this.datelist[1]
    debugger

    this.fmsservice.GetLoginBy(this.startdate, this.enddate).subscribe(
      res => {
        debugger;
        this.AuditLists = res;

      }
    )
  }

  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Audit Report ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Audit Report'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.AuditLists);
  }

}
