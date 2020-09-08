import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ExportToCsv } from '../../../../../node_modules/export-to-csv';

@Component({
  selector: 'app-design-paid-invoices',
  templateUrl: './design-paid-invoices.component.html',
  styleUrls: ['./design-paid-invoices.component.css']
})
export class DesignPaidInvoicesComponent implements OnInit {

  constructor(public fmsService: FmsService, private route: ActivatedRoute, public datepipe: DatePipe, public router: Router) { }
  LoginTypeID
  ProjectID
  pickeroptions
  ngOnInit() {

    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.GetInvoices();
  }
  projectlist
  public GetInvoices() {
    debugger
    this.fmsService.GetDesignProjectInvoices('2020/01/01', '2022/01/01').subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.projectID == this.ProjectID && x.status == 1);
    })
  }


  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Paid Invoice ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Paid Invoice'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.projectlist);
  }

}
