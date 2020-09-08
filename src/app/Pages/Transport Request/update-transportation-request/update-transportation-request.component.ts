import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { TabHeadingDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-update-transportation-request',
  templateUrl: './update-transportation-request.component.html',
  styleUrls: ['./update-transportation-request.component.css']
})
export class UpdateTransportationRequestComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  public pageMenuTitle;
  public updateTransportationRequest_PageTitle;
  public updateTransportationRequest_breadchrumb;
  public updateTransportationRequest_button_save;
  public updateTransportationRequest_RequestDetail;
  public updateTransportationRequest_Building;
  public updateTransportationRequest_PickupLocation;
  public updateTransportationRequest_Destination;
  public updateTransportationRequest_DepartureDate;
  public updateTransportationRequest_DepartureTime;
  public updateTransportationRequest_ReturnDate;
  public updateTransportationRequest_ReturnTime;
  public updateTransportationRequest_SpecificInstructions;
  public updateTransportationRequest_WheelChairAccess;
  public updateTransportationRequest_NumberOfPassengers;

  public updateTransportationRequest_NumberOfVehicles;
  public updateTransportationRequest_ApproximateDistance;
  public updateTransportationRequest_WillStopForMeals;
  public updateTransportationRequest_Attachment;
  public selectedlanguage;
  public Buildinglist;
  public TransReqID;


  typeID: any;
  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');


  public traveltype: any;

  public shuttlelist: any;
  public shuttleid: any;
  public buildingid: any;
  public ContactPerson: any;
  public updatetransportid: any;
  public UserID: any;
  FloorList: any;
  Unitlist: any;
  floorID: any;
  shutter: any;
  UnitID: any;

  public TransportEntity = {
    LanguageID: 0,
    Name: "",
    BuildingID: 0,
    FloorID: 0,
    UnitID: 0,
    PickupLocation: "",
    Destination: "",
    DepartureDateTime: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    ReturnDateTime: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    EventDetails: "",
    HandicapBusRequired: false,
    NoOfPassengers: 0,
    NoOfVehicles: 0,
    Distance: "",
    StopForMeals: false,
    Attachment: "Null",
    DepartureTime: "",
    ReturnTime: this.datepipe.transform(new Date(), 'hh:mm aa'),
    ShuttleID: 0,
    UserID: localStorage.getItem('userid'),
    ContactPerson: "",
    email: "",
    time: 0

  }



  ngOnInit() {

    this.traveltype = true;
    debugger
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetUpdateTransportationRequestLanguageByLanguageID(selectedlanguage);
    //let UserID = localStorage.getItem('UserID');
    this.GetBuildinglist(selectedlanguage);
    this.route.params.subscribe(params => {
      debugger;
      this.TransReqID = params['id'];
      this.typeID = params['typeID']
      debugger
      if (this.TransReqID != undefined && this.typeID == 2) {

        this.fmsservice.GetBuildingShuttle().subscribe(data => {
          debugger
          this.shuttlelist = data;
          debugger

          var list = this.shuttlelist.filter(x => x.id == this.TransReqID)
          debugger

          this.TransportEntity.Name = list[0].name,
            this.TransportEntity.BuildingID = list[0].buildingID,
            this.TransportEntity.PickupLocation = list[0].pickUpLocation,
            this.TransportEntity.Destination = list[0].destination,
            this.TransportEntity.time = list[0].shuttletime,
            this.TransportEntity.ShuttleID = list[0].shuttleID,
            this.TransportEntity.ContactPerson = list[0].contactPerson
          this.TransportEntity.email = list[0].email
          debugger
          this.fmsservice.GetFloor(this.TransportEntity.BuildingID).subscribe(data => {
            debugger

            this.FloorList = data;

            var list1 = this.FloorList.filter(x => x.id == list[0].floorID)
            debugger
            this.TransportEntity.FloorID = list1[0].id;
            debugger
          });

          this.fmsservice.GetUnit_MasterbyfloorID(list[0].floorID).subscribe(data => {
            debugger

            this.Unitlist = data;
            debugger
            var list1 = this.Unitlist.filter(x => x.id == list[0].unitID)
            debugger
            this.TransportEntity.UnitID = list1[0].id;
            debugger
          });



          this.shutter = true;
          this.traveltype = true;
        });
      }


      else if (this.TransReqID != undefined && this.typeID == 1) {
        debugger
        this.traveltype = false;

        this.GetTransportationRequestBYID(this.TransReqID);

      }

      // 
      this.GetTransportationDocument(this.TransReqID);
      debugger
      // this.traveltype=localStorage.getItem('traveltype');





    }
    );

    this.GetShuttleMaster();



  }
  public GetUpdateTransportationRequestLanguageByLanguageID(languageid) {
    this.fmsservice.GetUpdateTransportationRequestLanguageByLanguageID(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.updateTransportationRequest_PageTitle = res[0].updateTransportationRequest_PageTitle;
        this.updateTransportationRequest_breadchrumb = res[0].updateTransportationRequest_breadchrumb;
        this.updateTransportationRequest_button_save = res[0].updateTransportationRequest_button_save;
        this.updateTransportationRequest_RequestDetail = res[0].updateTransportationRequest_RequestDetail;
        this.updateTransportationRequest_Building = res[0].updateTransportationRequest_Building;
        this.updateTransportationRequest_PickupLocation = res[0].updateTransportationRequest_PickupLocation;
        this.updateTransportationRequest_Destination = res[0].updateTransportationRequest_Destination;
        this.updateTransportationRequest_DepartureDate = res[0].updateTransportationRequest_DepartureDate;
        this.updateTransportationRequest_DepartureTime = res[0].updateTransportationRequest_DepartureTime;
        this.updateTransportationRequest_ReturnDate = res[0].updateTransportationRequest_ReturnDate;
        this.updateTransportationRequest_ReturnTime = res[0].updateTransportationRequest_ReturnTime;
        this.updateTransportationRequest_SpecificInstructions = res[0].updateTransportationRequest_SpecificInstructions;
        this.updateTransportationRequest_WheelChairAccess = res[0].updateTransportationRequest_WheelChairAccess;
        this.updateTransportationRequest_NumberOfPassengers = res[0].updateTransportationRequest_NumberOfPassengers;
        this.updateTransportationRequest_NumberOfVehicles = res[0].updateTransportationRequest_NumberOfVehicles;
        this.updateTransportationRequest_ApproximateDistance = res[0].updateTransportationRequest_ApproximateDistance;
        this.updateTransportationRequest_WillStopForMeals = res[0].updateTransportationRequest_WillStopForMeals;
        this.updateTransportationRequest_Attachment = res[0].updateTransportationRequest_Attachment;

      }
    )
  }

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;
      }
    )
  }
  Isempty = false;


  public InsertTransportationRequest() {
    debugger;
    if (this.traveltype == false) {
      let mandatoryfields = {
        Name: this.TransportEntity.Name,
        BuildingID: this.TransportEntity.BuildingID,
        PickupLocation: this.TransportEntity.PickupLocation,
        Destination: this.TransportEntity.Destination,
        DepartureTime: this.TransportEntity.DepartureTime,
        NoOfPassengers: this.TransportEntity.NoOfPassengers,
        NoOfVehicles: this.TransportEntity.NoOfVehicles
      }
      let validate = this.fmsservice.isEmpty(mandatoryfields);
      if (validate.length > 0) {
        this.Isempty = true;
      } else {
        this.TransportEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
        let test = this.TransportEntity;

        var filter = {
          'Name': this.TransportEntity.Name,
          'BuildingID': this.TransportEntity.BuildingID,
          'Floor': this.TransportEntity.FloorID,
          'Unit': this.TransportEntity.UnitID,
          'PickupLocation': this.TransportEntity.PickupLocation,
          'Destination': this.TransportEntity.Destination,
          'DepartureDateTime': this.TransportEntity.DepartureDateTime,
          'ReturnDateTime': this.TransportEntity.ReturnDateTime,
          'EventDetails': this.TransportEntity.EventDetails,
          'HandicapBusRequired': this.TransportEntity.HandicapBusRequired,
          'NoOfPassengers': this.TransportEntity.NoOfPassengers,
          'NoOfVehicles': this.TransportEntity.NoOfVehicles,
          'Distance': this.TransportEntity.Distance,
          'StopForMeals': this.TransportEntity.StopForMeals,
          'Attachment': "Attachment",
          'DepartureTime': this.TransportEntity.DepartureTime,
          'ReturnTime': this.TransportEntity.ReturnTime,
          'LanguageID': this.TransportEntity.LanguageID
        }
        this.fmsservice.InsertTransportationRequest(filter).subscribe(res => {
          debugger;
          this.UploadPhotos(res);
          Swal.fire('Transportation Request Successfully Saved!');
          this.InsertLoginDetails();

          this.Clear();
        })
      }
    }

    if (this.traveltype == true) {
      let mandatoryfieldss = {
        PickupLocation: this.TransportEntity.PickupLocation,
        Destination: this.TransportEntity.Destination,

      }
      let validate = this.fmsservice.isEmpty(mandatoryfieldss);
      if (validate.length > 0) {
        this.Isempty = true;
      } else {
        this.TransportEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
        let test = this.TransportEntity;

        //   this.TransportEntity.UserID = this.UserID;
        debugger
        this.fmsservice.InsertBuildingShuttle(this.TransportEntity).subscribe(res => {
          debugger;
          this.UploadPhotos(res);
          Swal.fire('Transportation Request Successfully Saved!');
          this.Clear();
        })
      }
    }

  }




  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Transport Request ' + this.TransportEntity.Name + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Transport Request",
      "Action": 'Add New Transport Request',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  InsertLoginDetails1() {
    debugger
    var obj = {
      "ApplicationName": 'Transport Request ' + this.TransportEntity.Name + ' Updated',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "New Transport Request",
      "Action": 'Update Transport Request',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }



  public Clear() {
    debugger;
    this.TransportEntity.LanguageID = 0;
    this.TransportEntity.Name = null;
    this.TransportEntity.BuildingID = 0;
    this.TransportEntity.PickupLocation = null;
    this.TransportEntity.Destination = null;
    this.TransportEntity.DepartureDateTime = null;
    this.TransportEntity.ReturnDateTime = null;
    this.TransportEntity.EventDetails = null;
    this.TransportEntity.HandicapBusRequired = null;
    this.TransportEntity.NoOfPassengers = 0;
    this.TransportEntity.NoOfVehicles = 0;
    this.TransportEntity.Distance = null;
    this.TransportEntity.StopForMeals = null;
    this.TransportEntity.DepartureTime = null;
    this.TransportEntity.ReturnTime = null;

  }


  public GetTransportationRequestBYID(ID) {
    debugger;
    this.fmsservice.GetTransportationRequestBYID(ID).subscribe(
      res => {
        debugger;
        this.TransportEntity.Name = res["name"];
        this.TransportEntity.BuildingID = res["buildingID"];
        this.fmsservice.GetFloor(this.TransportEntity.BuildingID).subscribe(data => {
          debugger

          this.FloorList = data;

          var list = this.FloorList.filter(x => x.id == res["floor"])
          this.TransportEntity.FloorID = list[0].id;
        });

        this.fmsservice.GetUnit_MasterbyfloorID(res["floor"]).subscribe(data => {
          debugger

          this.Unitlist = data;

          var list = this.Unitlist.filter(x => x.id == res["unit"])
          this.TransportEntity.UnitID = list[0].id;
        });


        // this.TransportEntity.FloorID=res["floor"];
        //this.TransportEntity.UnitID=res["unit"];
        debugger
        this.TransportEntity.PickupLocation = res["pickupLocation"];
        this.TransportEntity.Destination = res["destination"];
        this.TransportEntity.DepartureDateTime = this.datepipe.transform(res["departureDateTime"], 'yyyy-MM-dd');
        this.TransportEntity.ReturnDateTime = this.datepipe.transform(res["returnDateTime"], 'yyyy-MM-dd');
        this.TransportEntity.EventDetails = res["eventDetails"];
        debugger
        this.TransportEntity.HandicapBusRequired = res["handicapBusRequired"];
        this.TransportEntity.NoOfPassengers = res["noOfPassengers"];
        this.TransportEntity.NoOfVehicles = res["noOfVehicles"];
        this.TransportEntity.StopForMeals = res["stopForMeals"];
        this.TransportEntity.Attachment = res["attachment"];
        this.TransportEntity.Distance = res["distance"];
        this.TransportEntity.DepartureTime = res["departureTime"];
        this.TransportEntity.ReturnTime = res["returnTime"];

      }
    )
  }








  public UpdateTransportationRequests() {
    debugger;

    if (this.shutter == true) {
      let mandatoryfields = {
        Name: this.TransportEntity.Name,
        BuildingID: this.TransportEntity.BuildingID,
        PickupLocation: this.TransportEntity.PickupLocation,
        Destination: this.TransportEntity.Destination,
        DepartureTime: this.TransportEntity.time,

        shuttleID: this.TransportEntity.ShuttleID,
        contactPerson: this.TransportEntity.ContactPerson,
        email: this.TransportEntity.email

      }
      let validate = this.fmsservice.isEmpty(mandatoryfields);
      if (validate.length > 0) {
        this.Isempty = true;
      } else {
        debugger

        var filter = {
          'ID': this.TransReqID,
          'BuildingID': Number(this.TransportEntity.BuildingID),
          'ShuttleID': this.TransportEntity.ShuttleID,
          'PickUpLocation': this.TransportEntity.PickupLocation,
          'Destination': this.TransportEntity.Destination,
          'Time': this.TransportEntity.time,
          'ContactPersonName': this.TransportEntity.ContactPerson,
          'EmailID': this.TransportEntity.email,
          'UserID': Number(localStorage.getItem('UserID')),
          'FloorID': Number(this.TransportEntity.FloorID),
          'UnitID': Number(this.TransportEntity.UnitID)
        }


        debugger
        this.fmsservice.UpdateBuildingShuttle(filter).subscribe(res => {
          debugger;
          Swal.fire('Shuttle Updated Successfully!');
          this.InsertLoginDetails1();

        })
      }

    }


    else {

      let mandatoryfields = {
        Name: this.TransportEntity.Name,
        BuildingID: this.TransportEntity.BuildingID,
        PickupLocation: this.TransportEntity.PickupLocation,
        Destination: this.TransportEntity.Destination,
        DepartureTime: this.TransportEntity.DepartureTime,
        NoOfPassengers: this.TransportEntity.NoOfPassengers,
        NoOfVehicles: this.TransportEntity.NoOfVehicles
      }
      let validate = this.fmsservice.isEmpty(mandatoryfields);
      if (validate.length > 0) {
        this.Isempty = true;
      } else {
        this.fmsservice.UpdateTransportationRequest(this.TransReqID, this.TransportEntity).subscribe(res => {
          debugger;
          Swal.fire('Transportation Request Updated Successfully!')
        })
      }
    }



  }





  public Photos = [];
  public UploadedPhotos = [];
  onFilesAddedPhoto(files: File[]) {
    debugger;
    this.Photos.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.Photos.push(files[i]);
    }
  }
  public UploadPhotos(ID) {
    this.fmsservice.TransportationAttachmentUpload(this.Photos).subscribe(res => {
      debugger;
      for (let i = 0; i < res.length; i++) {
        let PhotosEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.UploadedPhotos.push(PhotosEntity);
      }
      this.InsertTransportationDocument(ID);
      //Swal.fire('Updated Successfully!')
    })
  }

  public InsertTransportationDocument(ID) {
    debugger;
    for (let i = 0; i < this.UploadedPhotos.length; i++) {
      let entity = {
        TransportID: ID,
        Attachment: this.UploadedPhotos[i].docpathURL1,
        ModifiedBy: 'Admin',
        pdf: 'Null'
      }
      this.fmsservice.InsertTransportationDocument(entity).subscribe(res => {
        debugger;
        // Swal.fire('Successfully Saved!');
      })
    }
  }


  public Attachmentlist;
  public GetTransportationDocument(TransReqID) {
    this.fmsservice.GetTransportationDocument(TransReqID).subscribe(
      res => {
        debugger;
        this.Attachmentlist = res;
      }
    )
  }

  public GetShuttleMaster() {
    this.fmsservice.GetShuttleMaster().subscribe(data => {
      this.shuttlelist = data;
    })
  }
  public GetShuttleID(even) {
    debugger
    this.shuttleid = even.target.value;
  }



  public GetBuildingID(even) {
    debugger
    this.buildingid = even.target.value;

    this.fmsservice.GetFloor(this.buildingid).subscribe(data => {
      debugger

      this.FloorList = data;


    });
  }


  GetFloorID(eve) {
    debugger
    this.floorID = eve.target.value


    this.fmsservice.GetUnit_MasterbyfloorID(this.floorID).subscribe(data => {
      debugger

      this.Unitlist = data;



    })

  }


  GetUnitID(eve) {
    debugger
    this.UnitID = eve.target.value

  }





}


