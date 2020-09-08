import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { DatePipe } from '../../../../../node_modules/@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-architectural-stages',
  templateUrl: './architectural-stages.component.html',
  styleUrls: ['./architectural-stages.component.css']
})
export class ArchitecturalStagesComponent implements OnInit {

  constructor(public fmsservice: FmsService, public activatedRoute: ActivatedRoute, public datepipe: DatePipe) { }
  StagesLists: any;
  ngOnInit() {
    this.fmsservice.GetArchitecturalStages().subscribe(
      res => {
        debugger;
        this.StagesLists = res;
      }
    )
  }


  StagesID: any;
  ProcessCheck: any;
  public Save() {
    let Entity = {
      'StagesID': this.StagesID,
      'ProcessCheck': this.ProcessCheck
    }
    this.fmsservice.InsertArchitecturalStagesProcessCheck(Entity).subscribe((data) => {
      if (data != null && data != undefined) {
        Swal.fire('Saved Successfully');
        // location.href = "#/CompanyInvoice"
      }
    })
  }

}
