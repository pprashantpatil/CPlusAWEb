import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-timeline-plan-dash',
  templateUrl: './timeline-plan-dash.component.html',
  styleUrls: ['./timeline-plan-dash.component.css']
})
export class TimelinePlanDashComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }
  public buildingPlansTitle;
  public buildingPlans_BreadChrumb;
  public buildingPlans_AddNewButton;
  public buildingPlans_Building;
  public buildingPlans_PlanName;
  public buildingPlans_Plans;
  public buildingPlans_Actions;
  public pageMenuTitle;
  public BuildingPlanList;
  public Buildinglist;
  public selectedlanguage;
  public BuildingPlanFilterList;
  public BuildingSearch;
  dataModel: any;
  LoginTypeID;
  ProjectID: any
  ngOnInit() {
    debugger;
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetBuildingPlansLanguage(this.selectedlanguage);
    this.GetTimeLinePlan();
    this.GetBuildinglist(this.selectedlanguage)
  }

  public GetBuildingPlansLanguage(languageid) {
    this.fmsservice.GetBuildingPlansLanguage(languageid).subscribe(
      res => {

        this.buildingPlansTitle = res[0].buildingPlansTitle;
        this.buildingPlans_BreadChrumb = res[0].buildingPlans_BreadChrumb;
        this.buildingPlans_AddNewButton = res[0].buildingPlans_AddNewButton;
        this.buildingPlans_Building = res[0].buildingPlans_Building;
        this.buildingPlans_PlanName = res[0].buildingPlans_PlanName;
        this.buildingPlans_Plans = res[0].buildingPlans_Plans;
        this.buildingPlans_Actions = res[0].buildingPlans_Actions;
        this.pageMenuTitle = res[0].pageMenuTitle;
      }
    )
  }

  public GetTimeLinePlan() {
    debugger
    this.fmsservice.GetTimeLinePlan().subscribe(
      res => {
        debugger;
        this.BuildingPlanList = res;
        this.BuildingPlanFilterList = this.BuildingPlanList.filter(x => x.buildingID == this.ProjectID);
        debugger

        for (var i = 0; i < this.BuildingPlanFilterList.length; i++) {
          debugger
          if (this.BuildingPlanFilterList[i].timelinePlan.includes(".pdf")) {
            this.BuildingPlanFilterList[i]['frame'] = 1
          }
          else if (this.BuildingPlanFilterList[i].timelinePlan.includes(".xlsx")) {
            this.BuildingPlanFilterList[i]['frame'] = 2
          }
          else {
            this.BuildingPlanFilterList[i]['frame'] = 0
          }

        }

      }
    )
  }

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {

        this.Buildinglist = res

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

  BuildingPlainsID: any;
  public Views(evn) {
    debugger;
    this.BuildingPlainsID = evn;
    localStorage.setItem('BuidingPlainsID', this.BuildingPlainsID)
  }

  public FilterByBuildingname(evn) {
    debugger;
    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.BuildingPlanFilterList = this.BuildingPlanList;
    }
    else {
      let selectedBuildingPlan = evn.target.value;
      this.BuildingPlanFilterList = this.BuildingPlanList.filter(x => x.buildingName == selectedBuildingPlan);

    }

  }

  BuildingPlanName;
  DeleteBuildingPlan(ID, BuildingPlan) {
    debugger
    this.BuildingPlanName = BuildingPlan;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this TimeLine Plan!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsservice.DeleteTimeLinePlan(ID).subscribe(data => {
          if (data != undefined) {
            Swal.fire(
              'Deleted!',
              'Your Timeline Plan has been deleted.',
              'success'
            )

          
            this.GetTimeLinePlan();
         
            //this.InsertLoginDetails();
          }
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Building Plan is safe :)',
          'error'
        )
      }
    })

  }



}
