import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contractor-podash',
  templateUrl: './contractor-podash.component.html',
  styleUrls: ['./contractor-podash.component.css']
})
export class ContractorPODashComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }
  POlists: any;
  BuildingLists1: any;
  FilteredPOlists: any;
  ProjectID: any;
  LoginID: any;
  pickeroptions1: any
  username: any;
  Contractorid: any;
  Contractorlist: any;
  ngOnInit() {
    this.Contractorid = 0
    this.pickeroptions1 = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.LoginID = localStorage.getItem("LoginTypeID");
    this.ProjectID = localStorage.getItem('ProjectID');
    this.username = localStorage.getItem('username');
    this.fmsservice.Get_SubContractor().subscribe(data => {
      debugger
      let temp: any = data;
      this.Contractorlist = temp.filter(x => x.companyID == localStorage.getItem('userid'));
    })
    if (this.LoginID == 4) {
      this.fmsservice.GetContractorPO().subscribe(data => {
        debugger
        this.POlists = data;
        this.FilteredPOlists = this.POlists.filter(x => x.buildingID == this.ProjectID && x.company == this.username);
      })
    }
    if (this.LoginID == 3) {
      this.fmsservice.GetContractorPO().subscribe(data => {
        debugger
        this.POlists = data;
        this.FilteredPOlists = this.POlists.filter(x => x.buildingID == this.ProjectID);
      })
    }


    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.BuildingLists1 = data;

    })

  }


  BuildingID: any;
  CompanyName: any;
  BuildingLists: any;
  ContractorCompany: any;
  POdate: any;
  poAmount: any;
  StagesID: any;
  project: any;
  description: any;
  BuildingSearch: any;
  FilteredBuildingLists: any;
  ContractorLocation: any;
  ContractorContactName: any
  ContractorEmailID: any;
  ContractorPhoneNo: any;
  CompanyDetailslists: any;
  CompanyemailID: any;
  CompanycontactName: any;
  Companyaddress: any;
  CompanyPhoneNo: any;
  public GetDetails(evn) {
    debugger;

    this.ContractorCompany = evn.company;
    this.POdate = this.datepipe.transform(evn.date, 'yyyy-MM-dd');
    this.poAmount = evn.poAmount;
    this.StagesID = evn.stages;
    this.project = evn.project;
    this.description = evn.description;


    this.ContractorLocation = evn.location;
    this.ContractorEmailID = evn.email;
    this.ContractorContactName = evn.contactPerson;
    this.ContractorPhoneNo = evn.phoneno;

    this.fmsservice.GetCompanyDetails().subscribe(data => {
      debugger;

      if (this.LoginID != 4) {
        this.CompanyDetailslists = data.filter(x => x.id == localStorage.getItem('userid'));
      }
      else {
        this.CompanyDetailslists = data.filter(x => x.id == localStorage.getItem('CompanyID'));
      }

      this.CompanyName = this.CompanyDetailslists[0].name;
      this.CompanyemailID = this.CompanyDetailslists[0].emailID;
      this.CompanycontactName = this.CompanyDetailslists[0].contactName;
      this.Companyaddress = this.CompanyDetailslists[0].address;
      this.CompanyPhoneNo = this.CompanyDetailslists[0].phoneNo

    })




    this.BuildingID = evn.id;
    this.fmsservice.GetBuilding(1, this.ProjectID).subscribe(data => {
      debugger
      this.BuildingLists = data;


    })
  }


  BuildingName: any;
  ProjectName: any;
  public FilteredByBuildingName(event) {
    debugger;

    this.ProjectName = event.target.value;
    if (this.ProjectName == '0') {
      this.FilteredPOlists = this.POlists;
    } else {
      this.FilteredPOlists = this.POlists.filter(x => x.project == this.ProjectName);
    }
  }



  public GetContractorID(event) {
    debugger
    this.Contractorid = event.target.value;
    if (this.Contractorid == 0) {
      this.fmsservice.GetContractorPO().subscribe(data => {
        debugger
        this.POlists = data;
        this.FilteredPOlists = this.POlists.filter(x => x.buildingID == this.ProjectID);
      })
    }
    else {
      this.fmsservice.GetContractorPO().subscribe(data => {
        debugger
        this.POlists = data;
        this.FilteredPOlists = this.POlists.filter(x => x.buildingID == this.ProjectID && x.contractor == this.Contractorid);
      })
    }
  }


  datelist;
  startdate: Date;
  enddate: Date;
  value: any
  public selectedDate(value) {
    debugger
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];
    debugger
    //Date date= new Date('dd-MM-yyyy');
    if (this.LoginID == 4) {
      // this.fmsservice.GetContractorPO().subscribe(data => {
      //   debugger
      //   this.POlists = data;
      //   this.FilteredPOlists = this.POlists.filter(x => x.buildingID == this.ProjectID && x.company == this.username);
      // })

      this.fmsservice.GetContractorPOByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.POlists = data;
        this.FilteredPOlists = this.POlists.filter(x => x.buildingID == this.ProjectID);
      })
    }
    if (this.LoginID == 3) {
      this.fmsservice.GetContractorPOByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.POlists = data;
        this.FilteredPOlists = this.POlists.filter(x => x.buildingID == this.ProjectID);
      })
    }

  }
}
