import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-subontractors',
  templateUrl: './subontractors.component.html',
  styleUrls: ['./subontractors.component.css']
})
export class SubontractorsComponent implements OnInit {
  paramID
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  projectlist: any;
  Countrylist
  ngOnInit() {

    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.Get_SubContractorByID(this.paramID);
      }
    }
    );
    this.fmsservice.Get_Projects().subscribe(data => {
      debugger
      this.projectlist = data;
    })

    this.fmsservice.GetCountryType(1).subscribe(data => {
      debugger

      this.Countrylist = data;
    });
    this.fmsservice.GetNatureOfWorkMaster().subscribe(data => {
      debugger
      this.NatureOfWorkList = data;
    });
  }
  NatureOfWorkList
  ProjectWorks
  public Get_SubContractorByID(ProjectID) {
    this.fmsservice.Get_Projects().subscribe(data => {
      debugger
      this.projectlist = data;
    })

    this.fmsservice.Get_SubContractor().subscribe(data => {
      debugger
      let temp: any = data;
      this.ProjectWorks = temp.filter(x => x.id == ProjectID);
      let Project = this.ProjectWorks[0];
      this.ProjectID = Project["projectID"];
      this.Company = Project["company"];
      this.CountryID = Project["countryID"];
      this.fmsservice.GetStateType(1, this.CountryID).subscribe(data => {
        debugger
        this.Statelist = data;
      })
      this.stateID1 = Project["stateID"];
      this.fmsservice.GetCityType(1, this.stateID1).subscribe(data => {
        debugger
        this.citylist = data;
      })
      this.ContactPerson = Project["contactPerson"];
      this.fmsservice.GetCountryType(1).subscribe(data => {
        debugger

        this.Countrylist = data;
      });
      this.CityID = Project["cityID"];
      this.ContractSDate = this.datepipe.transform(Project["contractSDate"], 'yyyy-MM-dd');
      this.ContractEDate = this.datepipe.transform(Project["contractEDate"], 'yyyy-MM-dd');
      this.HeadCount = Project["headCount"];
      this.Description = Project["description"];
      this.Location = Project["location"];
      this.Phoneno = Project["phoneno"];
      this.Email = Project["email"];
      this.fmsservice.GetNatureOfWorkMaster().subscribe(data => {
        debugger
        this.NatureOfWorkList = data;
      });
      this.NatureOfWork = Project["natureOfWorkid"];
    })

  }

  ProjectID: any;
  Company: any;
  HeadCount: any;
  Description: any;
  Location: any;
  ContractSDate: any;
  ContractEDate: any;
  Phoneno: any;
  Email: any;
  NatureOfWork: any;
  ContactPerson: any
  CountryID
  CityID
  public Insert_SubContractor() {
    debugger;
    let object = {

      'Company': this.Company,
      'ContactPerson': this.ContactPerson,
      'CountryID': this.CountryID,
      'CityID': this.CityID,
      'StateID': this.stateID,
      'HeadCount': this.HeadCount,
      'Location': this.Location,
      'Phoneno': this.Phoneno,
      'Email': this.Email,
      'NatureOfWork': this.NatureOfWork,
      'CompanyID': localStorage.getItem('UserID')

    }

    this.fmsservice.Insert_SubContractor(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Contractor Saved Successfully!');
      location.href = "#/SubcontractorsDashborad";



    })
  }







  public GetEndDate() {
    if (this.ContractSDate > this.ContractEDate) {
      Swal.fire("Start Date Should be Small than End Date");
      this.ContractEDate = "";
    }

  }
  stateID1
  countryID
  stateID
  Statelist
  citylist
  getcountryID(eve) {
    debugger;

    this.stateID1 = ''
    this.countryID = eve.target.value;
    if (this.countryID == 2) {
      debugger;
      this.stateID = 6
      this.getphilipinesstateID(6);
    }

    this.fmsservice.GetStateType(1, this.countryID).subscribe(data => {
      debugger
      this.Statelist = data;
    })


  }
  getstateID(eve) {
    debugger;
    this.stateID = eve.target.value
    this.fmsservice.GetCityType(1, this.stateID).subscribe(data => {
      debugger
      this.citylist = data;
    })

  }


  public getphilipinesstateID(stateID) {
    debugger;
    this.fmsservice.GetCityType(1, stateID).subscribe(data => {
      debugger
      this.citylist = data;
    })
  }

  public Update() {
    debugger;
    let object = {
      'ID': this.paramID,
      'Company': this.Company,
      'ContactPerson': this.ContactPerson,
      'CountryID': this.CountryID,
      'StateID': this.stateID1,
      'CityID': this.CityID,
      'HeadCount': this.HeadCount,
      'Location': this.Location,
      'Phoneno': this.Phoneno,
      'Email': this.Email,
      'NatureOfWork': this.NatureOfWork,

    }

    this.fmsservice.Update_SubContractor(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Contractor Updated Successfully!');

      if (localStorage.getItem('LoginTypeID') != '3') {
        this.Get_SubContractorByID(this.paramID);
      }
      else {
        location.href = "#/SubcontractorsDashborad";
      }

    })

  }
}
