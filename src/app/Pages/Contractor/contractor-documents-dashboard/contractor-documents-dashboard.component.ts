import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contractor-documents-dashboard',
  templateUrl: './contractor-documents-dashboard.component.html',
  styleUrls: ['./contractor-documents-dashboard.component.css']
})
export class ContractorDocumentsDashboardComponent implements OnInit {

  constructor(public fmsService: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  ProjectAssignedLists: any
  Contractorlist: any;
  LoginID: any;
  Search
  UserID
  pickeroptions: any
  value: any
  ngOnInit() {
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.LoginID = localStorage.getItem("LoginTypeID");
    this.UserID = localStorage.getItem("UserID");
    this.Contractorid = 0;
    this.fmsService.Get_SubContractor().subscribe(data => {
      debugger
      let temp: any = data;
      this.Contractorlist = temp.filter(x => x.companyID == localStorage.getItem('UserID'));
    })
    this.getDocuments();
  }
  public getDocuments() {
    if (this.LoginID == 4) {
      this.fmsService.GetContractorDocuments().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.contractorID == this.UserID);
      })
    }
    else {
      this.fmsService.GetContractorDocuments().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.companyID == localStorage.getItem('userid'));
      })
    }
  }
  photos = []
  ImagesOne: any
  public getphpto(id) {
    debugger
    this.fmsService.GetDocuments().subscribe(data => {
      debugger
      let temp: any = data;
      this.photos = temp.filter(x => x.contractorDocID == id);
      this.ImagesOne = this.photos[0].photos;
    })
  }
  Contractorid
  public GetContractorID(event) {
    debugger
    this.Contractorid = event.target.value;
    if (this.Contractorid == 0) {
      this.fmsService.GetContractorDocuments().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.companyID == localStorage.getItem('userid'));
      })
    }
    else {
      this.fmsService.GetContractorDocuments().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.contractorID == this.Contractorid);
      })
    }
  }

  public DeleteProject(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.fmsService.Delete_ContractorDocuments(id).subscribe(res => {
          let test = res;
          this.getDocuments();
        })
        Swal.fire(
          'Deleted!',
          'CONTRACTOR  Document has been deleted.',
          'success'
        )
      }
      else {
        this.getDocuments();
      }
    })
  }

  datelist;
  startdate: Date;
  enddate: Date;
  public selectedDate(value) {
    debugger
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];
    debugger
    //Date date= new Date('dd-MM-yyyy');
    if (this.LoginID == 4) {
      this.fmsService.GetContractorDocumentsByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.contractorID == this.UserID);
      })
    }
    else {
      this.fmsService.GetContractorDocumentsByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.companyID == localStorage.getItem('userid'));
      })
    }
  }

}
