import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service'
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import Swal from 'sweetalert2';
import { ExportToCsv } from '../../../../../node_modules/export-to-csv';
@Component({
  selector: 'app-absentees',
  templateUrl: './absentees.component.html',
  styleUrls: ['./absentees.component.css']
})
export class AbsenteesComponent implements OnInit {
  Searchabsent: any;
  startdate: any;
  enddate: any;
  options: NgDateRangePickerOptions;
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


    this.GetMyAbsentStaff();

  }

  AbsenteesLists;
  public GetMyAbsentStaff() {
    this.fmsservice.GetMyAbsentStaff(this.startdate, this.enddate).subscribe(
      res => {
        debugger;
        this.AbsenteesLists = res.filter(x => x.buildingid == localStorage.getItem('ProjectID'));

      }
    )
  }


  selectedDate(value) {
    debugger
    this.datelist = value.split('-')
    this.startdate = this.datelist[0]
    this.enddate = this.datelist[1]
    debugger

    this.fmsservice.GetMyAbsentStaff(this.startdate, this.enddate).subscribe(
      res => {
        debugger;
        this.AbsenteesLists = res;

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
      title: 'Absentees Report ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Absentees Report'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.AbsenteesLists);
  }

}
