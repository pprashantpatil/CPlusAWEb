import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-new-utility-payments',
  templateUrl: './new-utility-payments.component.html',
  styleUrls: ['./new-utility-payments.component.css']
})
export class NewUtilityPaymentsComponent implements OnInit {
  pickeroptions: NgDateRangePickerOptions;

  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }
  public pageMenuTitle;
  public utilityPayments_PageTitle;
  public utilityPayments_BreadChrumb;
  public utilityPayments_BillType;
  public utilityPayments_Date;
  public utilityPayments_Month;
  public utilityPayments_Building;
  public utilityPayments_Floor;
  public utilityPayments_Unit;
  public utilityPayments_Tenant;
  public utilityPayments_Amount;
  public utilityPayments_Attachment;
  public utilityPayments_Save;
  public BillTypeList;
  public Buildinglist;
  public Floorlist;
  public Tenentlist;
  public BuildingID;
  public UtilityEntity = {
    TenantID: 0,
    BillType: 0,
    Month: "January",
    Amount: "",
    BuildingID: 0,
    Floor: 0,
    Unit: 0,
    PhotoUrl: "NULL",
    BillDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    LanguageID: 1
  }


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
    this.GetNewUtilityPaymentLanguage(selectedlanguage);
    this.GetPaymentsFor(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    //this.GetTenantListByBuildingID(selectedlanguage);

  }

  public GetNewUtilityPaymentLanguage(languageid) {
    this.fmsservice.GetNewUtilityPaymentLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.utilityPayments_PageTitle = res[0].utilityPayments_PageTitle;
        this.utilityPayments_BreadChrumb = res[0].utilityPayments_BreadChrumb;
        this.utilityPayments_BillType = res[0].utilityPayments_BillType;
        this.utilityPayments_Date = res[0].utilityPayments_Date;
        this.utilityPayments_Month = res[0].utilityPayments_Month;
        this.utilityPayments_Building = res[0].utilityPayments_Building;
        this.utilityPayments_Floor = res[0].utilityPayments_Floor;
        this.utilityPayments_Unit = res[0].utilityPayments_Unit;
        this.utilityPayments_Tenant = res[0].utilityPayments_Tenant;
        this.utilityPayments_Amount = res[0].utilityPayments_Amount;
        this.utilityPayments_Attachment = res[0].utilityPayments_Attachment;
        this.utilityPayments_Save = res[0].utilityPayments_Save;
      }
    )
  }


  public GetPaymentsFor(languageid) {
    this.fmsservice.GetPaymentsFor(languageid).subscribe(
      res => {
        debugger;
        this.BillTypeList = res;
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
        this.GetTenantListByBuildingID(1, this.BuildingID);
      }
    )
  }

  public GetTenantListByBuildingID(languageid, BuildingID) {
    debugger;
    this.fmsservice.GetTenantListByBuildingID(languageid, this.BuildingID).subscribe(
      res => {
        debugger;
        this.Tenentlist = res;
      }
    )
  }

  onFilesAdded(files: File[]) {
    this.fmsservice.UploadUtilitiesDocument(files).subscribe(res => {
      this.UtilityEntity.PhotoUrl = res.toString();
    })
  }


  Isempty = false;
  public InsertUtilities() {
    debugger;

    let mandatoryfields = {
      BillType: this.UtilityEntity.BillType,
      BuildingID: this.UtilityEntity.BuildingID,
      Floor: this.UtilityEntity.Floor,
      Unit: this.UtilityEntity.Unit
    }
    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    } else {
      this.UtilityEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
      let test = this.UtilityEntity;
      this.fmsservice.InsertUtilities(this.UtilityEntity).subscribe(res => {
        debugger;
        Swal.fire('Utilities Successfully Saved!')
        this.Clear();
      })
    }
  }

  public Clear() {
    this.UtilityEntity.TenantID = 0,
      this.UtilityEntity.BillType = 0,
      this.UtilityEntity.Month = "January",
      this.UtilityEntity.Amount = "",
      this.UtilityEntity.BuildingID = 0,
      this.UtilityEntity.Floor = 0,
      this.UtilityEntity.Unit = 0,
      this.UtilityEntity.PhotoUrl = "NULL",
      this.UtilityEntity.BillDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      this.UtilityEntity.LanguageID = 1
  }


  public FloorID;
  public UnitByID(evn) {
    debugger;
    this.FloorID = evn.target.value;
    this.GetUnit_MasterbybID(this.BuildingID, this.FloorID);
  }

  public Unitslist;
  public GetUnit_MasterbybID(BuildingID, FloorID) {
    this.fmsservice.GetUnit_MasterbybID(BuildingID, FloorID).subscribe(
      res => {
        this.Unitslist = res;
      }
    )
  }

}
