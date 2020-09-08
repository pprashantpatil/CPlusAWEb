import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-access-report',
  templateUrl: './access-report.component.html',
  styleUrls: ['./access-report.component.css']
})
export class AccessReportComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  BuildingSearch;
  ngOnInit() {
    this.GetAccessReport();
  }

  AccessReportList;
  public GetAccessReport() {
    this.fmsservice.GetAccessReport().subscribe(
      res => {
        debugger;
        this.AccessReportList = res;
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
      title: 'Access Report ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Access Report'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.AccessReportList);
  }
}
