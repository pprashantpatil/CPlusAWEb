import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { DatePipe } from '../../../../../node_modules/@angular/common';

@Component({
  selector: 'app-contractor-invoice',
  templateUrl: './contractor-invoice.component.html',
  styleUrls: ['./contractor-invoice.component.css']
})
export class ContractorInvoiceComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  public SubContractorList: any;
  projectlist: any;
  //stagesLists: any;
  LoginID: any;
  UserID: any;
  public stagesLists = [];
  selecteditemsModule = [];
  selecteditemsModule1 = [];
  dropdownSettings = {};
  public ParamsID: any;
  CompanyID: any
  ngOnInit() {
    this.LoginID = localStorage.getItem("LoginTypeID");
    this.UserID = localStorage.getItem('userid');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.CompanyID = localStorage.getItem('CompanyID');
    this.ContractorID = 0;
    this.PoAmount = 0;
    this.fmsservice.Get_SubContractor().subscribe(data => {
      debugger
      this.SubContractorList = data.filter(x => x.companyID == this.CompanyID);
    })


    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.id == this.ProjectID);

    })

    this.fmsservice.GetBuildingStages().subscribe(data => {
      debugger
      this.stagesLists = data;
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




    this.route.params.subscribe(params => {
      debugger;
      this.ParamsID = params['id'];
      if (params['id'] != undefined) {
        this.ParamsID = params['id'];
        this.GetContractorInvoiceByID(this.ParamsID);
      }
    }
    );

    this.fmsservice.GetContractorPOByContractorID(this.ContractorID).subscribe(data => {
      debugger
      this.PONumber = data;
      this.PoAmount = this.PONumber[0].pOAmount
    })

  }



  public GetContractorInvoiceByID(ID) {
    debugger;
    this.fmsservice.GetContractorInvoiceByID(ID).subscribe(
      res => {
        debugger;
        this.ContractorID = res[0].contractorID,
          this.GetContractor(this.ContractorID),

          this.ProjectID = res[0].projectID,
          this.InvoiceDate = this.datepipe.transform(res[0].invoiceDate, 'yyyy-MM-dd');
        this.InvoiceNumber = res[0].invoiceNumber,
          this.InvoiceAmount = res[0].invoiceAmount,
          this.Notes = res[0].notes,
          this.POID = res[0].poid,
          this.poAmount = res[0].poAmount,
          this.GetPOAmount(this.POID)
      }
    )
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

  ContractorID;
  PONumber;
  PoAmount;
  public GetContractor(evn) {
    debugger;

    if (evn.target) {
      this.ContractorID = evn.target.value;
    } else {
      this.ContractorID = evn;
    }


    //    this.ContractorID = evn.target.value;
    this.fmsservice.GetContractorPOByContractorID(this.ContractorID).subscribe(data => {
      debugger
      this.PONumber = data;
      this.PoAmount = this.PONumber[0].pOAmount
    })
  }


  FPO;
  poAmount: any;
  POID: any;
  public GetPOAmount(evn) {
    debugger;
    if (evn.target) {
      this.POID = evn.target.value;
    } else {
      this.POID = evn;
    }
    this.fmsservice.GetContractorPOByContractorID(this.ContractorID).subscribe(data => {
      debugger
      this.PONumber = data;
      this.FPO = this.PONumber.filter(x => x.id == this.POID);
      this.poAmount = this.FPO[0].poAmount;
      this.StagesLists = this.FPO[0].stagesID;
    })


  }

  ProjectID: any;
  StagesID: any;
  InvoiceDate: any;
  Notes: any;
  Attachment: any;
  InvoiceNumber: any;
  InvoiceAmount: any;
  StagesLists: any;
  public Save() {
    debugger;

    if (this.InvoiceAmount > this.poAmount) {
      Swal.fire("Invoice amount is greater than PO Amount..Please Check");

    } else {
      let Entity = {
        'ContractorID': this.ContractorID,
        'StagesID': this.StagesLists,
        'ProjectID': this.ProjectID,
        'InvoiceDate': this.InvoiceDate,
        'Notes': this.Notes,
        'Attachment': 'Null',
        'InvoiceNumber': this.InvoiceNumber,
        'InvoiceAmount': this.InvoiceAmount,
        'POID': this.POID,
        'POAmount': this.poAmount
      }

      this.fmsservice.InsertContractorInvoice(Entity).subscribe(res => {
        debugger;
        Swal.fire("Saved Successfully");
        location.href = "#/FinanceInvoicedash"
      })
    }
  }



  public Update() {
    debugger;


    if (this.InvoiceAmount > this.poAmount) {
      Swal.fire("Invoice amount is greater than PO Amount..Please Check");

    } else {
      let Entity1 = {
        'ID': this.ParamsID,
        'ContractorID': this.ContractorID,
        'Stages': this.StagesLists,
        'ProjectID': this.ProjectID,
        'InvoiceDate': this.InvoiceDate,
        'Notes': this.Notes,
        'Attachment': this.Attachment,
        'InvoiceNumber': this.InvoiceNumber,
        'InvoiceAmount': this.InvoiceAmount,
        'POID': this.POID,
        'POAmount': this.poAmount
      }
      this.fmsservice.UpdateContractorInvoice(Entity1).subscribe(res => {
        debugger;
        Swal.fire("Updated Successfully");
        location.href = "#/FinanceInvoicedash"
      })

    }



  }

}
