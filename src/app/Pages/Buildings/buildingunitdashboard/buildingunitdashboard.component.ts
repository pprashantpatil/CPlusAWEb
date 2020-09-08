import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-buildingunitdashboard',
  templateUrl: './buildingunitdashboard.component.html',
  styleUrls: ['./buildingunitdashboard.component.css']
})
export class BuildingunitdashboardComponent implements OnInit {
  selectedlanguage: any;
  Buildinglist: any;
  building: any;
  buildingName: any;
  flordetails: any;
  floorlist: any;
  floorID: any;
  buildingunitlist: any;
  unitname: any;
  unitnameID: any;
  unitbuilding: any;
  uintfloorID: any;
  uname: any;
  ProjectID: any;
  public Search;



  constructor(public fmsservice: FmsService) { }

  ngOnInit() {

    this.selectedlanguage = localStorage.getItem('selectedLanguageID');

    this.ProjectID = localStorage.getItem('ProjectID');
    //this.addbuilding(this.ProjectID)
    this.fmsservice.GetBuildinglist(this.selectedlanguage).subscribe(
      res => {
        debugger
        let temp: any = res;
        this.Buildinglist = temp.filter(x => x.id = localStorage.getItem('ProjectID') && x.companyID == localStorage.getItem('userid'));
       this.ProjectID = localStorage.getItem('ProjectID');
        this.buildingName = this.Buildinglist[0].name;

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

    );

    this.fmsservice.GetUnit_MasterByBuildingID(this.ProjectID).subscribe(data => {
      debugger

      this.buildingunitlist = data;
    })
    this.fmsservice.GetFloor(this.ProjectID).subscribe(data => {
      debugger
      this.flordetails = data
      this.floorlist = this.flordetails.floor
    })

  }


  fliterbuilding(ProjectID) {
    debugger
    this.floorID = ''
    this.building = ProjectID.target.value;

    var list1 = this.Buildinglist.filter(X => X.id == this.building)
    debugger
    this.buildingName = list1[0].name

    debugger
    this.fmsservice.GetFloor(this.building).subscribe(data => {
      debugger
      this.flordetails = data
      this.floorlist = this.flordetails;//.floor
    })


    this.fmsservice.GetUnit_MasterByBuildingID(this.building).subscribe(data => {
      debugger

      this.buildingunitlist = data;
    })


  }


  filterfloor(floorID) {
    debugger
    this.floorID = floorID.target.value;

  }


  Editunitname(data, data1) {
    debugger
    this.unitname = data1
    this.unitnameID = data

  }


  Updateunitname(data) {
    var filter = {
      'ID': data,
      'uniteID': this.unitname
    }
    debugger
    this.fmsservice.UpdateUnit_Master(filter).subscribe(data => {
      debugger
      if (data != undefined) {

        Swal.fire("Unit Name Updated Successfully")

        this.fmsservice.GetUnit_MasterByBuildingID(this.building).subscribe(data => {
          debugger

          this.buildingunitlist = data;
        })
      }
    })

  }

  Deleteunit(UnitID) {
    debugger

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover' + ' ' + this.buildingName + ' ' + 'Property Unit!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsservice.DeleteUnit_MasterBYID(UnitID).subscribe(data => {
          if (data != undefined) {
            Swal.fire(
              'Deleted!',
              'Your Unit has been deleted.',
              'success'
            )

            this.fmsservice.GetUnit_MasterByBuildingID(this.building).subscribe(data => {
              debugger

              this.buildingunitlist = data;
            })


          }
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Unit is safe :)',
          'error'
        )
      }
    })



  }




  addbuilding(ProjectID) {
    debugger
    this.floorID = ''
    this.unitbuilding = ProjectID.target.value;

    debugger
    this.fmsservice.GetFloor(this.unitbuilding).subscribe(data => {
      debugger
      this.flordetails = data

    })
  }


  addfloor(floorID) {
    debugger
    this.uintfloorID = floorID.target.value;

  }



  addunit() {
    debugger
    if ((this.uintfloorID || this.unitbuilding || this.uname) == undefined) {

      alert("Please Enter All Values")
    }


    else {

      var filter = {
        'FloorID': this.uintfloorID,
        'BuildingID': this.unitbuilding,
        'Floor': '',
        'Unit1': this.uname,
      }

      this.fmsservice.InsertUnit_Master(filter).subscribe(data => {
        debugger
        if (data != undefined) {

          Swal.fire(" Unit Added Successfully")
        }
      });
    }



  }






}
