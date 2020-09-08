import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-communityhall',
  templateUrl: './communityhall.component.html',
  styleUrls: ['./communityhall.component.css']
})
export class CommunityhallComponent implements OnInit {
  public communityHallTitle;
  public pageMenuTitle;
  public communityHall_BreadChrumb;
  public communityHall_AddNewButton;
  public communityHall_Search;
  public communityHall_Building;
  public communityHall_Community;
  public communityHall_ContactName;
  public communityHall_PhoneNumber;
  public communityHall_AmountorDay;
  public communityHall_AdditionalCharges;
  public communityHall_Action;
  public communityHallSearch;
  public BuildingPlanList;
  public Buildinglist;
  selectedlanguage: any;
  BuildID: any;
  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetCommunityHallLanguage(this.selectedlanguage);
    this.GetBuildingHallDetailsdashboard(this.selectedlanguage);
    this.GetBuildinglist(this.selectedlanguage)
  }

  public GetCommunityHallLanguage(languageid) {
    this.fmsservice.GetCommunityHallLanguage(languageid).subscribe(
      res => {
        debugger;
        this.communityHallTitle = res[0].communityHallTitle;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.communityHall_BreadChrumb = res[0].communityHall_BreadChrumb;
        this.communityHall_AddNewButton = res[0].communityHall_AddNewButton;
        this.communityHall_Search = res[0].communityHall_Search;
        this.communityHall_Building = res[0].communityHall_Building;
        this.communityHall_Community = res[0].communityHall_Community;
        this.communityHall_ContactName = res[0].communityHall_ContactName;
        this.communityHall_PhoneNumber = res[0].communityHall_PhoneNumber;
        this.communityHall_AmountorDay = res[0].communityHall_AmountorDay;
        this.communityHall_AdditionalCharges = res[0].communityHall_AdditionalCharges;
        this.communityHall_Action = res[0].communityHall_Action;

      }
    )
  }

  public GetBuildingHallDetailsdashboard(languageid) {
    this.fmsservice.GetBuildingHallDetailsdashboard(languageid).subscribe(
      res => {
        debugger;
        this.BuildingPlanList = res;
      }
    )
  }

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        this.Buildinglist = res;
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
      }
    )
  }



  HallName;
  DeleteBuildingHallDetails(ID, hallName) {
    debugger
    this.HallName = hallName
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover Function Hall file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsservice.DeleteBuildingHallDetails(ID).subscribe(data => {
          if (data != undefined) {
            Swal.fire(
              'Deleted!',
              'Your Function Hall has been deleted.',
              'success'
            )

            this.GetCommunityHallLanguage(this.selectedlanguage);
            this.GetBuildingHallDetailsdashboard(this.selectedlanguage);
            this.GetBuildinglist(this.selectedlanguage);
            this.InsertLoginDetails();
          }
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Function Hall is safe :)',
          'error'
        )
      }
    })



  }



  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Board Room ' + this.HallName + ' Deleted',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Board Room",
      "Action": 'Delete Board Room',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  fliterbuilding(BuildID) {
    debugger
    this.BuildID = BuildID.target.value;
    if (this.BuildID == 'none') {

      this.GetBuildingHallDetailsdashboard(this.selectedlanguage);

    }

    else {

      this.fmsservice.GetBuildingHallDetailsdashboard(this.selectedlanguage).subscribe(
        res => {
          debugger;
          this.BuildingPlanList = res;

          var list = this.BuildingPlanList.filter(X => X.buildingID == this.BuildID)

          this.BuildingPlanList = list;
        }
      )


      debugger
    }

  }

}
