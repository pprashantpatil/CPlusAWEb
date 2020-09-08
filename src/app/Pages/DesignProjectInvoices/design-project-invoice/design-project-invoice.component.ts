import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-design-project-invoice',
  templateUrl: './design-project-invoice.component.html',
  styleUrls: ['./design-project-invoice.component.css']
})
export class DesignProjectInvoiceComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  ProjectID
  Buildinglist
  ClientList
  StageList
  ngOnInit() {

    this.ClientID = 0;
    this.StageID = 0;
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.Buildinglist = data.filter(x => x.id == localStorage.getItem('ProjectID'));
    })
    this.ProjectID = localStorage.getItem('ProjectID');
    this.fmsservice.Get_ClientContacts().subscribe(data => {
      debugger
      let temp: any = data;
      this.ClientList = temp.filter(x => x.projectID == this.ProjectID);
    })
    this.fmsservice.GetArchitecturalStages().subscribe(data => {
      debugger
      this.StageList = data;
    })
  }
  ClientID
  phoneno
  email
  public GetClientID(event) {
    debugger
    this.ClientID = event.target.value;
    this.fmsservice.Get_ClientContacts().subscribe(data => {
      debugger
      let temp: any = data;
      let temp1 = temp.filter(x => x.id == this.ClientID);
      this.phoneno = temp1[0].phoneNo;
      this.email = temp1[0].emailID;
    })
  }
  VAT
  TotalAmount: any
  InvoiceAmount
  StageID
  InvoiceNo
  InvoiceDate
  InvoiceDescription
  public GetVat(vat) {
    debugger
    this.VAT = vat
    let temp1: Number = (this.InvoiceAmount * this.VAT) / 100;
    this.TotalAmount = temp1 + this.InvoiceAmount;
  }

  Save() {
    debugger
    let filetr =
    {
      'ProjectID': this.ProjectID,
      'ClientID': this.ClientID,
      'StageID': this.StageID,
      'InvoiceNo': this.InvoiceNo,
      'InvoiceAmount': this.InvoiceAmount,
      'VAT': this.VAT,
      'TotalAmount': this.TotalAmount,
      'InvoiceDate': this.InvoiceDate,
      'InvoiceDescription': this.InvoiceDescription
    }

    this.fmsservice.InsertDesignProjectInvoices(filetr).subscribe(data => {
      debugger
      if (data != undefined) {
        Swal.fire("Invoice Saved Successfully")
        location.href = "#/DesignProjectInvoiceDash";
      }

    })

  }

}
