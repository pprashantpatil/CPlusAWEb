import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-payment-schedule',
  templateUrl: './payment-schedule.component.html',
  styleUrls: ['./payment-schedule.component.css']
})
export class PaymentScheduleComponent implements OnInit {

  constructor(public fmsservice: FmsService, public router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    //this.GetPayment_Schedule();
    this.GetBuildinglist(1);
    // this.GetTenantList(1);
    this.BuildingID=0;
    this.route.params.subscribe(params => {
      debugger;
      if (params['BuildingID'] != undefined) {
        this.BuildingID=params['BuildingID'];
        this.RentEntity.Floor=params['FloorID'];
        this.RentEntity.Unit=params['UnitID'];
        this.GetBuildinglist(1);
        this.GetFloor(this.BuildingID);
        this.GetUnit(this.RentEntity.Floor);
        this.UnitlistID(this.RentEntity.Unit);
      }

    }
    );
  }

  PaymentSchedule;
  filteredPaymentSchedule;
  BuildingSearch;
  TenantNamelist = 0;

  public RentEntity = {
    Floor: 0,
    Unit: 0
  }


  public GetTenant(evn) {
    debugger;
    let TenantID = evn.target.value
    this.GetPayment_Schedule(TenantID);
  }

  public GetPayment_Schedule(TenantID) {
    debugger;
    this.fmsservice.GetPayment_Schedule(TenantID).subscribe(
      res => {
        this.PaymentSchedule = res;
        this.filteredPaymentSchedule = this.PaymentSchedule;
      }
    )
  }
  Buildinglist;
  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        this.Buildinglist = res;
      }
    )
  }
  BuildingID;
  Floorlist;
  public GetFloor(evn) {
    if (evn.target) {
      this.BuildingID = evn.target.value;
    } else {
      this.BuildingID = evn;
    }
    this.fmsservice.GetFloor(this.BuildingID).subscribe(
      res => {
        this.Floorlist = res;
      }
    )
  }

  FloorID;
  Unitlist;
  public GetUnit(evn) {
    if (evn.target) {
      this.FloorID = evn.target.value;
    } else {
      this.FloorID = evn;
    }
    this.fmsservice.GetUnit_MasterbybID(this.BuildingID, this.RentEntity.Floor).subscribe(
      res => {
        this.Unitlist = res;
      }
    )
  }
  UnitID;
  public UnitlistID(evn) {

    if (evn.target) {
      this.UnitID = evn.target.value;
    } else {
      this.UnitID = evn;
    }
    // let UnitID = evn.target.value;
    this.GetTenantList(1, this.UnitID);

  }


  Tenentlist=[];
  public GetTenantList(languageid, UnitID) {
    this.fmsservice.GetTenantList(languageid).subscribe(
      res => {
        debugger;
        this.Tenentlist = res.filter(x => x.unit == UnitID);
        if(this.Tenentlist.length==0){
          Swal.fire("This Unit is Not Sold")
        }else{
          this.TenantNamelist=this.Tenentlist[0].id;

          this.fmsservice.GetPayment_Schedule(this.TenantNamelist).subscribe(
            res => {
              this.PaymentSchedule = res;
              this.filteredPaymentSchedule = this.PaymentSchedule;
            }
          )
        }
       
      }
    )
  }


  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Access Report ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Access Report'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.filteredPaymentSchedule);
  }
}
