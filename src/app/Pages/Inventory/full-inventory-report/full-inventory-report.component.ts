import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';


@Component({
  selector: 'app-full-inventory-report',
  templateUrl: './full-inventory-report.component.html',
  styleUrls: ['./full-inventory-report.component.css']
})
export class FullInventoryReportComponent implements OnInit {

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
  CategoryLists: any;
  InventoryLists: any
  EquipmentTypeList:any
  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetFullInventoryLanguage(selectedlanguage);
    this.GetFullInvetoryReport(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.GetInventoryType();
    this.fmsservice.GetCategoryItemMaster().subscribe(data => {
      debugger
      this.CategoryLists = data;
    })
    this.fmsservice.GetItemTypes(1).subscribe(
      res => {
        debugger;
        this.InventoryLists = res;

      }
    )
    this.fmsservice.GetEquipmentType(1).subscribe(
      res => {

        this.EquipmentTypeList = res;
      }
    )

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

    this.fmsservice.GetFullInvetoryReport("2020-01-01", "2020-12-31", languageid).subscribe(
      res => {
        debugger;
        this.InventoryList = res;
        this.FilteredInventorylist = this.InventoryList.filter(x => x.buildingID == localStorage.getItem('ProjectID'));
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


  public FilterByBuildingname(evn) {
    debugger;
    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredInventorylist = this.InventoryList.filter(x => x.buildingID == localStorage.getItem('ProjectID'));
    }
    else {
      this.selectedBuildingName = evn.target.value;
      this.FilteredInventorylist = this.InventoryList.filter(x => x.buldingname == this.selectedBuildingName && x.buildingID == localStorage.getItem('ProjectID'));
    }
  }



  exporttoexcel() {
    debugger;

    var list = []

    for (var i = 0; i < this.FilteredInventorylist.length; i++) {

      var entity = {
        UserName: this.FilteredInventorylist[i].userName,
        AvailableQty: this.FilteredInventorylist[i].availableQty,
        Buldingname: this.FilteredInventorylist[i].buldingname,
        CounsumeQty: this.FilteredInventorylist[i].counsumeQty,
        Floor: this.FilteredInventorylist[i].floor,
        LastConsumedDate: this.FilteredInventorylist[i].lastConsumedDate,
        MinimumQty: this.FilteredInventorylist[i].minimumQty,
        Name: this.FilteredInventorylist[i].name,
        PurchaseQty: this.FilteredInventorylist[i].purchaseQty,
        RemainingCount: this.FilteredInventorylist[i].remainingCount,
        Type: this.FilteredInventorylist[i].type


      }

      list.push(entity)

    }
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Full Inventory List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Full Inventory List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(list);
  }
  public GetCategoryID(event) {

    if (event.target.value == 0) {
      this.GetFullInvetoryReport(1);
    }
    else {
      this.fmsservice.GetFullInvetoryReport("2020-01-01", "2020-12-31", 1).subscribe(
        res => {
          debugger;
          this.InventoryList = res;
          this.FilteredInventorylist = this.InventoryList.filter(x => x.buildingID == localStorage.getItem('ProjectID') && x.category == event.target.value);
        }
      )
    }
  }

  public FilterByInventory(evn) {
    if (evn.target.value == 0) {
      this.GetFullInvetoryReport(1);
    }
    else {
      this.fmsservice.GetFullInvetoryReport("2020-01-01", "2020-12-31", 1).subscribe(
        res => {
          debugger;
          this.InventoryList = res;
          this.FilteredInventorylist = this.InventoryList.filter(x => x.buildingID == localStorage.getItem('ProjectID') && x.itemType == evn.target.value);
        }
      )
    }
  }
  public FilterByItem(evn) {
    debugger
    if (evn.target.value == 0) {
      this.GetFullInvetoryReport(1);
    }
    else {
      this.fmsservice.GetFullInvetoryReport("2020-01-01", "2020-12-31", 1).subscribe(
        res => {
          debugger;
          this.InventoryList = res;
          this.FilteredInventorylist = this.InventoryList.filter(x => x.buildingID == localStorage.getItem('ProjectID') && x.name == evn.target.value);
        }
      )
    }
  }

}
