import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2'
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-process',
  templateUrl: './project-process.component.html',
  styleUrls: ['./project-process.component.css']
})
export class ProjectProcessComponent implements OnInit {

  constructor(public fmsservice: FmsService, private datePipe: DatePipe, public activatedRoute: ActivatedRoute, public router: Router) { }
  ProcessList:any;
  photolist:any;
  videolist:any;
  ngOnInit() {
    this.GetProjectProcess()
  }
  public GetProjectProcess() {
    this.fmsservice.GetProjectProcess().subscribe(
      res => {
        debugger;
        this.ProcessList = res;
      }
    )
  }


  NoImagesAvail
  getimage(data){
    debugger
    this.fmsservice.GetProjectProgressPhotos(data).subscribe(data=>{
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

  getvideo(data){
    debugger
    this.fmsservice.GetProjectProgressVideos(data).subscribe(data=>{
      debugger
      this.videolist=data;

    })

  }

}
