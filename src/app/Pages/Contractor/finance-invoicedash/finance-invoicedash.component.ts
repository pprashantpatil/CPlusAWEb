import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ExportToCsv } from '../../../../../node_modules/export-to-csv';

@Component({
  selector: 'app-finance-invoicedash',
  templateUrl: './finance-invoicedash.component.html',
  styleUrls: ['./finance-invoicedash.component.css']
})
export class FinanceInvoicedashComponent implements OnInit {

  constructor(public fmsService: FmsService, private route: ActivatedRoute, public datepipe: DatePipe, public router: Router) { }
  ProjectAssignedLists: any
  Contractorid
  Contractorlist
  BuildingList: any;
  LoginID: any;
  Search;
  UserID: any;
  pickeroptions
  ProjectID;
  companyID: any;
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
    this.UserID = localStorage.getItem('UserID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.companyID = localStorage.getItem('CompanyID');
    this.buildingid = 0;
    this.Contractorid = 0;
    this.fmsService.Get_SubContractor().subscribe(data => {
      debugger
      let temp: any = data;
      this.Contractorlist = temp.filter(x => x.companyID == this.companyID);
    })
    this.fmsService.GetBuildinglist(1).subscribe(
      res => {
        debugger;
        this.BuildingList = res.filter(x => x.companyID == this.companyID);
      }
    )

    this.fmsService.GetContractorInvoice().subscribe(data => {
      debugger
      let temp: any = data;
      this.ProjectAssignedLists = temp.filter(x => x.paidAmount == 0 && x.companyID == this.companyID);
    })



  }

  value: any
  PaymentTypeID: any
  public GetPaymentTypeID(evn) {
    debugger;
    this.PaymentTypeID = evn.target.value;
  }



  public EditInvoice(evn) {
    debugger;

    let AssetsID = evn.id;
    this.router.navigate(['/ContractorInvoice', AssetsID]);
  }



  buildingid
  public fliterbuilding(event) {
    debugger
    this.buildingid = event.target.value;
    if (this.buildingid == 0) {
      this.fmsService.GetContractorInvoice().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.paidAmount == 0);
      })
    }
    else {
      this.fmsService.GetContractorInvoice().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.projectID == this.buildingid && x.paidAmount == 0);
      })
    }
  }

  public GetContractorID(event) {
    debugger
    this.Contractorid = event.target.value;
    if (this.Contractorid == 0) {
      this.fmsService.GetContractorInvoice().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.paidAmount == 0);
      })
    }
    else {
      this.fmsService.GetContractorInvoice().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.contractorID == this.Contractorid && x.paidAmount == 0);
      })
    }
  }

  RowID: any;
  invoiceAmount: any;
  public GetRowID(evn) {
    debugger;
    this.RowID = evn.id;
    this.invoiceAmount = evn.invoiceAmount;
  }

  Paidamount: any;
  public InsertPayments() {
    debugger;

    if (this.Paidamount <= this.invoiceAmount) {
      let Entity = {
        'ID': this.RowID,
        'PaymentType': this.PaymentTypeID,
        'PaidAmount': this.Paidamount
      }
      this.fmsService.UpdateContractorPayments(Entity).subscribe(res => {
        debugger;
        Swal.fire('Paid Successfully!');
        this.PaymentTypeID = 0;
        this.Paidamount = 0;
        this.fmsService.GetContractorInvoice().subscribe(data => {
          debugger
          let temp: any = data;
          this.ProjectAssignedLists = temp.filter(x => x.paidAmount == 0);
        })
      })
    }
    else {

      Swal.fire('Invoice Amount is greater than paid amount');

    }

  }


  BuildingLists: any;
  invoiceDate: any;
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
  public GetDetails(evn) {
    debugger;
    this.invoiceDate = this.datepipe.transform(evn.invoiceDate, 'yyyy-MM-dd');
    this.invoiceAmount = evn.invoiceAmount;
    this.invoiceNumber = evn.invoiceNumber;
    this.milestone = evn.milestone;
    this.notes = evn.notes;
    this.paidAmount = evn.paidAmount;
    this.paymentType = evn.paymentType;
    this.bname = evn.bname;
    this.company = evn.company;
    this.fmsService.GetCompanyDetails().subscribe(data => {
      debugger;

      // if (this.LoginID != 4) {
      //   this.CompanyDetailslists = data.filter(x => x.id == localStorage.getItem('userid'));
      // }
      // else {
      this.CompanyDetailslists = data.filter(x => x.id == localStorage.getItem('CompanyID'));
      // }



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
      this.fmsService.GetContractorInvoiceByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.contractorID == this.UserID && x.projectID == this.ProjectID);
      })
    }
    if (this.LoginID == 3) {
      this.fmsService.GetContractorInvoiceByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.projectID == this.ProjectID);
      })
    }

  }

  public DeleteInvoice(id) {
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
        this.fmsService.Delete_ContractorInvoice(id).subscribe(res => {
          let test = res;
          location.href = "#/PaidContractorInvoices";
          // if (this.LoginID == 4) {
          //   this.fmsService.GetContractorInvoice().subscribe(data => {
          //     debugger
          //     let temp: any = data;
          //     this.ProjectAssignedLists = temp.filter(x => x.contractorID == this.UserID && x.projectID == this.ProjectID);
          //   })
          // }
          // if (this.LoginID == 3) {
          //   this.fmsService.GetContractorInvoice().subscribe(data => {
          //     debugger
          //     let temp: any = data;
          //     this.ProjectAssignedLists = temp.filter(x => x.projectID == this.ProjectID);
          //   })
          // }
        })
        Swal.fire(
          'Deleted!',
          'CONTRACTOR  Invoice has been deleted.',
          'success'
        )
      }
      else {
        location.href = "#/PaidContractorInvoices";
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
      title: 'Invoices ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Invoices'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.ProjectAssignedLists);
  }
}
