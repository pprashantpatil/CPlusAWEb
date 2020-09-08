import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ExportToCsv } from 'export-to-csv';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-architectural-stages-dash',
  templateUrl: './architectural-stages-dash.component.html',
  styleUrls: ['./architectural-stages-dash.component.css']
})
export class ArchitecturalStagesDashComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.GetArchitecturalStagesProcessCheck();
  }


  CompanyLists: any;
  StagesDetailsLists: any;
  public GetArchitecturalStagesProcessCheck() {
    this.fmsservice.GetArchitecturalStagesProcessCheck().subscribe(
      res => {
        debugger;
        this.StagesDetailsLists = res;
      }
    )
  }




  confirmButtonText:any;
  public DeleteAssets(evn) {
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
        if (this.confirmButtonText = "Yes, delete it!") {
          this.DeleteEquipment(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }


  public DeleteEquipment(ID) {
    debugger;
  
    this.fmsservice.DeleteArchitecturalStagesProcessCheck(ID).subscribe(res => {
      debugger;
      this.GetArchitecturalStagesProcessCheck();
    })
  }
}
