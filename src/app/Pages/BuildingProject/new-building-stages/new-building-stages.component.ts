import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { document } from 'ngx-bootstrap';
@Component({
  selector: 'app-new-building-stages',
  templateUrl: './new-building-stages.component.html',
  styleUrls: ['./new-building-stages.component.css']
})
export class NewBuildingStagesComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  public Entity = {
    Code: "",
    Milestone: "",
    UnitWt: 0.0
  }

  Assetid: any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      debugger;
      this.Assetid = params['id'];
      if (params['id'] != undefined) {
        this.Assetid = params['id'];
        this.GetBuildingStagesByID(this.Assetid);
      }

    }
    );
  }


  public GetBuildingStagesByID(ID) {
    debugger;
    this.fmsservice.GetBuildingStagesByID(ID).subscribe(
      res => {
        debugger;
        this.Entity.Code = res[0].code,
          this.Entity.Milestone = res[0].milestone,
          this.Entity.UnitWt = res[0].unitWt
      }
    )
  }



  public InsertBuildingStagesMaster() {
    debugger;
    this.fmsservice.InsertBuildingStages(this.Entity).subscribe(res => {
      debugger;
      Swal.fire('Building Stages Saved Successfully!');
      this.Clear();
    })
  }


  public Clear() {
    this.Entity.Code = "",
      this.Entity.Milestone = "",
      this.Entity.UnitWt = 0.0
  }




  public UpdateBuildingStagesMaster() {
    debugger;
    this.fmsservice.UpdateBuildingStages(this.Assetid, this.Entity).subscribe(res => {
      debugger;
      Swal.fire('Building Stages Updated Successfully!');

    })
  }

}
