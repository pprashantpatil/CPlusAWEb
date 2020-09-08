import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ExportToCsv } from 'export-to-csv';



@Component({
  selector: 'app-tenent-history',
  templateUrl: './tenent-history.component.html',
  styleUrls: ['./tenent-history.component.css']
})
export class TenentHistoryComponent implements OnInit {
  pickeroptions: NgDateRangePickerOptions;
  ;

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public pageMenuTitle;
  public tenanthistory_PageTitle;
  public tenanthistory_BreadChrumb;
  public tenanthistory_Search;
  public tenanthistory_TenantName;
  public tenanthistory_Tenanttype;
  public tenanthistory_Mobile;
  public tenanthistory_Building;
  public tenanthistory_Floor;
  public tenanthistory_Unit;
  public tenanthistory_StartDate;
  public tenanthistory_EndDate;
  public tenanthistory_Actions;
  public TenentList: any;
  public FilteredTenentList;
  public Buildinglist;
  public BuildingID;
  public Floorlist;
  public confirmButtonText;
  public Attachmentlist;
  public Agreementslist;
  public Search;


  ngOnInit() {
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,

    };

    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetTenanthistoryLanguage(selectedlanguage);
    this.GetTenantHistoryList(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
  }
  public GetTenanthistoryLanguage(languageid) {
    this.fmsservice.GetTenanthistoryLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.tenanthistory_PageTitle = res[0].tenanthistory_PageTitle;
        this.tenanthistory_BreadChrumb = res[0].tenanthistory_BreadChrumb;
        this.tenanthistory_Search = res[0].tenanthistory_Search;
        this.tenanthistory_TenantName = res[0].tenanthistory_TenantName;
        this.tenanthistory_Tenanttype = res[0].tenanthistory_Tenanttype;
        this.tenanthistory_Mobile = res[0].tenanthistory_Mobile;
        this.tenanthistory_Building = res[0].tenanthistory_Building;
        this.tenanthistory_Floor = res[0].tenanthistory_Floor;
        this.tenanthistory_Unit = res[0].tenanthistory_Unit;
        this.tenanthistory_StartDate = res[0].tenanthistory_StartDate;
        this.tenanthistory_EndDate = res[0].tenanthistory_EndDate;
        this.tenanthistory_Actions = res[0].tenanthistory_Actions;

      }
    )
  }


  public GetTenantHistoryList(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetTenantHistoryList("2019-01-01", "2019-12-31", languageid).subscribe(
      res => {
        debugger;
        this.TenentList = res;
        this.FilteredTenentList = this.TenentList;
      }
    )
  }


  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;
      }
    )
  }

  public GetFloor(evn) {
    debugger;
    this.BuildingID = evn.target.value;
    this.fmsservice.GetFloor(this.BuildingID).subscribe(
      res => {
        debugger;
        this.Floorlist = res;
        this.FilteredTenentList = this.TenentList.filter(x => x.buildingid == this.BuildingID);
      }
    )
  }

  
  


  public FilteredFloorList(evn) {
    debugger;
    if (evn.target.value == "none") {
      this.FilteredTenentList = this.TenentList;
    }
    else {
      this.FilteredTenentList = this.TenentList.filter(x => x.buildingid == this.BuildingID && x.floorID == evn.target.value);
    }
   this.getunitlist(evn.target.value);

  }

  FloorID
  unitList;
  public getunitlist(floorid) {
    debugger;
    this.FloorID = floorid;
    this.fmsservice.GetUnit_MasterbybID(this.BuildingID, this.FloorID).subscribe(res => {
      this.unitList = res;
    })
  }



  public DeleteTenent(evn) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        if (this.confirmButtonText = "Yes, delete it!") {
          this.DeleteTenant(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }


  public DeleteTenant(ID) {
    debugger;
    this.fmsservice.DeleteTenant(ID).subscribe(res => {
      debugger;
      this.GetTenantHistoryList(1);
    })
  }

  public TenentAttachment(evn) {
    debugger;
    this.GetTenantDocumentByID(evn.id)
  }


  NoImagesAvail
  public GetTenantDocumentByID(ID) {
    debugger;
    this.fmsservice.GetTenantDocumentByID(ID).subscribe(
      res => {
        debugger;
        this.Attachmentlist = res;
        if (res.length == 0) {
          this.NoImagesAvail = true;
        }
        else {
          this.NoImagesAvail = false;
        }
      }
    )
  }
  public TenentAgreement(evn) {
    debugger;
    this.fmsservice.GetTenantAgreementByID(evn.id).subscribe(
      res => {
        debugger;
        this.Agreementslist = res;
        if (res.length == 0) {
          this.NoImagesAvail = true;
        }
        else {
          this.NoImagesAvail = false;
        }
      }
    )
  }


  exporttoexcel() {
debugger
    var thistry=[]

    for(var i=0;i<this.FilteredTenentList.length;i++){
var tenenthistry={
  tenantName: this.FilteredTenentList[i].tenantName,
  accountNumber: this.FilteredTenentList[i].accountNumber,
accountType: this.FilteredTenentList[i].accountType,
address: this.FilteredTenentList[i].address,
buildingName: this.FilteredTenentList[i].buildingName,
comments:this.FilteredTenentList[i].comments,
electricMeterNo: this.FilteredTenentList[i].electricMeterNo,
email:this.FilteredTenentList[i].email,
emergencyContactNo: this.FilteredTenentList[i].emergencyContactNo,
exitTerms: this.FilteredTenentList[i].exitTerms,
floor:this.FilteredTenentList[i].floor,
gasMeterNo: this.FilteredTenentList[i].gasMeterNo,
inventoryProvided: this.FilteredTenentList[i].inventoryProvided,
leaseEndDate: this.FilteredTenentList[i].leaseEndDate,
leasePeriod: this.FilteredTenentList[i].leasePeriod,
leaseStartDate: this.FilteredTenentList[i].leaseStartDate,
maintenanceAmount:this.FilteredTenentList[i].maintenanceAmount,
noOfAdults: this.FilteredTenentList[i].noOfAdults,
noOfChildren: this.FilteredTenentList[i].noOfChildren,
noOfPets:this.FilteredTenentList[i].noOfPets,
noOfResidents: this.FilteredTenentList[i].noOfResidents,
otherFee: this.FilteredTenentList[i].otherFee,
parkingSlots: this.FilteredTenentList[i].parkingSlots,
phoneNo: this.FilteredTenentList[i].phoneNo,
primaryContact: this.FilteredTenentList[i].primaryContact,
rentDueOn:this.FilteredTenentList[i].rentDueOn,
rentIncrement:this.FilteredTenentList[i].rentIncrement,
rentIncrementType:this.FilteredTenentList[i].rentIncrementType,
rentPerMonth: this.FilteredTenentList[i].rentPerMonth,
securityDeposit: this.FilteredTenentList[i].securityDeposit,
sinkingFund:this.FilteredTenentList[i].sinkingFund,
swiftCode: this.FilteredTenentList[i].swiftCode,

tenantType: this.FilteredTenentList[i].tenantType,
unitID:this.FilteredTenentList[i].unitID,
waterMeterNo: this.FilteredTenentList[i].waterMeterNo
}

debugger
thistry.push(tenenthistry) 
    }
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Tenents List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Tenents List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(thistry);
  }


  


}
