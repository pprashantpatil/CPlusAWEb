import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contractor-po',
  templateUrl: './contractor-po.component.html',
  styleUrls: ['./contractor-po.component.css']
})
export class ContractorPOComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  public projectlist: any;
  UserID: any
  //public stagesLists: any;
  public SubContractorList: any;
  public stagesLists = [];
  selecteditemsModule = [];
  selecteditemsModule1 = [];
  dropdownSettings = {}
  paramID;
  stages: any;
  ngOnInit() {
    this.ProjectID = localStorage.getItem('ProjectID');
    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.GetContractorPO(this.paramID);
      }
    }
    );
    this.UserID = localStorage.getItem('UserID');
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.id == this.ProjectID);
    })

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'milestone',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };

    this.fmsservice.GetBuildingStages().subscribe(data => {
      debugger
      this.stagesLists = data;
    })
    this.fmsservice.Get_SubContractor().subscribe(data => {
      debugger
      let temp: any = data
      this.SubContractorList = temp.filter(x => x.companyID == this.UserID);
    })
  }
  ProjectWorks;
  Stages
  public GetContractorPO(ProjectID) {


    this.fmsservice.GetContractorPO().subscribe(data => {
      debugger
      let temp: any = data;
      this.ProjectWorks = temp.filter(x => x.id == ProjectID);
      let Project = this.ProjectWorks[0];
      this.fmsservice.GetBuildinglist(1).subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.companyID == this.UserID);
      })
      this.fmsservice.Get_SubContractor().subscribe(data => {
        debugger
        let temp: any = data
        this.SubContractorList = temp.filter(x => x.companyID == this.UserID);
      })
      this.ProjectID = Project["buildingID"];
      this.Contractor = Project["contractor"];
      this.POAmount = Project["poAmount"];
      this.Date = this.datepipe.transform(Project["date"], 'yyyy-MM-dd');
      this.Description = Project["description"];
      this.TermsAndConditions = Project["termsAndConditions"];
      this.Stages = Project["stages"];

    })

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
    console.log(items);
    this.selecteditemlist1.push(items)
    this.selecteditemlist = this.selecteditemlist1[0]
  }


  ProjectID;
  StagesID;
  Contractor;
  POAmount;
  public Date: any;
  Description;
  TermsAndConditions;
  StagesLists;
  public Save() {

    this.StagesLists = '';
    for (let i = 0; i < this.selecteditemlist.length; i++) {

      if (this.selecteditemlist.length < 1) {
        this.StagesLists = this.StagesLists + this.selecteditemlist[i].milestone;
      }
      else {
        this.StagesLists = this.StagesLists + ',' + this.selecteditemlist[i].milestone;
      }
    }
    let Entity = {
      'ProjectID': this.ProjectID,
      'StagesID': this.StagesLists,
      'Contractor': this.Contractor,
      'POAmount': this.POAmount,
      'Date': this.Date,
      'Description': this.Description,
      'TermsAndConditions': this.TermsAndConditions
    }

    this.fmsservice.InsertContractorPO(Entity).subscribe(res => {
      debugger;
      Swal.fire('Saved Successfully');
      location.href = "#/ContractorPODash";
    })
  }
  public Update() {
    debugger;
    this.StagesLists = '';
    for (let i = 0; i < this.selecteditemlist.length; i++) {

      if (this.selecteditemlist.length < 1) {
        this.StagesLists = this.StagesLists + this.selecteditemlist[i].milestone;
      }
      else {
        this.StagesLists = this.StagesLists + ',' + this.selecteditemlist[i].milestone;
      }
    }



    if (this.StagesLists == "") {
      this.fmsservice.GetContractorPO().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectWorks = temp.filter(x => x.id == this.paramID);
        let Project = this.ProjectWorks[0];
        this.StagesLists = Project["stages"];

        let Entity = {
          'ID': this.paramID,
          'ProjectID': this.ProjectID,
          'StageID': this.StagesLists,
          'Contractor': this.Contractor,
          'POAmount': this.POAmount,
          'Date': this.Date,
          'Description': this.Description,
          'TermsAndConditions': this.TermsAndConditions
        }

        this.fmsservice.Update_ContractorPO(Entity).subscribe(res => {
          debugger;
          Swal.fire('Updated Successfully');
          location.href = "#/ContractorPODash";
        })

      })
    }
    else {
      let Entity = {
        'ID': this.paramID,
        'ProjectID': this.ProjectID,
        'StageID': this.StagesLists,
        'Contractor': this.Contractor,
        'POAmount': this.POAmount,
        'Date': this.Date,
        'Description': this.Description,
        'TermsAndConditions': this.TermsAndConditions
      }

      this.fmsservice.Update_ContractorPO(Entity).subscribe(res => {
        debugger;
        Swal.fire('Updated Successfully');
        location.href = "#/ContractorPODash";
      })
    }

  }

}
