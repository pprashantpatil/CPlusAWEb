import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';


@Component({
  selector: 'app-inventory-required-report',
  templateUrl: './inventory-required-report.component.html',
  styleUrls: ['./inventory-required-report.component.css']
})
export class InventoryRequiredReportComponent implements OnInit {

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }

  public pageMenuTitle;
  public fullInventory_PageTitle;
  public fullInventory_BreadChrumb;
  public fullInventory_Search;
  public fullInventory_InventoryName;
  public fullInventory_InventoryType;
  public fullInventory_BuildingName;
  public fullInventory_Purchased;
  public fullInventory_Minimum;
  public fullInventory_Available;
  public fullInventory_Consume;
  public fullInventory_LastConsumedDate;
  public InventoryList: any;
  public Buildinglist;
  public Inventorylist;
  public Search;
  public FilteredInventorylist;
  public Inventorylistss;
  public selectedBuildingName;


  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetFullInvetoryReport(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.GetInventoryType();
  }

  public GetFullInventoryLanguage(languageid) {
    this.fmsservice.GetFullInventoryLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.fullInventory_PageTitle = res[0].fullInventory_PageTitle;
        this.fullInventory_BreadChrumb = res[0].fullInventory_BreadChrumb;
        this.fullInventory_Search = res[0].fullInventory_Search;
        this.fullInventory_InventoryName = res[0].fullInventory_InventoryName;
        this.fullInventory_InventoryType = res[0].fullInventory_InventoryType;
        this.fullInventory_BuildingName = res[0].fullInventory_BuildingName;
        this.fullInventory_Purchased = res[0].fullInventory_Purchased;
        this.fullInventory_Minimum = res[0].fullInventory_Minimum;
        this.fullInventory_Available = res[0].fullInventory_Available;
        this.fullInventory_Consume = res[0].fullInventory_Consume;
        this.fullInventory_LastConsumedDate = res[0].fullInventory_LastConsumedDate;


      }
    )
  }


  public GetFullInvetoryReport(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetInventoryRequiredReport("2019-01-01", "2019-12-31", languageid).subscribe(
      res => {
        debugger;
        this.InventoryList = res;
        this.FilteredInventorylist= this.InventoryList;
      }
    )
  }


  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        this.Buildinglist = res;
      }
    )
  }

  public GetInventoryType() {
    this.fmsservice.GetInventoryType().subscribe(
      res => {
        this.Inventorylistss = res;
      }
    )
  }


  public FilterByBuildingname(evn){
    debugger;
    if (evn.target.value == "none") {
     
      this.FilteredInventorylist= this.InventoryList ;
    }
    else {
      this.selectedBuildingName= evn.target.value;
      this.FilteredInventorylist = this.InventoryList.filter(x => x.buldingname == this.selectedBuildingName);
    }
  }

  public FilterByInventory(evn){
    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredInventorylist= this.InventoryList ;
    }
    else {
      let selected= evn.target.value;
      this.FilteredInventorylist = this.InventoryList.filter(x => x.type == selected && x.buldingname== this.selectedBuildingName);
    }
  }


}
