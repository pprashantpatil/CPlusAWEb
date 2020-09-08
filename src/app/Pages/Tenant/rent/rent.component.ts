import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ExportToCsv } from 'export-to-csv';


@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  public pageMenuTitle;
  public tenentRent_PageTitle;
  public tenentRent_breadchrumb;
  public tenentRent_button_New;
  public tenentRent_Building;
  public tenentRent_Floor;
  public tenentRent_Unit;
  public tenentRent_TenantName;
  public tenentRent_Date;
  public tenentRent_RentAmount;
  public tenentRent_PaymentMode;
  public tenentRent_Rent_for_the_month_of;
  public tenentRent_Comments;
  public tenentRent_Actions;
  public RentList: any;
  public Buildinglist;
  public FilteredRentList;
  public confirmButtonText;
  public BuildingSearch;
  public Monthlist: any;
  public month: any;
  public selectedlanguage: any;

  constructor(public fmsservice: FmsService, public router: Router) { }

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetTenentRentLanguageByLanguageID(selectedlanguage);
    this.GetRentDashboard(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.GetMonthMaster();
  }

  GetTenentRentLanguageByLanguageID(id) {
    this.fmsservice.GetTenentRentLanguageByLanguageID(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.tenentRent_PageTitle = res[0].tenentRent_PageTitle;
        this.tenentRent_breadchrumb = res[0].tenentRent_breadchrumb;
        this.tenentRent_button_New = res[0].tenentRent_button_New;
        this.tenentRent_Building = res[0].tenentRent_Building;
        this.tenentRent_Floor = res[0].tenentRent_Floor;
        this.tenentRent_Unit = res[0].tenentRent_Unit;
        this.tenentRent_TenantName = res[0].tenentRent_TenantName;
        this.tenentRent_Date = res[0].tenentRent_Date;
        this.tenentRent_RentAmount = res[0].tenentRent_RentAmount;
        this.tenentRent_PaymentMode = res[0].tenentRent_PaymentMode;
        this.tenentRent_Rent_for_the_month_of = res[0].tenentRent_Rent_for_the_month_of;
        this.tenentRent_Comments = res[0].tenentRent_Comments;
        this.tenentRent_Actions = res[0].tenentRent_Actions;
      }
    )
  }

  public GetRentDashboard(languageid) {
    debugger
    this.fmsservice.GetRentDashboard(languageid).subscribe(
      res => {
        debugger;
        this.RentList = res;
        this.FilteredRentList = this.RentList;
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

  public FilteredByBuildingName(evn) {
    debugger;
    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredRentList = this.RentList;
    }
    else {
      let selectedBuilding = evn.target.value;
      this.FilteredRentList = this.RentList.filter(x => x.buildingName == selectedBuilding);
    }
  }



  public EditTenentRent(evn) {
    debugger;
    let RentID = evn.id;
    this.router.navigate(['/UpdateRent', RentID]);
  }

  public DeleteTenentRent(evn) {
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
          this.DeleteRent(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }
  public DeleteRent(ID) {
    debugger;
    this.fmsservice.DeleteRent(ID).subscribe(res => {
      debugger;
      this.GetRentDashboard(1);
    })

  }



  exporttoexcel() {
    debugger;

    var ExportData = [];
    for (let i = 0; i < this.FilteredRentList.length; i++) {
      debugger;
      let singleData = {
        buildingName: String,
        floor: String,
        unit: String,
        tenantname: String,
        rentAmount: String,
        paymentMode: String,
        rentForMonthOf: String,
        comments: String,

      }
      singleData.buildingName = this.FilteredRentList[i].buildingName;
      singleData.floor = this.FilteredRentList[i].floor;
      singleData.unit = this.FilteredRentList[i].unit;
      singleData.tenantname = this.FilteredRentList[i].tenantname;
      singleData.rentAmount = this.FilteredRentList[i].rentAmount;
      // singleData.nextServiceDue= this.datepipe.transform(this.FilteredAssetList[i].nextServiceDue, 'yyyy-MM-dd');
      //  singleData.warrantyTill=this.datepipe.transform(this.FilteredAssetList[i].warrantyTill,'yyyy-MM-dd');
      singleData.paymentMode = this.FilteredRentList[i].paymentMode;
      singleData.rentForMonthOf = this.FilteredRentList[i].rentForMonthOf;
      singleData.comments = this.FilteredRentList[i].comments;

      ExportData.push(singleData);


      debugger
    }

    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Assets List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Assets List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    debugger
    csvExporter.generateCsv(ExportData);
  }

  public GetMonthMaster() {
    this.fmsservice.GetMonthMaster().subscribe(data => {
      debugger
      this.Monthlist = data;
    })
  }

  public GetMonth(even) {
    debugger;
    this.month = even.target.value;
  }
}
