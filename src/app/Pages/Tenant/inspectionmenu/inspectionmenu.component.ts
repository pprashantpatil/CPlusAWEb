import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-inspectionmenu',
  templateUrl: './inspectionmenu.component.html',
  styleUrls: ['./inspectionmenu.component.css']
})
export class InspectionmenuComponent implements OnInit {
  inspectionlist: any;
  Reason: any;
  Reason1: any;
  inspecID: any;
  searchtext: any;
  confirmButtonText: string;
  photolist:any;

  constructor(public fmsservice: FmsService, public router: Router) { }



  ngOnInit() {

    this.fmsservice.GetInspection_Menu().subscribe(data => {
      debugger
      this.inspectionlist = data;
    })
  }

  public DeleteInspection(evn) {
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

          debugger
          this.fmsservice.DeleteInspection_Menu(evn).subscribe(data => {
            if (data != undefined) {
              this.fmsservice.GetInspection_Menu().subscribe(data => {
                debugger
                this.inspectionlist = data;
              })
            }
          })
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }

  public EditInspection(evn) {
    debugger;
    let InspectionID = evn.id;
    this.router.navigate(['/Newinspection', InspectionID]);
  }

  updatens() {
    debugger

    this.fmsservice.CompleteInspection_Menu(this.inspecID, this.Reason).subscribe(data => {
      if (data != undefined) {

        this.fmsservice.GetInspection_Menu().subscribe(data => {
          debugger
          this.inspectionlist = data;
        })
      }

    })


  }

  NoImagesAvail

  getimage(data){
    debugger

    this.fmsservice.GetInspectionErrorListByID(data).subscribe(data=>{
      debugger
      this.photolist=data;
      if (data[0] == undefined) {
        this.NoImagesAvail = true;
      }
      else {
        this.NoImagesAvail = false;
      }

    })

  }


  Completed(data) {
    debugger
    this.inspecID = data;
  }

  NotSubmitted(data) {
    debugger;
    this.inspecID = data;
  }

  updatens1() {
    this.fmsservice.NotSubmitInspection_Menu(this.inspecID, this.Reason1).subscribe(data => {
      if (data != undefined) {
        this.fmsservice.GetInspection_Menu().subscribe(data => {
          debugger
          this.inspectionlist = data;
        })
      }

    })

    debugger
  }

}
