import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-phili-payroll',
  templateUrl: './phili-payroll.component.html',
  styleUrls: ['./phili-payroll.component.css']
})
export class PhiliPayrollComponent implements OnInit {

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public mindate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  DatesVis: boolean;
  TablesVis: boolean;

  StartDate: "";
  EndDate: " ";
  ngOnInit() {
    this.DatesVis = true;
    this.TablesVis = false;
    this.GetPhiliPayrolls();

  }

  public Dates(evn) {
    this.GetPhiliPayrolls();
  }
  PhiliPayrollsLists
  public GetPhiliPayrolls() {
    this.fmsservice.GetPhiliPayrolls(this.StartDate, this.EndDate).subscribe(
      res => {
        this.PhiliPayrollsLists = res;
        if (res.length > 0) {
          this.TablesVis = true;
          this.DatesVis = true;
        }
      }
    )
  }





}
