import { Component, OnInit, SecurityContext } from '@angular/core';
import { FmsService } from '../../../services/fms.service'
import { ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2';
import { Pipe, PipeTransform } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-timelineplanimages',
  templateUrl: './timelineplanimages.component.html',
  styleUrls: ['./timelineplanimages.component.css']
})
export class TimelineplanimagesComponent implements OnInit {

  paramid: any;
  buildingimageslist: any;
  searchtext: any;
  planID: any;
  FileName: any;
  FileType: any;
  base64textString: any;
  showimage: any;
  lll: any;


  constructor(public fmsService: FmsService, public Route: ActivatedRoute, private sanitizer: DomSanitizer, public datepipe: DatePipe) { }
  transform(url) {
    debugger
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ngOnInit() {

    var list = this.Route.params.subscribe(data => {
      debugger
      this.paramid = data['id']
    })

    this.fmsService.GetTimeLinePlan().subscribe(data => {
      debugger
      let temp: any = data;
      this.buildingimageslist = temp.filter(x => x.id == localStorage.getItem('BuidingPlainsID'));

      for (var i = 0; i < this.buildingimageslist.length; i++) {
        debugger
        if (this.buildingimageslist[i].timelinePlan.includes(".pdf")) {
          this.buildingimageslist[i]['frame'] = 1
        }
        else if (this.buildingimageslist[i].timelinePlan.includes(".xlsx")) {
          this.buildingimageslist[i]['frame'] = 2
        }
        else {
          this.buildingimageslist[i]['frame'] = 0
        }
      }
    })
  }

  BuildingPlanName;
  updateplanphoto(id, planName) {
    debugger
    this.planID = id;
    this.BuildingPlanName = planName;

  }



  handleFileSelect(evt) {
    //console.log(evt);
    var File = evt.target.value;
    // console.log(File);
    let subStringData = File.substr(12, 10000);
    //console.log(X);
    var FileName = subStringData.split('.')[0];
    var FileType = subStringData.split('.')[1];
    console.log(FileName);
    console.log(FileType);
    this.FileName = FileName;
    this.FileType = FileType;
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }


  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(this.base64textString);
  }


  Updatebuildingplanimage() {

    debugger
    var filter = {
      'ID': this.planID,
      'FileName': this.FileName,
      'FileType': this.FileType,
      'modifieddate': new Date(),
      'Base64Data': this.base64textString,
    }


    this.fmsService.updateTimeLinePlan(filter).subscribe(data => {
      debugger
      if (data != undefined) {
        debugger;

        Swal.fire("TimeLine Plan  Updated Successfully");
        // this.InsertLoginDetails1();

        this.fmsService.GetTimeLinePlan().subscribe(data => {
          debugger
          let temp: any = data;
          this.buildingimageslist = temp.filter(x => x.buildingID == this.paramid);

          for (var i = 0; i < this.buildingimageslist.length; i++) {
            debugger
            if (this.buildingimageslist[i].timelinePlan.includes(".pdf")) {
              this.buildingimageslist[i]['frame'] = 1
            }
            else if (this.buildingimageslist[i].timelinePlan.includes(".xlsx")) {
              this.buildingimageslist[i]['frame'] = 2
            }
            else {
              this.buildingimageslist[i]['frame'] = 0
            }
          }
        })
      }
    })
  }


  InsertLoginDetails1() {
    debugger
    var obj = {
      "ApplicationName": 'Buidling Plan' + ' Update',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Building Plan",
      "Action": 'Update Building Plan',
      "IPAddress": "175.143.31.41"
    }
    this.fmsService.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  // DeleteBuildingplanimage(id){
  //   debugger

  // }
  BuildingPlans;

  DeleteBuildingplanimage(ID, planName) {
    debugger;
    this.BuildingPlans = planName

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover TimeLine Plan!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsService.DeleteTimeLinePlan(ID).subscribe(data => {
          if (data != undefined) {
            Swal.fire(
              'Deleted!',
              'Your TimeLine Plan has been deleted.',
              'success'
            )
            this.fmsService.GetTimeLinePlan().subscribe(data => {
              debugger
              let temp: any = data;
              this.buildingimageslist = temp.filter(x => x.buildingID == this.paramid);

              for (var i = 0; i < this.buildingimageslist.length; i++) {
                debugger
                if (this.buildingimageslist[i].timelinePlan.includes(".pdf")) {
                  this.buildingimageslist[i]['frame'] = 1
                }
                else if (this.buildingimageslist[i].timelinePlan.includes(".xlsx")) {
                  this.buildingimageslist[i]['frame'] = 2
                }
                else {
                  this.buildingimageslist[i]['frame'] = 0
                }
              }
            })

            //this.InsertLoginDetails(this.BuildingPlans);

          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your TimeLine Plan is safe :)',
          'error'
        )
      }
    })
  }


  InsertLoginDetails(BuildingPlans) {
    debugger
    var obj = {
      "ApplicationName": 'Buidling Plan' + BuildingPlans + ' Deleted',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Building",
      "Action": 'Delete Building Plan',
      "IPAddress": "175.143.31.41"
    }
    this.fmsService.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }


  getimage(data) {
    debugger
    this.showimage = data;
  }



}
