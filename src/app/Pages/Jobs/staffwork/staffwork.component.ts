import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { TabHeadingDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-staffwork',
  templateUrl: './staffwork.component.html',
  styleUrls: ['./staffwork.component.css']
})
export class StaffworkComponent implements OnInit {

  constructor(public fmsservice: FmsService, private router: Router, private route: ActivatedRoute, ) { }

  public stafflist: any;
  public staffid: any;
  public dayslist: any;
  public dayid: any;
  dropdownSettings = {}
  public UserRoleList = [];
  public date: any;
  public starttime: any;
  public endtime: any;
  public workdescription: any;
  public comments: any;
  public qwert = [];
  public tablecount: any;
  public staffname: any;
  public dayname: any;
  public stafftypelist: any;
  public stafftypeid: any;
  public staff = [];
  public stafftypename: any;
  public idcount: any;
  public unitname: any;
  public stages: any;
  public StageID: any;
  public StageList: any
  paramID
  FloorList: any
  ngOnInit() {

    this.StageID = 0;
    this.FloorID = 0;
    this.ProjectID = localStorage.getItem('ProjectID')
    this.route.params.subscribe(params => {
      debugger;
      if (params['pid'] != undefined) {
        this.BuildingID = params['pid'];
        this.fmsservice.GetUnit_MasterByBuildingID(this.BuildingID).subscribe(
          res => {
            this.UserRoleList = res;
          }
        )

      }
    }
    );
    this.GetBuildinglist(1);
    this.fmsservice.GetFloorTypebyBID(this.ProjectID).subscribe(
      res => {
        this.FloorList = res;
      }
    )
    this.BuildingID = this.ProjectID;
    this.fmsservice.GetStaffType(1).subscribe(data => {
      debugger
      this.stafftypelist = data;
      var i = this.stafftypelist.filter(x => x.id <= 14)
      this.staff = i;
    })
    // this.fmsservice.GetBuildingStages().subscribe(data => {
    //   debugger
    //   this.StageList = data;
    // })

    this.fmsservice.GetDaysMaster().subscribe(data => {
      debugger
      this.dayslist = data;
    })
    this.tablecount = 0;
    this.idcount = 1;


    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'unitID',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
  }


  UnitID
  ShowDetails: boolean;
  //selecteditemlist1 = [];
  //selecteditemlist = [];
  onItemSelect1(item: any) {
    debugger;
    this.selecteditemlist.push(item)
    this.UnitID = item.unitID;

    this.ShowDetails = true;
    this.GetStages()
  }

  selecteditemlist1 = [];
  selecteditemlist = [];
  onItemSelect(item: any) {
    debugger;
    this.selecteditemlist.push(item)
  }
  onItemDeSelect(item: any) {
    debugger;
    var index = this.selecteditemlist.findIndex(x => x.id == item.id)
    this.selecteditemlist.splice(index, 1);

  }

  onSelectAll(items: any) {
    debugger;
    console.log(items);
    this.selecteditemlist1.push(items)
    this.selecteditemlist = this.selecteditemlist1[0]
  }

  public GetStages() {
    debugger
    this.fmsservice.GetStagesByUnit(this.UnitID).subscribe(
      res => {
        debugger;
        this.stages = res;
      }
    )
  }



  public GetUnits(evn) {
    debugger;
    this.fmsservice.GetRemainingStagesByUnit(evn.target.value).subscribe(
      res => {
        debugger;
        let temp: any = res;
        this.StageList = temp;
      }
    )
  }


  // onItemDeSelect(item: any) {
  //   debugger;
  //   var index = this.selecteditemlist.findIndex(x => x.id == item.id)
  //   this.selecteditemlist.splice(index, 1);

  // }

  // onSelectAll(items: any) {
  //   debugger;
  //   console.log(items);
  //   this.selecteditemlist1.push(items)
  //   this.selecteditemlist = this.selecteditemlist1[0]
  // }



  Buildinglist;
  ProjectID
  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        let temp: any = res;
        this.Buildinglist = temp.filter(x => x.id == this.ProjectID);
      }
    )
  }


  BuildingID
  FloorID
  public GetBuildingID(evn) {
    this.BuildingID = evn.target.value;
    // this.GetUnit_MasterByBuildingID(this.BuildingID)
  }
  public GetFloorID(evn) {
    this.FloorID = evn.target.value;
    this.GetUnit_MasterbyfloorID(evn.target.value)
  }

  public GetUnit_MasterbyfloorID(FloorID) {
    this.fmsservice.GetUnit_MasterbyfloorID(FloorID).subscribe(
      res => {
        this.UserRoleList = res;
      }
    )
  }


  public GetStaffID(even) {
    debugger
    this.staffid = even.target.value;
    debugger
    for (let i = 0; i < this.stafflist.length; i++) {
      debugger
      if (this.stafflist[i].id == this.staffid) {
        debugger
        this.staffname = this.stafflist[i].name
      }
    }


  }
  public GetDayID(even) {
    this.dayid = even.target.value;

    for (let i = 0; this.dayslist.length; i++) {
      if (this.dayslist[i].id == this.dayid) {
        this.dayname = this.dayslist[i].day
      }
    }

  }

  public GetStaffTypeID(even) {
    debugger
    this.stafftypeid = even.target.value;
    for (let i = 0; i < this.staff.length; i++) {
      if (this.staff[i].id == this.stafftypeid) {
        this.stafftypename = this.staff[i].short
      }
    }
    this.getstafftypeid()
  }


  public getstafftypeid() {
    this.fmsservice.GetStaffByType(this.stafftypeid).subscribe(data => {
      debugger
      let temp: any = data;
      this.stafflist = temp.filter(x => x.companyID == localStorage.getItem('userid'));
    })
  }

  public insertdetails() {
    debugger
    if (this.staffid == undefined) {
      Swal.fire("Please Select Staff")
    }
    else {
      this.tablecount = 1;
      var entity = {
        'sno': this.idcount,
        'StaffID': this.staffid,
        'StaffTypeID': this.stafftypeid,
        'StaffTypeName': this.stafftypename,
        'StaffName': this.staffname,
        'Date': this.date,
        'DayName': this.dayname,
        // 'DayID': 0,
        // 'StartTime': this.starttime,
        // 'EndTime': this.endtime,
        'WorkDescription': this.workdescription,
        'Comments': 0,
        // 'StageID':this.stageid
      }
      this.idcount = this.idcount + 1;
      this.qwert.push(entity);
      this.date = "";
      this.starttime = "";
      this.endtime = "";
      this.workdescription = "";
      this.comments = "";
    }
  }


  public insertdetails1() {
    for (let i = 0; i < this.qwert.length; i++) {
      var entity2 = {
        'StaffID': this.qwert[i].StaffID,
        'Date': this.qwert[i].Date,
        // 'DayID': this.qwert[i].DayID,
        // 'StartTime': this.qwert[i].StartTime,
        // 'EndTime': this.qwert[i].EndTime,
        'WorkDescription': this.qwert[i].WorkDescription,
        'Comments': this.qwert[i].Comments,
        'StaffTypeID': this.qwert[i].StaffTypeID,
        'BuildingID': this.BuildingID,
        'Unit': this.UnitID,
        // 'StageID': this.qwert[i].StageID
      }
      this.fmsservice.InsertStaffWorkSchedule(entity2).subscribe(data => {
        debugger
        if (data != -1) {
          Swal.fire("Saved Successfully");
          this.tablecount = 0;
          this.qwert.length = 0
        }
        else {
          Swal.fire("Staff Already Scheduled This Time");
          this.qwert.length = 0;
          this.tablecount = 0;
        }
      })
    }
  }



  Enddate: any;
  public insertdetails2() {
    debugger;
    if (this.selecteditemlist.length == 0) {
      var entity3 = {
        'StaffID': this.staffid,
        'Date': this.date,
        'EndDate': this.Enddate,
        'WorkDescription': this.workdescription,
        'Comments': this.comments,
        'StaffTypeID': this.stafftypeid,
        'BuildingID': this.BuildingID,
        'Unit': "",
        'StageID': this.StageID,
        'FloorID': this.FloorID
      }
      this.fmsservice.InsertStaffWorkSchedule(entity3).subscribe(res => {
        debugger;
        Swal.fire('Successfully Saved!');
        this.router.navigate(['/StaffWorkdash']);
      })
    }
    else {
      for (let i = 0; i < this.selecteditemlist.length; i++) {
        var entity = {
          'StaffID': this.staffid,
          'Date': this.date,
          'EndDate': this.Enddate,
          'WorkDescription': this.workdescription,
          'Comments': this.comments,
          'StaffTypeID': this.stafftypeid,
          'BuildingID': this.BuildingID,
          'Unit': this.selecteditemlist[i].unitID,
          'StageID': this.StageID,
          'FloorID': this.FloorID
        }
        this.fmsservice.InsertStaffWorkSchedule(entity).subscribe(res => {
          debugger;
          Swal.fire('Successfully Saved!');
          this.router.navigate(['/StaffWorkdash']);
        })
      }
    }



  }


  public delete(sno) {
    debugger
    for (let i = 0; i < this.qwert.length; i++) {
      debugger
      if (sno == this.qwert[i].sno) {
        debugger
        this.qwert.splice(i, 1);
      }
    }

  }

  public GetStageID(event) {
    debugger
    this.StageID = event.target.value;
  }
}


