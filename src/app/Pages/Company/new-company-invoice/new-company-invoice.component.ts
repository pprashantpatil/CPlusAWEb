import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { DatePipe } from '../../../../../node_modules/@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-company-invoice',
  templateUrl: './new-company-invoice.component.html',
  styleUrls: ['./new-company-invoice.component.css']
})
export class NewCompanyInvoiceComponent implements OnInit {

  constructor(public fmsservice: FmsService, public activatedRoute: ActivatedRoute, public datepipe: DatePipe) { }
  CompanyLists: any;
  ngOnInit() {
    this.fmsservice.GetCompanyDetails().subscribe(
      res => {
        debugger;
        this.CompanyLists = res;
      }
    )
  }

  CompanyID: any;
  InvoiceDate: any;
  ForTheMonthOf: any;
  InvoiceAmount: any;
  TotalAmount: any;
  Decriptions: any;
  public Save() {
    let Entity = {
      'CompanyID': this.CompanyID,
      'InvoiceDate': this.InvoiceDate,
      'ForTheMonthOf': this.ForTheMonthOf,
      'InvoiceAmount': this.InvoiceAmount,
      'TotalAmount': this.TotalAmount,
      'Decriptions': this.Decriptions
    }
    this.fmsservice.InsertCompanyInvoice(Entity).subscribe((data) => {
      if (data != null && data != undefined) {
        Swal.fire('Saved Successfully');
        location.href = "#/CompanyInvoice"
      }
    })

  }


}
