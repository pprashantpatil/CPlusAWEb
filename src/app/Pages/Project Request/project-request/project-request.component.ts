import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ExportToCsv } from 'export-to-csv';



@Component({
  selector: 'app-project-request',
  templateUrl: './project-request.component.html',
  styleUrls: ['./project-request.component.css']
})
export class ProjectRequestComponent implements OnInit {
  pickeroptions: NgDateRangePickerOptions;
  constructor(public fmsservice: FmsService) { }
  public pageMenuTitle;
  public projectRequest_PageTitle;
  public projectRequest_breadchrumb;
  public projectRequest_button_NewProjectrequest;
  public projectRequest_button_exportToExcel;
  public projectRequest_Request_Name;
  public projectRequest_Request_Type;
  public projectRequest_Building;
  public projectRequest_Raised_By;
  public projectRequest_Raised_Date;
  public projectRequest_Bid_Submit_Date;
  public projectRequest_Project_Awarded_Date;
  public projectRequest_Actions;

  public projectrequestList;
  public filteredprojectrequestList;
  public requestTypeList;
  public buildingList;
  public searchProjectRequest;


  ngOnInit() {
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd-MM-yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,

    };

    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetProjectRequestLanguageByLanguageID(selectedlanguage);
    this.getprojectrequestlist("2019-01-01", "2019-12-31");
    this.getRequesttype(selectedlanguage);
    this.getbuildinglist(selectedlanguage);

  }


  public GetProjectRequestLanguageByLanguageID(languageid) {
    this.fmsservice.GetProjectRequestLanguageByLanguageID(languageid).subscribe(
      res => {

        this.pageMenuTitle = res[0].pageMenuTitle;
        this.projectRequest_PageTitle = res[0].projectRequest_PageTitle;
        this.projectRequest_breadchrumb = res[0].projectRequest_breadchrumb;
        this.projectRequest_button_NewProjectrequest = res[0].projectRequest_button_NewProjectrequest;
        this.projectRequest_button_exportToExcel = res[0].projectRequest_button_exportToExcel;
        this.projectRequest_Request_Name = res[0].projectRequest_Request_Name;
        this.projectRequest_Request_Type = res[0].projectRequest_Request_Type;
        this.projectRequest_Building = res[0].projectRequest_Building;
        this.projectRequest_Raised_By = res[0].projectRequest_Raised_By;
        this.projectRequest_Raised_Date = res[0].projectRequest_Raised_Date;
        this.projectRequest_Bid_Submit_Date = res[0].projectRequest_Bid_Submit_Date;
        this.projectRequest_Project_Awarded_Date = res[0].projectRequest_Project_Awarded_Date;
        this.projectRequest_Actions = res[0].projectRequest_Actions;


      }
    )
  }


  public getprojectrequestlist(startdate, enddate) {
    this.fmsservice.GetProjectRequest(startdate, enddate).subscribe(res => {
      debugger;
      this.projectrequestList = res;
      this.filteredprojectrequestList = this.projectrequestList;
    })
  }

  public getRequesttype(languageid) {
    this.fmsservice.GetProjectRequestType(languageid).subscribe(res => {
      debugger;
      this.requestTypeList = res;


      this.requestTypeList.sort(function (a, b) {
        var nameA = a.short.toUpperCase(); // ignore upper and lowercase
        var nameB = b.short.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {

          return -1;
        }

        if (nameA > nameB) {

          return 1;
        }

        // names must be equal
        return 0;
      });
    })
  }

  public onchangeProjectrequesttype(evn) {
    let requesttypeid = evn.target.value;
    if (requesttypeid != "none") {
      this.filteredprojectrequestList = this.projectrequestList.filter(x => x.requestTypeID == requesttypeid);
    }

    else {
      this.filteredprojectrequestList = this.projectrequestList;
    }
  }
  public getbuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(res => {
      this.buildingList = res;
      this.buildingList.sort(function (a, b) {
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
    })
  }

  public onchangBuilding(evn) {
    let buildingID = evn.target.value;
    if (buildingID != "none") {
      this.filteredprojectrequestList = this.projectrequestList.filter(x => x.buildingID == buildingID);
    }

    else {
      this.filteredprojectrequestList = this.projectrequestList;
    }



  }

  public deleteprojectrequest(projectId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you want to delete!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsservice.DeleteProjectRequest(projectId).subscribe(res => {
          Swal.fire(
            'Project Request Deleted!',
            // 'Your imaginary file has been deleted.',
            'success'
          );


          this.getprojectrequestlist("2019-01-01", "2019-12-31");
        })

        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',

          'error'
        )
      }
    })
  }


  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Project Request List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Project Request List'
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.filteredprojectrequestList);
  }

}
