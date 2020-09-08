import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';

@Component({
  selector: 'app-service-dashboard',
  templateUrl: './service-dashboard.component.html',
  styleUrls: ['./service-dashboard.component.css']
})
export class ServiceDashboardComponent implements OnInit {

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }

  public servicedata: any;
  public Search: any;

  ngOnInit() {
    this.Getservicemaster();
  }

  public Getservicemaster() {
    this.fmsservice.GetServiceTable().subscribe(data => {
      debugger
      this.servicedata = data;
    })
  }

}
