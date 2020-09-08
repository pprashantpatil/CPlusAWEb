import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-service-history',
  templateUrl: './service-history.component.html',
  styleUrls: ['./service-history.component.css']
})
export class ServiceHistoryComponent implements OnInit {
  public pickeroptions: NgDateRangePickerOptions;
  public calenderoptions: FullCalendarOptions;
  public events: EventObject[];
  public showorhidecontent: boolean;

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }

  public pageMenuTitle;
  public assetService_PageTitle;
  public assetService_breadchrumb;
  public assetService_Building;
  public assetService_Asset_Type;
  public assetService_Asset;
  public assetService_Service_Date;
  public assetService_Service_Time;
  public assetService_Service_By;
  public assetService_Issue;
  public assetService_Comments;
  public assetService_Cost;
  public assetService_Time_Spent;
  public assetService_Equipment_Age;
  public selectedlanguage;
  public Buildinglist;
  public Equipmentlist;
  public Elist;
  public ServiceList;
  public FilteredServiceList;
  public EvevntsLists = [];
  public Search;

  //callender variables;
  public callenderyear;
  public callenderMonth;
  public callenderstartday;
  public callenderendday;
  public callenderdaysdount = [];
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');

  ngOnInit() {

    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetAssetServiceLanguageByLanguageID(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.GetEquipmentType(selectedlanguage);
    this.GetEquipmentlist(selectedlanguage);
    this.GetServiceHistory(selectedlanguage);
    if (selectedlanguage == '1') {
      this.selectedlanguage = 'en';
    }
    else if (selectedlanguage == '2') {
      this.selectedlanguage = 'ar';
    }
    else if (selectedlanguage == '3') {
      this.selectedlanguage = 'id';
    }
    else if (selectedlanguage == '4') {
      this.selectedlanguage = 'zh';
    }
    else if (selectedlanguage == '5') {
      this.selectedlanguage = 'th';
    }
    else if (selectedlanguage == '6') {
      this.selectedlanguage = 'es';
    }

    this.calenderoptions = {
      locale: this.selectedlanguage,
      editable: true,

      header: {
        right: 'prev,next ',
        center: 'title',
        left: 'month listMonth'
      },

      // contentHeight: 300,
      height: 500,


    };
    this.events = this.EvevntsLists;

    debugger;


    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,
    };
  }

  public GetAssetServiceLanguageByLanguageID(languageid) {
    this.fmsservice.GetAssetServiceLanguageByLanguageID(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.assetService_PageTitle = res[0].assetService_PageTitle;
        this.assetService_breadchrumb = res[0].assetService_breadchrumb;
        this.assetService_Building = res[0].assetService_Building;
        this.assetService_Asset_Type = res[0].assetService_Asset_Type;
        this.assetService_Asset = res[0].assetService_Asset;
        this.assetService_Service_Date = res[0].assetService_Service_Date;
        this.assetService_Service_Time = res[0].assetService_Service_Time;
        this.assetService_Service_By = res[0].assetService_Service_By;
        this.assetService_Issue = res[0].assetService_Issue;
        this.assetService_Comments = res[0].assetService_Comments;
        this.assetService_Cost = res[0].assetService_Cost;
        this.assetService_Time_Spent = res[0].assetService_Time_Spent;
        this.assetService_Equipment_Age = res[0].assetService_Equipment_Age;

      }
    )
  }

  changeStatus(evn) {
    if (evn.currentTarget.checked) {
      this.showorhidecontent = false;
    }
    else {
      this.showorhidecontent = true;
    }
  }

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        this.Buildinglist = res;
        // this.BuildingFilterList = this.Buildinglist;


        this.Buildinglist.sort(function (a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {

            return -1;
          }

          if (nameA > nameB) {

            return 1;
          }

          // names must be equal
          return 0;
        });
      }
    )
  }

  public GetEquipmentType(languageid) {
    debugger;
    this.fmsservice.GetEquipmentType(languageid).subscribe(
      res => {
        this.Equipmentlist = res;
        // this.FilteredEquipmentlist= this.Equipmentlist ;
        this.Equipmentlist.sort(function (a, b) {
          var nameA = a.short.toUpperCase(); // ignore upper and lowercase
          var nameB = b.short.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {

            return -1;
          }

          if (nameA > nameB) {

            return 1;
          }

          // names must be equal
          return 0;
        });
      }
    )
  }

  public GetEquipmentlist(languageid) {
    debugger;
    this.fmsservice.GetEquipmentlist(languageid).subscribe(
      res => {
        this.Elist = res;


        this.Elist.sort(function (a, b) {
          var nameA = a.equipmentname.toUpperCase(); // ignore upper and lowercase
          var nameB = b.equipmentname.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {

            return -1;
          }

          if (nameA > nameB) {

            return 1;
          }

          // names must be equal
          return 0;
        });

      }
    )
  }
  BuildingID;
  Floorlist;
  public GetFloor(evn) {
    debugger;
    this.BuildingID = evn.target.value;
    this.fmsservice.GetFloor(this.BuildingID).subscribe(
      res => {
        debugger;
        this.Floorlist = res;
        //  this.FilteredGroceryList = this.GroceryList.filter(x => x.buildingID == this.BuildingID);
      }
    )
  }

  public GetServiceHistory(languageid) {
    debugger;
    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');
    // this.events = [
    //   { id: 'a', title: 'My Birthday', allDay: true },
    //   { id: 'b', title: 'Friends coming round', start: '2019-07-26', end: '2019-07-26' }
    // ]
    this.fmsservice.GetServiceHistory("2019-01-01", "2022-12-31", 1).subscribe(
      res => {
        debugger
        this.ServiceList = res;
        // for (let i = 0; i < res.length; i++) {

        //   let EventStartdate = this.datePipe.transform(res[i].startDate, 'yyyy-MM-dd');
        //   let EventEnddate = this.datePipe.transform(res[i].endDate, 'yyyy-MM-dd');
        //   let ServiceEvent = {
        //     id: (i).toString(), title: res[i].issue, start: '2019-07-292019-01-01', end: '2019-07-30'
        //   }
        //   this.EvevntsLists.push(ServiceEvent);
        // }
        this.FilteredServiceList = this.ServiceList;
        this.buildcallender(this.ServiceList);
      }
    )
  }
  public buildcallender(ServiceList) {
    this.callenderdaysdount.length = 0;
    this.callenderyear = this.callenderBindData.getFullYear();
    this.callenderMonth = this.datePipe.transform(this.callenderBindData, 'MMMM');
    this.callenderstartday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth(), 1);
    this.callenderendday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth() + 1, 0);
    this.callenderdaysdount.length = this.callenderendday.getDate();
    let o = 0;
    for (let i = 0; i < this.callenderdaysdount.length; i++) {
      let sdate = this.callenderstartday;
      let _date;
      if (sdate.getDate() == 1 && o == 0) {
        _date = sdate.setDate(sdate.getDate() + 0);
        o++
      }
      else {
        _date = sdate.setDate(sdate.getDate() + 1);
      }
      _date = this.datePipe.transform(sdate, 'dd');
      let _day = this.datePipe.transform(sdate, 'EEE');
      let dateformat = this.datePipe.transform(sdate, 'yyyy-MM-dd');
      this.callenderdaysdount[i] = { date: _date, day: _day, dateformat: dateformat };
    }

    //Events Binding

    for (let j = 0; j < ServiceList.length; j++) {
      debugger;
      let test = this.datePipe.transform(this.callenderdaysdount[j].dateformat, 'yyyy-MM-dd');
      let test1 = this.datePipe.transform(ServiceList[j].startDate, 'yyyy-MM-dd');
      let currenteventlist = this.callenderdaysdount.filter(x => this.datePipe.transform(x.dateformat, 'yyyy-MM-dd') == this.datePipe.transform(ServiceList[j].startDate, 'yyyy-MM-dd'));
      // let currenteventlist_1 = ServiceList.filter(x => this.datePipe.transform(x.startDate, 'yyyy-MM-dd') == this.datePipe.transform(currenteventlist[j].dateformat, 'yyyy-MM-dd'));
      debugger;
      if (currenteventlist.length > 0) {

        for (let k = 0; k < currenteventlist.length; k++) {
          debugger;
          this.callenderdaysdount[currenteventlist[k].date - 1]['buildingName'] = ServiceList[j].buildingName;
          this.callenderdaysdount[currenteventlist[k].date - 1]['endDate'] = ServiceList[j].endDate;
          this.callenderdaysdount[currenteventlist[k].date - 1]['asset'] = ServiceList[j].asset;
          this.callenderdaysdount[currenteventlist[k].date - 1]['issue'] = ServiceList[j].issue;
          this.callenderdaysdount[currenteventlist[k].date - 1]['requestName'] = ServiceList[j].requestName;
          this.callenderdaysdount[currenteventlist[k].date - 1]['VendorName'] = ServiceList[j].serviceBy;
        }

      }
    }

    for (let j = 0; j < ServiceList.length; j++) {
      debugger;
      let currenteventlist = this.callenderdaysdount.filter(x => this.datePipe.transform(x.dateformat, 'yyyy-MM-dd') == this.datePipe.transform(ServiceList[j].serviceDate, 'yyyy-MM-dd'));
      if (currenteventlist.length > 0) {
        debugger;
        this.callenderdaysdount[currenteventlist[0].date - 1]['buildingName'] = ServiceList[j].buildingName;
        this.callenderdaysdount[currenteventlist[0].date - 1]['endDate'] = ServiceList[j].endDate;
        this.callenderdaysdount[currenteventlist[0].date - 1]['asset'] = ServiceList[j].asset;

        if (this.callenderdaysdount[currenteventlist[0].date - 1]['ServiceHistoryHTML'] == undefined) {
          this.callenderdaysdount[currenteventlist[0].date - 1]['ServiceHistoryHTML'] = "";
        }
        this.callenderdaysdount[currenteventlist[0].date - 1]['ServiceHistoryHTML'] = this.callenderdaysdount[currenteventlist[0].date - 1]['ServiceHistoryHTML'] +
          "<span class='event_PendingBookCommunity'> Asset : " + ServiceList[j].asset +
          // "<br>  Building :" + MaintainanceList[j].buildingname +
          // "<br>  Floor :" + MaintainanceList[j].floor +
          // "<br>  Unit :" + MaintainanceList[j].unitID +
          "</span>";
      }

    }

  }


  public ShowSericeHistoryHTML(evn) {
    debugger;
    var html = evn.srcElement.innerText.split(' :');
    if (html.length <= 5) {
      debugger;
      let HTML = html[1].trim()
      let MaintenanceRequest = this.ServiceList.filter(x => x.asset.trim() == HTML);
      Swal.fire(({
        title: '<strong>Service <u>History</u></strong>',
        type: 'info',
        html:
          '<p style="font-size: 14px;text-align: start;margin-left: 32px;">Asset: ' + html[1] +
          '       <br>' +
          'Asset Type: ' + MaintenanceRequest[0].assetType +
          '       <br>' +
          'Building: ' + MaintenanceRequest[0].buildingName +
          '       <br>' +
          'Floor: ' + MaintenanceRequest[0].floor +
          '       <br>' +
          'Unit: ' + MaintenanceRequest[0].unitName +
          '       <br>' +
          'Warranty Till: ' + this.datePipe.transform(MaintenanceRequest[0].warrantyTill, 'MMM d, y') +
          '       <br>' +
          'Comments: ' + MaintenanceRequest[0].comments +
          '       <br>' +

          '</p>'
        ,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,

      }));
    }

  }

  public previousmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.buildcallender(this.FilteredServiceList);
  }
  public nextmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.FilteredServiceList);
  }

  public selectedBuilding;
  public FilterByBuildingname(evn) {
    debugger;
    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredServiceList = this.ServiceList;
    }
    else {
      // this.selectedBuilding = evn.target.value;
      //this.FilteredServiceList = this.ServiceList.filter(x => x.buildingID == this.selectedBuilding);
      debugger;
      this.BuildingID = evn.target.value;
      this.fmsservice.GetFloor(this.BuildingID).subscribe(
        res => {
          debugger;
          this.Floorlist = res;
          //this.FilteredServiceList = this.ServiceList.filter(x => x.buildingID == this.BuildingID);
        }
      )
    }
  }


  public selectedAssetsType;
  public FilterByAssetType(evn) {
    debugger;
    if (evn.target.value == "none") {
      this.FilteredServiceList = this.ServiceList;
    }
    else {
      this.selectedAssetsType = evn.target.value;
      this.FilteredServiceList = this.ServiceList.filter(x => x.buildingID == this.selectedBuilding && x.assetType == this.selectedAssetsType);
    }
  }


  public selectedAssets;
  public FilterByAsset(evn) {
    debugger;
    if (evn.target.value == "none") {
      this.FilteredServiceList = this.ServiceList;
    }
    else {
      this.selectedAssets = evn.target.value;
      this.FilteredServiceList = this.ServiceList.filter(x => x.buildingID == this.selectedBuilding && x.assetType == this.selectedAssetsType && x.asset == this.selectedAssets);
    }
  }

  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Service List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Service List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.FilteredServiceList);
  }

  AfterViewInit() {
    debugger;

  }

}
