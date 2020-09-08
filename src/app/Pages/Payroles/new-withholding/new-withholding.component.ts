import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { document } from 'ngx-bootstrap';

@Component({
  selector: 'app-new-withholding',
  templateUrl: './new-withholding.component.html',
  styleUrls: ['./new-withholding.component.css']
})
export class NewWithholdingComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  public WithholdingEntity = {
    SalaryTypeID: 0,
    BaseTax: 0,
    BaseSalary: 0,
    TaxPercentage: 0
  }

  ngOnInit() {
    this.GetSalaryTypeMaster();
  }


  SalaryList
  public GetSalaryTypeMaster() {
    this.fmsservice.GetSalaryTypeMaster().subscribe(res => {
      this.SalaryList = res;
    })
  }


  public InsertWithholdingTax() {
    debugger;
    this.fmsservice.InsertWithholdingTax(this.WithholdingEntity).subscribe(res => {
      debugger;
      Swal.fire('Withholding Tax Details Saved Successfully');
      this.Clear();

    })

  }

  public Clear() {
    this.WithholdingEntity.SalaryTypeID = 0,
      this.WithholdingEntity.BaseTax = 0,
      this.WithholdingEntity.BaseSalary = 0,
      this.WithholdingEntity.TaxPercentage = 0
  }


}
