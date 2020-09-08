import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-newinspection',
  templateUrl: './newinspection.component.html',
  styleUrls: ['./newinspection.component.css']
})
export class NewinspectionComponent implements OnInit {
  public Buildinglist: any[];
  BuildingID: 0;
  Floorlist: any[];
  selectedlanguage: any;
  FloorID: 0;
  Unitlist: any;
  Floor: any;
  Unit: 0;
  Tenentlist: any[];
  PhoneNo: any;
  TenantName: any;
  Isempty: boolean;
  //Date:Date;
  Time:any;
  Comments: any;
  tenantID: any;
  paramID: any;
  inspectionlist: any;
  inspecID: any;
  confirmButtonText: string;
  InspectionDate=this.datepipe.transform(new Date(), 'yyyy-MM-dd')

  constructor(public fmsservice: FmsService, public router: Router, public activatedRoute: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {
   this.BuildingID=0;
   this.FloorID=0;
   this.Unit=0;
    this.fmsservice.GetBuildinglist(1).subscribe(
      res => {
        debugger
        this.Buildinglist = res;
      }
    )
  
    this.activatedRoute.params.subscribe(data => {
      debugger
      this.paramID = data['id']
      if (this.paramID != undefined) {
        this.GetInspection_MenuByID(this.paramID);


      }
    })
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');

    this.GetBuildinglist(this.selectedlanguage);


  }

  



  public GetBuildinglist(languageid) {
    debugger
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger
        this.Buildinglist = res;
      }
    )
  }

  filter
  public GetInspection_MenuByID(ID) {
   
    debugger
    this.fmsservice.GetInspection_MenuByID(ID).subscribe(


      res => {
        debugger; 
        this.filter=res;

        this.fmsservice.GetBuildinglist(1).subscribe(
          res => {
            debugger
            this.Buildinglist = res;
          }
        )

        this.BuildingID = this.filter["building"];
        this.FloorID = this.filter["floor"];
        this.Unit = this.filter["unit"];

        this.fmsservice.GetFloor(this.BuildingID).subscribe(
          res => {
    
            this.Floorlist = res;

            var list=this.Floorlist.filter(x=>x.id== this.FloorID )
            this.FloorID=list[0].id

          }
        )


        this.fmsservice.GetUnit_MasterbybID(this.BuildingID, this.FloorID).subscribe(
          res => {
            this.Unitlist = res;

            var list=this.Unitlist.filter(x=>x.id== this.Unit)

            this.Unit=list[0].id
          }
        )




       
        this.TenantName = this.filter["tenantName"];
        this.PhoneNo = this.filter["phoneNo"];
        this.InspectionDate =this.datepipe.transform(this.filter["inspection_Date"], 'yyyy-MM-dd');
        this.Time = this.filter["inspection_Time"],
        this.Comments=this.filter["comments"]
      }
    )
  }





  public GetFloor(evn) {


    this.BuildingID = evn.target.value;



    this.fmsservice.GetFloor(this.BuildingID).subscribe(
      res => {

        this.Floorlist = res;
      }
    )
  }

  public UnitByID(evn) {
    this.FloorID = evn.target.value;
    this.fmsservice.GetUnit_MasterbybID(this.BuildingID, this.FloorID).subscribe(
      res => {
        this.Unitlist = res;
      }
    )
  }


  public UnitlistID(evn) {
    debugger;

    this.Unit = evn.target.value;

    this.fmsservice.GetTenantList(this.selectedlanguage).subscribe(
      res => {
        debugger;
        this.Tenentlist = res;

        var list = this.Tenentlist.filter(x => x.unit == this.Unit)
        debugger
        this.Tenentlist = list

        this.TenantName = this.Tenentlist[0].tenantName;
        this.PhoneNo = this.Tenentlist[0].phoneNo;
        this.tenantID = this.Tenentlist[0].id;
        debugger
      }
    )

  }

  InsertInspection() {
    debugger

    let mandatoryfields = {

      'Inspection_Date':this.InspectionDate,
      'Inspection_Time': this.Time,
      'Building': this.BuildingID,
      'Floor': this.FloorID,
      'Unit': this.Unit,
      'Comments': this.Comments,
      'Tenant_Name': this.tenantID,
      'Phone_No': this.PhoneNo
    }
    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    } else {

      this.fmsservice.InsertInspection_Menu(mandatoryfields).subscribe(res => {
        debugger;
        Swal.fire(' Inspection Successfully Saved!');
        if (this.confirmButtonText = "OK") {
          this.router.navigate(['/Inspectionmenu']);
        }
        this.Clear();

      })
    }

  }

  UpdateInspection() {
    {
      debugger

      let mandatoryfields = {
        'ID': this.paramID,
        'Inspection_Date': this.InspectionDate,
        'Inspection_Time': this.Time,
        'Building': this.BuildingID,
        'Floor': this.FloorID,
        'Unit': this.Unit,
        'Comments': this.Comments,
        'Tenant_Name': this.tenantID,
        'Phone_No': this.PhoneNo
      }

      this.fmsservice.UpdateInspection_Menu(mandatoryfields).subscribe(res => {
        debugger;
        Swal.fire(' Updated Successfully');
        this.Clear();
        if (this.confirmButtonText = "OK") {
          this.router.navigate(['/Inspectionmenu']);
        }
      })
    }



  }

  Clear() {
   
    this.BuildingID = 0
    this.FloorID = 0
    this.Unit = 0
    this.Comments = ''
    this.TenantName = ''
    this.PhoneNo = ''
  }



  ststussss(data) {
    debugger

    this.inspecID = data
  }

  updatens() {
    debugger


  }


}
