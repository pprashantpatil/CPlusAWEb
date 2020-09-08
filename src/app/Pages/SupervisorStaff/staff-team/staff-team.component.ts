import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-staff-team',
  templateUrl: './staff-team.component.html',
  styleUrls: ['./staff-team.component.css']
})
export class StaffTeamComponent implements OnInit {

  constructor(public fmsservice: FmsService, ) { }
  public leavelist: any;
  selectedlanguage: any;
  BuildingStaffList: any;
  Staffteamlist: any;
  Staffsearch: any;

  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.fmsservice.GetBuildingStaff(this.selectedlanguage).subscribe(
      res => {
        debugger;
        this.BuildingStaffList = res;



        let StaffID = localStorage.getItem("userid")
        var List = this.BuildingStaffList.filter(x => x.supervisorID == StaffID)

        this.Staffteamlist = List
      }
    )
  }




}
