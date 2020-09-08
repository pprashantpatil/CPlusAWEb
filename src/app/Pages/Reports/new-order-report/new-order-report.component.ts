import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';



@Component({
  selector: 'app-new-order-report',
  templateUrl: './new-order-report.component.html',
  styleUrls: ['./new-order-report.component.css']
})
export class NewOrderReportComponent implements OnInit {
  options: NgDateRangePickerOptions;


  constructor(public fmsservice: FmsService) { }
  public pageMenuTitle;
  public newOrderReport_PageTitle;
  public newOrderReport_breadchrumb;
  public newOrderReport_Button;
  public newOrderReport_Sl;
  public newOrderReport_Item;
  public newOrderReport_Qty;
  public newOrderReport_Comments;
  public newOrderReport_Remove;
  public newOrderReport_Search;
  public newOrderReport_Delete;
  public newOrderReport_Save;

  ngOnInit() {
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,

    };

    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetNewOrderReportLanguage(selectedlanguage);
  }


  public GetNewOrderReportLanguage(languageid) {
    this.fmsservice.GetNewOrderReportLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.newOrderReport_PageTitle = res[0].newOrderReport_PageTitle;
        this.newOrderReport_breadchrumb = res[0].newOrderReport_breadchrumb;
        this.newOrderReport_Button = res[0].newOrderReport_Button;
        this.newOrderReport_Sl = res[0].newOrderReport_Sl;
        this.newOrderReport_Item = res[0].newOrderReport_Item;
        this.newOrderReport_Qty = res[0].newOrderReport_Qty;
        this.newOrderReport_Comments = res[0].newOrderReport_Comments;
        this.newOrderReport_Remove = res[0].newOrderReport_Remove;
        this.newOrderReport_Search = res[0].newOrderReport_Search;
        this.newOrderReport_Delete = res[0].newOrderReport_Delete;
        this.newOrderReport_Save = res[0].newOrderReport_Save;
      }
    )
  }


}
