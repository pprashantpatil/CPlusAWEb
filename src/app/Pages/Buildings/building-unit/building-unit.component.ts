import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-building-unit',
  templateUrl: './building-unit.component.html',
  styleUrls: ['./building-unit.component.css']
})
export class BuildingUnitComponent implements OnInit {
  public buildingPlansTitle;
  public pageMenuTitle;
  public buildingUnits_BreadChrumb;
  public buildingUnits_Building;
  public buildingUnits_Unit;
  public buildingUnits_Save;
  selectedlanguage: any;
  Buildinglist: any;
  BuildingID: any;
  Floorlist: any;
  units: any;
  unitname: any;
  Floorlist1: any;
  Building: any;
  ProjectID
  constructor(public fmsservice: FmsService, public router: Router) { }

  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.Building = this.ProjectID;
    this.getbuildingID(this.ProjectID);
    this.GetBuildingUnitLanguage(this.selectedlanguage);


    this.fmsservice.GetBuildinglist1(this.selectedlanguage).subscribe(data => {
      debugger
      let temp: any = data;
      this.Buildinglist = temp.filter(x => x.id == this.ProjectID);

      this.Buildinglist.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          debugger
          return -1;
        }
        debugger
        if (nameA > nameB) {
          debugger
          return 1;
        }
        debugger
        // names must be equal
        return 0;
      });

      debugger
    });



  }
  FloorName
  public GetFloor(evn) {
    debugger;
    this.FloorName = evn.target.value + '';
    //this.FilteredAssetList = this.AssetsList.filter(x => x.floor == this.FloorName);
  }
  getbuildingID(Building) {
    debugger
    this.Building = Building;
    this.fmsservice.GetUnitfloorbyBuildingID(this.Building).subscribe(data => {
      debugger
      this.Floorlist = data;
      for (var i = 0; i < this.Floorlist.length; i++) {
        if (this.Floorlist[i].unitname == null) {
          var iiii = '';
          this.Floorlist[i]["units"] = iiii
          debugger
        }
        else {
          var liuuu = this.Floorlist[i].unitname.split(',')
          if (liuuu == "") {

            var iiii = '';
            this.Floorlist[i]["units"] = iiii
            debugger
          }
          else {
            var iii = liuuu.length
            this.Floorlist[i]["units"] = iii
          }
        }
      }
    })
  }
  public GetBuildingUnitLanguage(languageid) {
    this.fmsservice.GetBuildingUnitLanguage(languageid).subscribe(
      res => {
        debugger;
        this.buildingPlansTitle = res[0].buildingPlansTitle;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.buildingUnits_BreadChrumb = res[0].buildingUnits_BreadChrumb;
        this.buildingUnits_Building = res[0].buildingUnits_Building;
        this.buildingUnits_Unit = res[0].buildingUnits_Unit;
        this.buildingUnits_Save = res[0].buildingUnits_Save;
        this.unitname = res[0].unitname;
      }
    )
  }


  


  InsertUnit_Master(data) {
    debugger

    for (var i = 0; i < data.length; i++) {
      debugger
      if (data[i].uid == null) {
        debugger
        var Filter = {
          'FloorID': data[i].id,
          'BuildingID': this.Building,
          'Floor': data[i].floor,
          'Unit1': data[i].unitname != "" ? data[i].unitname : null,
        }
        debugger
        this.fmsservice.InsertUnit_Master(Filter).subscribe(data => {
          debugger
          if (data != undefined) {
            Swal.fire("Project Unit Saved Successfully")
          }
        });






      }

      else {

        // data.forEach(element => {
        //   debugger
        //   var Filter = {
        //     'UID':element.uid,
        //     'FloorID': element.id,
        //     'BuildingID': this.BuildingID,
        //     'Floor': element.floor,
        //     'Unit1': element.unitname!=""?element.unitname:null,

        //     // FloorID: value.id,
        //     // BuildingID:vm.building.id,
        //     // Floor: value.floor,
        //     // Unit: value.units
        //   }
        //   debugger
        //   this.fmsservice.Updateunitmaster(Filter).subscribe(data => {
        //     debugger
        //     if (data != undefined) {


        //     }
        //   });
        // });

        // Swal.fire("Building Unit Saved Successfully")


        // this.GetBuildingUnitLanguage(this.selectedlanguage);

        // this.Floorlist.length = 0;
        // debugger
        // this.fmsservice.GetBuildinglist1(this.selectedlanguage).subscribe(data => {
        //   debugger
        //   this.Buildinglist = data;

        //   this.Buildinglist.sort(function (a, b) {
        //     var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        //     var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        //     if (nameA < nameB) {
        //       debugger
        //       return -1;
        //     }
        //     debugger
        //     if (nameA > nameB) {
        //       debugger
        //       return 1;
        //     }
        //     debugger
        //     // names must be equal
        //     return 0;
        //   });

        //   debugger
        // });

      }
    }

    Swal.fire("Project Unit Saved Successfully")


    this.GetBuildingUnitLanguage(this.selectedlanguage);

    this.Floorlist.length = 0;
    debugger
    this.fmsservice.GetBuildinglist1(this.selectedlanguage).subscribe(data => {
      debugger
      this.Buildinglist = data;

      this.Buildinglist.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          debugger
          return -1;
        }
        debugger
        if (nameA > nameB) {
          debugger
          return 1;
        }
        debugger
        // names must be equal
        return 0;
      });

      debugger
    });



  }

}
