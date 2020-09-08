import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service';

@Component({
  selector: 'app-contractor-dashboard',
  templateUrl: './contractor-dashboard.component.html',
  styleUrls: ['./contractor-dashboard.component.css']
})
export class ContractorDashboardComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }


  POlists: any;
  FilteredPOlists: any;
  LoginID: any;
  ProjectID: any;
  username: any;
  POCount: any;
  POActiveCount: any;
  POClosedCount: any;
  projectlist: any;
  NoOfProjects: any;
  ProjectAssignedLists: any;
  NoOfInvoices: any;
  ActiveInvoices: any;
  ClosedInvoices: any;
  BuildingStaffList: any;
  FilteredBuildingStaffList: any;
  NoOfStaff: any;
  StaffLeaves: any;
  NoOfStaffLeaves: any;
  ngOnInit() {
    this.LoginID = localStorage.getItem("LoginTypeID");
    this.ProjectID = localStorage.getItem('ProjectID');
    this.username = localStorage.getItem('username');
    let UserID = localStorage.getItem('userid');

    this.fmsservice.GetContractorPO().subscribe(data => {
      debugger
      this.POlists = data;
      this.FilteredPOlists = this.POlists.filter(x => x.buildingID == this.ProjectID && x.company == this.username);
      this.POCount = this.FilteredPOlists.length;
    })


    this.fmsservice.GetContractorPO().subscribe(data => {
      debugger
      this.POlists = data;
      this.FilteredPOlists = this.POlists.filter(x => x.buildingID == this.ProjectID && x.company == this.username && x.paidAmount == 0);
      this.POActiveCount = this.FilteredPOlists.length;
    })


    this.fmsservice.GetContractorPO().subscribe(data => {
      debugger
      this.POlists = data;
      this.FilteredPOlists = this.POlists.filter(x => x.buildingID == this.ProjectID && x.company == this.username && x.paidAmount != 0);
      this.POClosedCount = this.FilteredPOlists.length;
    })


    this.fmsservice.GetContractorBuildingLists().subscribe(data => {
      debugger
      this.projectlist = data.filter(x => x.vendorID == UserID);
      this.NoOfProjects = this.projectlist.length;
    })


    this.fmsservice.GetContractorInvoice().subscribe(data => {
      debugger
      let temp: any = data;
      this.ProjectAssignedLists = temp.filter(x => x.contractorID == UserID && x.projectID == this.ProjectID);
      this.NoOfInvoices = this.ProjectAssignedLists.length;
    })


    this.fmsservice.GetContractorInvoice().subscribe(data => {
      debugger
      let temp: any = data;
      this.ProjectAssignedLists = temp.filter(x => x.contractorID == UserID && x.paidAmount != 0 && x.projectID == localStorage.getItem('ProjectID'));
      this.ClosedInvoices = this.ProjectAssignedLists.length;
    })

    this.fmsservice.GetContractorInvoice().subscribe(data => {
      debugger
      let temp: any = data;
      this.ProjectAssignedLists = temp.filter(x => x.contractorID == UserID && x.paidAmount == 0 && x.projectID == localStorage.getItem('ProjectID'));
      this.ActiveInvoices = this.ProjectAssignedLists.length;
    })


    this.fmsservice.GetContractorStaff(1).subscribe(
      res => {
        debugger;
        this.BuildingStaffList = res;
        this.FilteredBuildingStaffList = this.BuildingStaffList.filter(x => x.contractorID == localStorage.getItem('userid'));
        this.NoOfStaff = this.FilteredBuildingStaffList.length;
      }
    )


    this.fmsservice.GetContractorStaffLeaves(1).subscribe(
      res => {
        let temp: any = res
        this.StaffLeaves = temp.filter(x => x.contractorID == localStorage.getItem('userid'));
        this.NoOfStaffLeaves = this.StaffLeaves.length;

      }
    )
  }

}
