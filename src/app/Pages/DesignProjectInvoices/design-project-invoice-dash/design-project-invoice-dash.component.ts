import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ExportToCsv } from '../../../../../node_modules/export-to-csv';

@Component({
  selector: 'app-design-project-invoice-dash',
  templateUrl: './design-project-invoice-dash.component.html',
  styleUrls: ['./design-project-invoice-dash.component.css']
})
export class DesignProjectInvoiceDashComponent implements OnInit {


  constructor(public fmsService: FmsService, private route: ActivatedRoute, public datepipe: DatePipe, public router: Router) { }
  LoginTypeID
  ProjectID
  pickeroptions
  ngOnInit() {

    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.GetInvoices();
  }

  projectlist
  public GetInvoices() {
    debugger
    this.fmsService.GetDesignProjectInvoices('2020/01/01', '2022/01/01').subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.projectID == this.ProjectID && x.status == 0);
    })
  }
  invoiceDate
  BuildingLists: any;
  invoiceNumber: any;
  milestone: any;
  notes: any;
  paidAmount: any;
  paymentType: any;
  bname: any;
  company: any;
  CompanyDetailslists: any;
  CompanyName: any;
  CompanyemailID: any;
  CompanycontactName: any;
  Companyaddress: any;
  CompanyPhoneNo: any;
  Building: any;
  BuildingName: any;
  BuildingPhoneNumber: any;
  BuildngAddresss: any;
  BuildingcontactPersonEmail: any;
  Buildingcountry: any;
  Buildingstate: any;
  Buildingcity: any;
  invoiceAmount: any
  firstName
  phoneNo
  emailID
  projectName
  stage
  public GetDetails(evn) {
    debugger;
    this.invoiceDate = this.datepipe.transform(evn.invoiceDate, 'yyyy-MM-dd');
    this.invoiceAmount = evn.totalAmount;
    this.invoiceNumber = evn.invoiceNo;
    this.notes = evn.invoiceDescription;
    this.paidAmount = evn.paidAmount;
    this.paymentType = evn.paymentType;
    this.firstName = evn.firstName;
    this.phoneNo = evn.phoneNo;
    this.emailID = evn.emailID;
    this.projectName = evn.projectName;
    this.stage = evn.stage;

    this.fmsService.GetCompanyDetails().subscribe(data => {
      debugger;
      this.CompanyDetailslists = data.filter(x => x.id == localStorage.getItem('CompanyID'));
      this.CompanyName = this.CompanyDetailslists[0].name;
      this.CompanyemailID = this.CompanyDetailslists[0].emailID;
      this.CompanycontactName = this.CompanyDetailslists[0].contactName;
      this.Companyaddress = this.CompanyDetailslists[0].address;
      this.CompanyPhoneNo = this.CompanyDetailslists[0].phoneNo;

    })

    this.fmsService.GetBuilding(1, evn.projectID).subscribe(data => {
      debugger
      this.Building = data;
      this.BuildingName = this.Building.name;
      this.BuildingPhoneNumber = this.Building.phoneNo;
      this.BuildngAddresss = this.Building.address;
      this.BuildingcontactPersonEmail = this.Building.contactPersonEmail;
      this.Buildingcountry = this.Building.country;
      this.Buildingstate = this.Building.state;
      this.Buildingcity = this.Building.city;


    })
  }

  value: any
  PaymentTypeID: any
  public GetPaymentTypeID(evn) {
    debugger;
    this.PaymentTypeID = evn.target.value;
  }
  RowID: any;

  public GetRowID(evn) {
    debugger;
    this.RowID = evn.id;
    this.invoiceAmount = evn.totalAmount;
  }

  Paidamount: any;
  public InsertPayments() {
    debugger;
    let Entity = {
      'ID': this.RowID,
      'PaidAmount': this.invoiceAmount
    }
    this.fmsService.UpdateDesignInvoices(Entity).subscribe(res => {
      debugger;
      Swal.fire('Paid Successfully!');
      this.PaymentTypeID = 0;
      this.Paidamount = 0;
      Swal.fire('Paid  Successfully');
      this.GetInvoices();
    })
    // if (this.Paidamount <= this.invoiceAmount) {
    //   let Entity = {
    //     'ID': this.RowID,
    //     'PaidAmount': this.invoiceAmount
    //   }
    //   this.fmsService.UpdateDesignInvoices(Entity).subscribe(res => {
    //     debugger;
    //     Swal.fire('Paid Successfully!');
    //     this.PaymentTypeID = 0;
    //     this.Paidamount = 0;
    //     this.GetInvoices();
    //   })
    // }
    // else {

    //   Swal.fire('Invoice Amount is greater than paid amount');

    // }

  }


  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: ' Invoice ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: ' Invoice'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.projectlist);
  }

}
