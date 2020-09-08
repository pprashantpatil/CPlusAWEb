import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service';
import { DatePipe } from '../../../../../node_modules/@angular/common';

@Component({
  selector: 'app-companydash',
  templateUrl: './companydash.component.html',
  styleUrls: ['./companydash.component.css']
})
export class CompanydashComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }
  ActiveCount: any;
  InactiveCount: any;
  TotalCount:any;
  ngOnInit() {

    this.fmsservice.GetCompanyDetails().subscribe(
      res => {
        debugger;
        this.ActiveCount = res.filter(x => x.hidden == 0).length;
      }
    )

    this.fmsservice.GetCompanyDetails().subscribe(
      res => {
        debugger;
        this.InactiveCount = res.filter(x => x.hidden == 1).length;
      }
    )

    this.fmsservice.GetCompanyDetails().subscribe(
      res => {
        debugger;
        this.TotalCount = res.length;
      }
    )

  }

}
