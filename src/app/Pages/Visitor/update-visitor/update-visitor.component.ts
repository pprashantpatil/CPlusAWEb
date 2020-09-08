import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';


@Component({
  selector: 'app-update-visitor',
  templateUrl: './update-visitor.component.html',
  styleUrls: ['./update-visitor.component.css']
})
export class UpdateVisitorComponent implements OnInit {

  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();


  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datePipe: DatePipe) { }
  public pageMenuTitle;
  public updateVisitorLanguage_PageTitle;
  public updateVisitorLanguage_breadchrumb;
  public updateVisitorLanguage_button_save;
  public updateVisitorLanguage_VisitorName;
  public updateVisitorLanguage_PhoneNumber;
  public updateVisitorLanguage_VisitorType;
  public updateVisitorLanguage_VisitorIDType;
  public updateVisitorLanguage_IDNumber;
  public updateVisitorLanguage_NumberofVisitors;
  public updateVisitorLanguage_Building;
  public updateVisitorLanguage_Floor;
  public updateVisitorLanguage_Unit;
  public updateVisitorLanguage_Remarks;
  public updateVisitorLanguage_EntryDate;
  public updateVisitorLanguage_EntryTime;
  public updateVisitorLanguage_ExitDate;
  public updateVisitorLanguage_VisitorAddress;
  public updateVisitorLanguage_Photo;
  public Visitorlist;
  public VisitorIDTypeList;
  public Buildinglist;
  public BuildingID;
  public Floorlist;
  public mindate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  public VisitorEntity = {
    VisitorName: "",
    Visitortype: 0,
    VisitingPersonName: "",
    VisitorPhoneNo: "",
    Building: 0,
    Floor: 0,
    Unit: 0,
    VisitorIDType: 0,
    NoOfVisitors: 0,
    IDNumber: 0,
    Photo: "NULL",
    Remarks: "",
    EntryDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    EntryTime: "",
    ExitDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    ExitTime: "",
    AddressOfVisitor: "",
    LanguageID: 0,
    TagID: "",
    LaptopSerialNo: ""

  }
  visitorId;
  visitorpic;
  visitorEdit = false;
  photolist = [];

  ngOnInit() {

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
    debugger
    this.visitorId = +this.route.snapshot.paramMap.get('visitorId');
    this.VisitorEntity.Visitortype = 0;
    this.VisitorEntity.Building = 0;
    this.VisitorEntity.Floor = 0;
    if (this.visitorId) {
      this.GetvisitorbyID(this.visitorId);
      this.visitorEdit = true;
    }
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetUpdateVisitorLanguageByLanguageID(selectedlanguage);
    this.GetVisitorType(selectedlanguage);
    this.GetVisitorIDType(selectedlanguage);
    this.GetVisitorIDType(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
  }

  public GetUpdateVisitorLanguageByLanguageID(languageid) {
    debugger
    this.fmsservice.GetUpdateVisitorLanguageByLanguageID(languageid).subscribe(
      res => {
        debugger
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.updateVisitorLanguage_PageTitle = res[0].updateVisitorLanguage_PageTitle;
        this.updateVisitorLanguage_breadchrumb = res[0].updateVisitorLanguage_breadchrumb;
        this.updateVisitorLanguage_button_save = res[0].updateVisitorLanguage_button_save;
        this.updateVisitorLanguage_VisitorName = res[0].updateVisitorLanguage_VisitorName;
        this.updateVisitorLanguage_PhoneNumber = res[0].updateVisitorLanguage_PhoneNumber;
        this.updateVisitorLanguage_VisitorType = res[0].updateVisitorLanguage_VisitorType;
        this.updateVisitorLanguage_VisitorIDType = res[0].updateVisitorLanguage_VisitorIDType;
        this.updateVisitorLanguage_IDNumber = res[0].updateVisitorLanguage_IDNumber;
        this.updateVisitorLanguage_NumberofVisitors = res[0].updateVisitorLanguage_NumberofVisitors;
        this.updateVisitorLanguage_Building = res[0].updateVisitorLanguage_Building;
        this.updateVisitorLanguage_Floor = res[0].updateVisitorLanguage_Floor;
        this.updateVisitorLanguage_Unit = res[0].updateVisitorLanguage_Unit;
        this.updateVisitorLanguage_Remarks = res[0].updateVisitorLanguage_Remarks;
        this.updateVisitorLanguage_EntryDate = res[0].updateVisitorLanguage_EntryDate;
        this.updateVisitorLanguage_EntryTime = res[0].updateVisitorLanguage_EntryTime;
        this.updateVisitorLanguage_ExitDate = res[0].updateVisitorLanguage_ExitDate;
        this.updateVisitorLanguage_VisitorAddress = res[0].updateVisitorLanguage_VisitorAddress;
        this.updateVisitorLanguage_Photo = res[0].updateVisitorLanguage_Photo;

      }
    )
  }


  public GetVisitorType(languageid) {
    this.fmsservice.GetVisitorType(languageid).subscribe(
      res => {

        this.Visitorlist = res;
      }
    )
  }

  public GetVisitorIDType(languageid) {
    this.fmsservice.GetVisitorIDType(languageid).subscribe(
      res => {

        this.VisitorIDTypeList = res;
      }
    )
  }

  public GetBuildinglist(languageid) {
    debugger
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {

        this.Buildinglist = res;
        debugger
      }
    )
  }

  public GetFloor(evn) {
    debugger
    this.BuildingID = evn.target.value;
    this.fmsservice.GetFloor(this.BuildingID).subscribe(
      res => {
        this.Floorlist = res;
        debugger
      }
    )
  }

  // onFilesAdded(files: File[]) {
  //   debugger
  //   this.fmsservice.VisitorPhotoUpload(files).subscribe(res => {

  //     this.photolist.push(res);
  //     debugger
  //     this.VisitorEntity.Photo = res.toString();
  //   })
  // }



  public Photos = [];
  public attachments = [];
  onFilesAdded(files: File[]) {
    debugger
    this.Photos.length = 0;
    for (let i = 0; i < files.length; i++) {
      debugger
      this.Photos.push(files[i]);

    }
  }

  public UploadPhotos(visitorID) {
    debugger
    this.fmsservice.VisitorPhotoUpload(this.Photos).subscribe(res => {

      for (let i = 0; i < res.length; i++) {
        let PhotosEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        debugger
        this.attachments.push(PhotosEntity);
      }
      debugger
      this.InsertVisitorDocument(visitorID);

    })
  }

  InsertVisitorDocument(res) {
    debugger
    for (var i = 0; i < this.attachments.length; i++) {
      debugger
      var filter = {
        'VisitorID': res,
        'Attachment': this.attachments[i].docpathURL1,
        'ModifiedBy': new Date()
      }
      debugger
      this.fmsservice.InsertVisitorDocument(filter).subscribe(data => {
        debugger
        if (data != undefined) {


        }

      })
    }


  }




  Isempty = false;
  EmailValid;
  PhoneNumberValid;

  public InsertVisitor() {
    debugger
    let mandatoryfields = {
      VisitorName: this.VisitorEntity.VisitorName,
      VisitorPhoneNo: this.VisitorEntity.VisitorPhoneNo,
      Visitortype: this.VisitorEntity.Visitortype,
      VisitorIDType: this.VisitorEntity.VisitorIDType,
      IDNumber: this.VisitorEntity.IDNumber,
      NoOfVisitors: this.VisitorEntity.NoOfVisitors,
      Building: this.VisitorEntity.Building,
      Floor: this.VisitorEntity.Floor,
      Unit: this.VisitorEntity.Unit,
      EntryDate: this.VisitorEntity.EntryDate,
      EntryTime: this.VisitorEntity.EntryTime,
      AddressOfVisitor: this.VisitorEntity.AddressOfVisitor,
      Photo: this.Photos,

    }

    let validate = this.fmsservice.isEmpty(mandatoryfields);
    debugger
    if (validate.length > 0) {
      debugger
      this.Isempty = true;
    } else {
      // this.EmailValid = this.fmsservice.validateEmail(this.AssetsEntity.VendorEmailID);
      debugger;
      this.PhoneNumberValid = this.fmsservice.phonenumber(this.VisitorEntity.VisitorPhoneNo);
      if (this.EmailValid == false || this.PhoneNumberValid == false) {

        debugger;
      } else {
        this.VisitorEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
        let test = this.VisitorEntity;
        this.fmsservice.InsertVisitor(this.VisitorEntity).subscribe(res => {

          debugger
          Swal.fire('Visitor Details Successfully Saved!');
          this.UploadPhotos(res)
          this.Clear();
          this.Photos.length = 0;
          // this.savenotification();


        })
      }
    }
  }

  date = new Date();
  public savenotification() {

    let notification = {
      Date: this.date,
      Event: 'Visitor Request',
      FromUser: localStorage.getItem('username'),
      ToUser: localStorage.getItem('username'),
      Message: 'Your Visitor Has Arrived!!!',
      Photo: 'photo',
      Building: this.VisitorEntity.Building,
      NotificationTypeID: 12
    };
    this.fmsservice.InsertNotification(notification).subscribe(
      res => {
        ;
      }
    )

  }

  public Clear() {
    this.VisitorEntity.VisitorName = "",
      this.VisitorEntity.Visitortype = 0,
      this.VisitorEntity.VisitingPersonName = "",
      this.VisitorEntity.VisitorPhoneNo = "",
      this.VisitorEntity.Building = 0,
      this.VisitorEntity.Floor = 0,
      this.VisitorEntity.Unit = 0,
      this.VisitorEntity.VisitorIDType = 0,
      this.VisitorEntity.NoOfVisitors = 0,
      this.VisitorEntity.IDNumber = 0,
      // this.VisitorEntity.Photo= "NULL",
      this.VisitorEntity.Remarks = "",
      this.VisitorEntity.EntryDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      this.VisitorEntity.EntryTime = "",
      this.VisitorEntity.ExitDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      this.VisitorEntity.ExitTime = "",
      this.VisitorEntity.AddressOfVisitor = ""


  }







  public GetvisitorbyID(vistorid) {

    this.fmsservice.GetVisitorsByID(vistorid).subscribe(res => {
      debugger
      this.VisitorEntity.VisitorName = res[0].visitorName;
      this.VisitorEntity.VisitorPhoneNo = res[0].visitorPhoneNo;
      this.VisitorEntity.Visitortype = res[0].visitorType;
      this.VisitorEntity.VisitorIDType = res[0].visitorIDType;
      this.VisitorEntity.IDNumber = res[0].idNumber;
      this.VisitorEntity.TagID = res[0].tagID;
      this.VisitorEntity.NoOfVisitors = res[0].noOfVisitors;
      this.VisitorEntity.Building = res[0].building;
      this.VisitorEntity.LaptopSerialNo = res[0].laptopSerialNo;

      this.fmsservice.GetFloor(res[0].building).subscribe(
        data => {
          this.Floorlist = data;
          debugger

          var list = this.Floorlist.filter(x => x.id == parseInt(res[0].floor));
          debugger
          this.VisitorEntity.Floor = list[0].id;
          // this.GetUnit_MasterbybID(this.VisitorEntity.Building, this.VisitorEntity.Floor);

        }
      );

      debugger
      this.fmsservice.GetUnit_MasterbybID(res[0].building, this.VisitorEntity.Floor).subscribe(

        data => {
          this.Unitslist = data;
          debugger

          var list1 = this.Unitslist.filter(x => x.id == res[0].unit)
          this.VisitorEntity.Unit = list1[0].id

        }
      )

      debugger;
      // this.VisitorEntity.Unit = res[0].unit;
      this.VisitorEntity.Remarks = res[0].remarks;

      this.VisitorEntity.EntryDate = this.datePipe.transform(res[0].entryDate, 'yyyy-MM-dd');

      this.VisitorEntity.EntryTime = this.datePipe.transform(res[0].entryTime, "hh:mm a");
      this.VisitorEntity.ExitDate = this.datePipe.transform(res[0].exitDate, 'yyyy-MM-dd');
      this.VisitorEntity.ExitTime = this.datePipe.transform(res[0].exitTime, "hh:mm a");
      this.VisitorEntity.AddressOfVisitor = res[0].addressOfVisitor;
      this.VisitorEntity.Photo = res[0].actPhoto;
      this.visitorpic = res[0].photo;
    })
  }

  UpdateVisitor() {


    let mandatoryfields = {
      VisitorName: this.VisitorEntity.VisitorName,
      VisitorPhoneNo: this.VisitorEntity.VisitorPhoneNo,
      Visitortype: this.VisitorEntity.Visitortype,
      VisitorIDType: this.VisitorEntity.VisitorIDType,
      IDNumber: this.VisitorEntity.IDNumber,
      NoOfVisitors: this.VisitorEntity.NoOfVisitors,
      Building: this.VisitorEntity.Building,
      Floor: this.VisitorEntity.Floor,
      Unit: this.VisitorEntity.Unit,
      EntryDate: this.VisitorEntity.EntryDate,
      EntryTime: this.VisitorEntity.EntryTime,
      AddressOfVisitor: this.VisitorEntity.AddressOfVisitor,
    }

    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    } else {
      // this.EmailValid = this.fmsservice.validateEmail(this.AssetsEntity.VendorEmailID);
      debugger;
      this.PhoneNumberValid = this.fmsservice.phonenumber(this.VisitorEntity.VisitorPhoneNo);
      if (this.EmailValid == false || this.PhoneNumberValid == false) {
        debugger;
      } else {
        let VisitorsEntity = {
          ID: this.visitorId,
          VisitorName: this.VisitorEntity.VisitorName,
          VisitorPhoneNo: this.VisitorEntity.VisitorPhoneNo,
          Visitortype: this.VisitorEntity.Visitortype,
          IDNumber: this.VisitorEntity.IDNumber,
          Photo: this.VisitorEntity.Photo,
          VisitingPersonName: this.VisitorEntity.VisitorName,
          Building: this.VisitorEntity.Building,
          Floor: this.VisitorEntity.Floor,
          Unit: this.VisitorEntity.Unit,
          VisitorIDType: this.VisitorEntity.VisitorIDType,
          NoOfVisitors: this.VisitorEntity.NoOfVisitors,
          Remarks: this.VisitorEntity.Remarks,
          EntryTime: this.VisitorEntity.EntryTime,
          ExitTime: this.VisitorEntity.ExitTime,
          EntryDate: this.VisitorEntity.EntryDate,
          ExitDate: this.VisitorEntity.ExitDate,
          AddressOfVisitor: this.VisitorEntity.AddressOfVisitor,
          TagID: this.VisitorEntity.TagID,
          LaptopSerialNo: this.VisitorEntity.LaptopSerialNo
        }
        this.fmsservice.UpdateVisitor(VisitorsEntity).subscribe(res => {
          this.savenotification();
          // let vfggg = res;
          Swal.fire('Visitor Details Updated Successfully!');
        })
      }
    }
  }

  public FloorID;

  public UnitByID(evn) {
    debugger;
    this.FloorID = evn.target.value;
    let ttt = this.Floorlist.filter(x => x.id == this.FloorID);
    this.GetUnit_MasterbybID(ttt[0].buildingID, this.FloorID);
  }

  public Unitslist;
  public GetUnit_MasterbybID(BuildingID, FloorID) {
    debugger
    this.fmsservice.GetUnit_MasterbybID(BuildingID, FloorID).subscribe(
      res => {
        this.Unitslist = res;
        debugger;
        if (this.VisitorEntity.Unit != 0) {
          this.VisitorEntity.Unit = this.VisitorEntity.Unit;
        }

      }
    )
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }


}
