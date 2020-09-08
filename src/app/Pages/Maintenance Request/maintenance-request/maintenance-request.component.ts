import { Component, OnInit } from '@angular/core';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2'
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { ExportToCsv } from 'export-to-csv';


@Component({
  selector: 'app-maintenance-request',
  templateUrl: './maintenance-request.component.html',
  styleUrls: ['./maintenance-request.component.css']
})
export class MaintenanceRequestComponent implements OnInit {
  options: FullCalendarOptions;
  events: EventObject[];
  public showorhidecontent: boolean;


  constructor(public fmsservice: FmsService, private datePipe: DatePipe) {

  }
  public pageMenuTitle;
  public maintainenceRequest_PageTitle;
  public maintainenceRequest_breadchrumb;
  public maintainenceRequest_button_Newrequest;
  public maintainenceRequest_search;
  public maintainenceRequest_Request_Name;
  public maintainenceRequest_RequestType;
  public maintainenceRequest_Building;
  public maintainenceRequest_Floor;
  public maintainenceRequest_Unit;
  public maintainenceRequest_RaisedTo;
  public maintainenceRequest_Due_Date;
  public maintainenceRequest_Status;
  public maintainenceRequest_Comments;
  public maintainenceRequest_Actions;
  public selectedlanguage;
  selectedlanguage1: any
  public MaintainanceList: any;
  maintainencelist: any;
  Buildinglist: any;
  Statuslist: any;
  datelist = [];
  startdate: any;
  enddate: any;
  options1: NgDateRangePickerOptions;
  BuildingID: any;
  mentypeID: any;
  ststusID: any;
  searchtext: any;
  Vendorlist: any;

  requesttype: any;
  buildname: any;
  statusname: any;
  VendorTypeList: any;

  phoneNo: any;
  emailID: any;
  Vendorlist2: any;
  maintainenceID: any;
  vendorName: any;
  venID: any;
  MaintenanceID: any;


  photourllist: any;
  ImageID: any;
  discription: any;

  FileName: any;
  FileType: any;
  base64textString: any;
  public SelectedDateRange;
  public vendorType;
  raisedby: any;

  public filenamedetails = [];
  public filetypedetails = [];
  public base64textStringdetails = [];
  Ulist: any;

  llll: any;

  //callender variables;
  public callenderyear;
  public callenderMonth;
  public callenderstartday;
  public callenderendday;
  public callenderdaysdount = [];
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');



  ngOnInit() {
    debugger;
    // this.GetUsersdrop();

    this.NoStafVis = false;
    this.options1 = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };



    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetMaintainenceRequestLanguageByLanguageID(this.selectedlanguage);
    //this.GetMaintenanceRequestList(this.selectedlanguage);
    if (this.selectedlanguage == '1') {
      this.selectedlanguage1 = 'en';
    }
    else if (this.selectedlanguage == '2') {
      this.selectedlanguage1 = 'ar';
    }
    else if (this.selectedlanguage == '3') {
      this.selectedlanguage1 = 'id';
    }
    else if (this.selectedlanguage == '4') {
      this.selectedlanguage1 = 'zh';
    }
    else if (this.selectedlanguage == '5') {
      this.selectedlanguage1 = 'th';
    }
    else if (this.selectedlanguage == '6') {
      this.selectedlanguage1 = 'es';
    }
    this.options = {

      editable: true,
      locale: this.selectedlanguage1,
      header: {
        right: 'prev,next ',
        center: 'title',
        left: 'month listMonth'
      },

      // contentHeight: 300,
      height: 500,
    }


    this.startdate = this.datePipe.transform(new Date(new Date().getFullYear(), 0, 1), 'yyyy/MM/dd');
    this.enddate = this.datePipe.transform(new Date(new Date().getFullYear(), 11, 31), 'yyyy/MM/dd');

    this.fmsservice.GetMaintenanceRequestList(1, this.startdate, this.enddate, this.selectedlanguage).subscribe(data => {
      debugger
      this.MaintainanceList = data;
      this.buildcallender(this.MaintainanceList);
    })

    this.fmsservice.GetMaintenanceRequestType(this.selectedlanguage).subscribe(data => {
      debugger
      this.maintainencelist = data;

      this.maintainencelist.sort(function (a, b) {
        var nameA = a.short.toUpperCase(); // ignore upper and lowercase
        var nameB = b.short.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {

          return -1;
        }

        if (nameA > nameB) {

          return 1;
        }

        // names must be equal
        return 0;
      });


    });

    this.fmsservice.GetBuildinglist(this.selectedlanguage).subscribe(
      res => {
        debugger
        this.Buildinglist = res;

        this.Buildinglist.sort(function (a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {

            return -1;
          }

          if (nameA > nameB) {

            return 1;
          }

          // names must be equal
          return 0;
        });
      }
    );

    this.fmsservice.GetStatusType().subscribe(
      res => {
        debugger
        this.Statuslist = res;

        this.Statuslist.sort(function (a, b) {
          var nameA = a.short.toUpperCase(); // ignore upper and lowercase
          var nameB = b.short.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {

            return -1;
          }

          if (nameA > nameB) {

            return 1;
          }

          // names must be equal
          return 0;
        });

      }
    );


    this.fmsservice.GetVendorType(this.selectedlanguage).subscribe(data => {
      debugger
      this.VendorTypeList = data;


    });

    this.GetTenantList(1);
    // this.fmsservice.GetStaff(1).subscribe(
    //   res => {
    //     debugger;
    //     this.Ulist = res;

    //   }
    // )

  }



  public buildcallender(MaintainanceList) {
    this.callenderdaysdount.length = 0;
    this.callenderyear = this.callenderBindData.getFullYear();
    this.callenderMonth = this.datePipe.transform(this.callenderBindData, 'MMMM');
    this.callenderstartday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth(), 1);
    this.callenderendday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth() + 1, 0);
    this.callenderdaysdount.length = this.callenderendday.getDate();
    let o = 0;
    for (let i = 0; i < this.callenderdaysdount.length; i++) {
      let sdate = this.callenderstartday;
      let _date;
      if (sdate.getDate() == 1 && o == 0) {
        _date = sdate.setDate(sdate.getDate() + 0);
        o++
      }
      else {
        _date = sdate.setDate(sdate.getDate() + 1);
      }
      _date = this.datePipe.transform(sdate, 'dd');
      let _day = this.datePipe.transform(sdate, 'EEE');
      let dateformat = this.datePipe.transform(sdate, 'yyyy-MM-ddTHH:mm:ss');

      this.callenderdaysdount[i] = { date: _date, day: _day, dateformat: dateformat };
    }

    //Events Binding

    for (let j = 0; j < MaintainanceList.length; j++) {
      debugger;
      let currenteventlist = this.callenderdaysdount.filter(x => this.datePipe.transform(x.dateformat, 'yyyy-MM-dd') == this.datePipe.transform(MaintainanceList[j].duedate, 'yyyy-MM-dd'));
      if (currenteventlist.length > 0) {
        this.callenderdaysdount[currenteventlist[0].date - 1]['request'] = MaintainanceList[j].request;
        this.callenderdaysdount[currenteventlist[0].date - 1]['unitID'] = MaintainanceList[j].unitID;
        this.callenderdaysdount[currenteventlist[0].date - 1]['Floor'] = MaintainanceList[j].floor;
        this.callenderdaysdount[currenteventlist[0].date - 1]['Status'] = MaintainanceList[j].status;
        this.callenderdaysdount[currenteventlist[0].date - 1]['vendorName'] = MaintainanceList[j].vendorName;
        this.callenderdaysdount[currenteventlist[0].date - 1]['Phone'] = MaintainanceList[j].vendorphone;

        if (this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] == undefined) {
          this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] = "";
        }
        this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] = this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] +
          "<span class='event_PendingBookCommunity'> Request : " + MaintainanceList[j].request +
          // "<br>  Building :" + MaintainanceList[j].buildingname +
          // "<br>  Floor :" + MaintainanceList[j].floor +
          // "<br>  Unit :" + MaintainanceList[j].unitID +
          "</span>";
      }

    }
  }



  public ShowMaintenanceRequest(evn) {
    debugger;
    var html = evn.srcElement.innerText.split(' :');
    if (html.length <= 5) {
      debugger;
      let HTML = html[1].trim()
      let MaintenanceRequest = this.MaintainanceList.filter(x => x.request.trim() == HTML);
      Swal.fire(({
        title: '<strong>Staff <u>Details</u></strong>',
        type: 'info',
        html:
          '<p style="font-size: 14px;text-align: start;margin-left: 32px;">Request: ' + html[1] +
          '       <br>' +
          'Building: ' + MaintenanceRequest[0].buildingname +
          '       <br>' +
          'Floor: ' + MaintenanceRequest[0].floor +
          '       <br>' +
          'Unit: ' + MaintenanceRequest[0].unitID +
          '       <br>' +
          'Vendor: ' + MaintenanceRequest[0].vendorName +
          '       <br>' +
          'Internal Staff: ' + MaintenanceRequest[0].internalUser +
          '</p>'
        ,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,

      }));
    }


  }

  public previousmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.buildcallender(this.MaintainanceList);
  }
  public nextmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.MaintainanceList);
  }


  Tenentlist;
  public GetTenantList(languageid) {
    this.fmsservice.GetTenantList(languageid).subscribe(
      res => {
        debugger;
        this.Tenentlist = res;
      }
    )
  }





  filterrequesttype(requesttype) {
    debugger
    this.requesttype = requesttype.target.value;
  }

  TenantName
  filterByTenant(requesttype) {
    debugger
    this.TenantName = requesttype.target.value;
  }



  filterbuilding(buildname) {
    debugger
    this.buildname = buildname.target.value;
  }

  filterstatus(statusname) {
    debugger
    this.statusname = statusname.target.value;
  }


  typeChanged(vendorType) {
    debugger

    this.fmsservice.GetVendorByTypeID(vendorType).subscribe(data => {
      debugger
      this.Vendorlist = data;

      // this.phoneNo=this.Vendorlist[0].phoneNo
      //   this.emailID=this.Vendorlist[0].emailID
    })

  }

  VName
  getvendetails(vendorName) {
    debugger
    this.venID = vendorName

    var list = this.Vendorlist.filter(x => x.id == vendorName)

    this.Vendorlist2 = list;
    this.VName = this.Vendorlist2[0].vendorName
    this.phoneNo = this.Vendorlist2[0].phoneNo
    this.emailID = this.Vendorlist2[0].emailID

  }


  public GetMaintainenceRequestLanguageByLanguageID(languageid) {
    this.fmsservice.GetMaintainenceRequestLanguageByLanguageID(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.maintainenceRequest_PageTitle = res[0].maintainenceRequest_PageTitle;
        this.maintainenceRequest_breadchrumb = res[0].maintainenceRequest_breadchrumb;
        this.maintainenceRequest_button_Newrequest = res[0].maintainenceRequest_button_Newrequest;
        this.maintainenceRequest_search = res[0].maintainenceRequest_search;
        this.maintainenceRequest_Request_Name = res[0].maintainenceRequest_Request_Name;
        this.maintainenceRequest_RequestType = res[0].maintainenceRequest_RequestType;
        this.maintainenceRequest_Building = res[0].maintainenceRequest_Building;
        this.maintainenceRequest_Floor = res[0].maintainenceRequest_Floor;
        this.maintainenceRequest_Unit = res[0].maintainenceRequest_Unit;
        this.maintainenceRequest_RaisedTo = res[0].maintainenceRequest_RaisedTo;
        this.maintainenceRequest_Due_Date = res[0].maintainenceRequest_Due_Date;
        this.maintainenceRequest_Status = res[0].maintainenceRequest_Status;
        this.maintainenceRequest_Comments = res[0].maintainenceRequest_Comments;
        this.maintainenceRequest_Actions = res[0].maintainenceRequest_Actions;
        this.raisedby = res[0].raisedby
        this.discription = res[0].discription

      }
    )
  }
  changeStatus(evn) {

    if (evn.currentTarget.checked) {
      this.showorhidecontent = false;
    }
    else {
      this.showorhidecontent = true;
    }

  }

  // public GetMaintenanceRequestList(languageid) {

  //   let startdate = new Date();
  //   startdate.setDate(startdate.getMonth() - 1);
  //   let enddate = new Date();
  //   debugger;
  //   let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
  //   let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

  //   this.fmsservice.GetMaintenanceRequestList("2019-01-01", "2019-12-31", languageid,1).subscribe(
  //     res => {
  //       debugger
  //       this.MaintainanceList = res;
  //     }
  //   )
  // }


  selectedDate(value) {
    this.datelist.pop()
    debugger
    this.datelist = value.split('-')

    this.startdate = this.datelist[0]
    this.enddate = this.datelist[1]
    debugger

    this.fmsservice.GetMaintenanceRequestList(1, this.startdate, this.enddate, this.selectedlanguage).subscribe(data => {
      debugger
      this.MaintainanceList = data;
    })
  }


  MaintainanceData;
  WorkOrderNo;
  buildingName;
  Floor;
  UnitName;
  assetName;
  WarrantyTill;
  Requests;
  DueDate;
  PreferredTime;
  TenantID;
  GetmaintainanceID(menID) {
    debugger
    this.maintainenceID = menID
    this.fmsservice.GetMaintenanceRequest(this.maintainenceID).subscribe(data => {
      debugger
      this.MaintainanceData = data;
      this.WorkOrderNo = this.MaintainanceData[0].workOrderNo
      this.buildingName = this.MaintainanceData[0].buildingName
      this.Floor = this.MaintainanceData[0].floor
      this.UnitName = this.MaintainanceData[0].unitID
      this.assetName = this.MaintainanceData[0].asset
      this.WarrantyTill = this.MaintainanceData[0].warrantyTill
      this.Requests = this.MaintainanceData[0].request
      this.Date = this.datePipe.transform(this.MaintainanceData[0].dueDate, 'yyyy-MM-dd'),

        this.StartTime = this.MaintainanceData[0].preferredTime,
        this.TenantID = this.MaintainanceData[0].uid

    })

  }




  IntUserID;

  assignTask() {
    debugger

    var filter = {
      "ID": this.maintainenceID,
      "AssignedToName": this.vendorName,
      "AssignedTo": this.venID,
      "AssignedToPhoneNo": this.phoneNo,
      "AssignedToEmailID": this.emailID,
      "InternalUserID": this.IntUserID
    }

    this.fmsservice.UpdateMaintenanceRequestAssign(filter).subscribe(data => {
      debugger

      if (data != undefined) {

        Swal.fire("Assigned Successfully")

        this.savenotification();
        this.savenotification1();
        this.clearassign();
        this.fmsservice.GetMaintenanceRequestList(1, this.startdate, this.enddate, this.selectedlanguage).subscribe(data => {
          debugger
          this.MaintainanceList = data;
        })

      }
    })

  }

  clearassign() {


    this.vendorName = '',
      this.venID = '',
      this.phoneNo = '',
      this.emailID = ''

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




  handleFileSelect1(evt) {
    debugger
    for (var i = 0; i < evt.target.files.length; i++) {
      debugger
      //console.log(evt);
      var File = evt.target.files[i];
      debugger
      // console.log(File);
      //let subStringData=File.substr(12,27);
      //console.log(X);
      var FileName = File.name.split('.')[0];
      var FileType = File.name.split('.')[1];

      debugger
      console.log(FileName);
      console.log(FileType);
      this.FileName = FileName;
      this.FileType = FileType;
      //this.filenamedetails.push({fname:this.FileName,ffile:this.FileType,base:this.base64textString});
      //this.filetypedetails.push(this.FileType);

      var files = evt.target.files;
      var file = files[i];
      if (files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded1.bind(this);
        reader.readAsBinaryString(file);


      }

      this.filenamedetails.push({ fname: this.FileName, ffile: this.FileType, base: this.base64textStringdetails });
      debugger
    }


  }
  _handleReaderLoaded1(readerEvt) {

    debugger
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.base64textStringdetails.push(this.base64textString)
    console.log(this.base64textString);
    debugger

  }

  ///////////////end photo///////////////////////


  addimage(data) {
    debugger
    this.MaintenanceID = data
  }

  addmaintimages() {
    debugger
    // this.photopath.forEach(ele=>{
    //   debugger
    //   var Entity = {
    //     MaintenanceID: this.MaintenanceID,
    //     Attachment: ele,
    //     ModifiedBy: 'Admin',
    //     PDF: 'pdf',
    // };

    // this.fmsservice.InsertMaintenanceDocument(Entity).subscribe(data=>{

    //   if(data!=undefined){
    //     Swal.fire('Succesfully Saved!')
    //   }


    // })
    // })

    for (var j = 0; j < this.filenamedetails.length; j++) {
      debugger

      var Entity = {
        'MaintenanceID': this.MaintenanceID,
        "FileType": this.filenamedetails[j].ffile,
        "FileName": this.filenamedetails[j].fname,
        "modifieddate": new Date(),
        "Base64Data": this.filenamedetails[j].base[j],
        'ModifiedBy': 'Admin',
        'PDF': 'pdf',
      };
      debugger
      this.fmsservice.InsertMaintenanceDocument(Entity).subscribe(data => {

        if (data != undefined) {
          Swal.fire('Image Added Successfully!')


        }


      })

    }
  }


  getImages(menid) {
    debugger

    this.fmsservice.GetMaintenanceDocument(menid).subscribe(data => {
      debugger
      this.photourllist = data;
      if (this.photourllist.length == 0) {
        debugger
        this.llll = 1;
      }

      else {
        debugger
        this.llll = 0;
      }

      debugger
    })
  }

  Assigned;
  uid
  public AssignedTo(evn) {
    debugger;

    this.Assigned = evn.target.value;
    this.GetUsers(this.uid, 1);
  }

  AssignedToName;
  public UserName(evn) {
    debugger;
    this.AssignedToName = evn.target.value;
    this.GetUsers(this.uid, 1);
  }


  UlistByID;
  emailid;
  phn;
  public GetUsers(UserID, LanguageID) {
    debugger;
    this.fmsservice.GetUsers(UserID, LanguageID).subscribe(
      res => {
        debugger;
        this.UlistByID = res;
        this.emailid = res[0].emailID;
        this.phn = res[0].phoneNo;
      }
    )
  }


  // public GetUsersdrop() {
  //   debugger;
  //   this.fmsservice.GetStaff(1).subscribe(
  //     res => {
  //       debugger;
  //       this.Ulist = res;
  //     }
  //   )
  // }


  public Date: any;
  public StartTime: any;
  public NoStafVis: boolean;
  StaffListsByDate;
  StaffLeaves;
  public FilterByStaffType(evn) {
    debugger;
    let SDate = this.Date;
    let StartTime = this.StartTime;
    let StaffTypeID = evn.target.value;

    this.fmsservice.GetStaffByDate(SDate, StartTime, StaffTypeID).subscribe(
      res => {
        debugger;
        this.StaffListsByDate = res;


        if (this.StaffListsByDate.length == 0) {
          this.NoStafVis = true;
        }

      }
    )
  }



  updateattachment(imageID) {
    debugger
    this.ImageID = imageID
  }


  UpdateMaintenanceRequestDocument() {
    debugger

    var entity = {
      'ID': this.ImageID,
      'pdf': 'pdf',
      'FileName': this.FileName,
      'FileType': this.FileType,
      'modifieddate': new Date(),
      'Base64Data': this.base64textString,
    };

    this.fmsservice.UpdateMaintenanceRequestDocument(entity).subscribe(data => {
      debugger
      if (data != undefined) {

        Swal.fire("Photo Updated Successfully")
      }
    })


  }


  date = new Date();
  public savenotification() {
    debugger;
    let notification = {
      Date: this.date,
      Event: this.Requests,
      FromUser: this.VName,
      ToUser: localStorage.getItem('username'),
      Message: 'Maintenance Request For Work Order : '
        + this.WorkOrderNo + " For "
        + this.buildingName + ", At "
        + this.Floor + ", & Unit  "
        + this.UnitName + " ,"
        + " For " + " ' " + this.Requests + " ' " + " Has Been Assigned...",
      Photo: 'photo',
      Building: this.buildingName,
      NotificationTypeID: 1,
      VendorID: this.venID
    };
    this.fmsservice.InsertNotification(notification).subscribe(
      res => {
        ;
      }
    )

  }


  date1 = new Date();
  public savenotification1() {

    let notification = {
      Date: this.date1,
      Event: this.Requests,
      FromUser: localStorage.getItem('username'),
      ToUser: this.TenantName,
      Message: 'Your Maintenance Request For ' + " ' " + this.Requests + " ' " + 'Has Been Assigned Successfully...',
      Photo: 'photo',
      Building: this.buildingName,
      NotificationTypeID: 1,
      UserID: this.TenantID

    };
    this.fmsservice.InsertNotification(notification).subscribe(
      res => {
        ;
      }
    )

  }


  DeleteImage(ImageID) {
    debugger

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Image!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsservice.DeleteMaintenanceRequestDocument(ImageID).subscribe(data => {
          if (data != undefined) {
            Swal.fire(
              'Deleted!',
              'Your Image  has been deleted.',
              'success'
            )

            this.fmsservice.GetMaintenanceRequestList(1, this.startdate, this.enddate, this.selectedlanguage).subscribe(data => {
              debugger
              this.MaintainanceList = data;
            })
          }
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Image  is safe :)',
          'error'
        )
      }
    })



  }


  DeleteMaintenanceRequest(evn) {
    debugger

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover maintenance request!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsservice.DeleteMaintenanceRequest(evn.id).subscribe(data => {
          if (data != undefined) {
            Swal.fire(
              'Deleted!',
              'Your maintenance request has been deleted.',
              'success'
            )
            this.InsertLoginDetails(evn.request);
            this.fmsservice.GetMaintenanceRequestList(1, this.startdate, this.enddate, this.selectedlanguage).subscribe(data => {
              debugger
              this.MaintainanceList = data;
            })
          }
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your maintenance request is safe :)',
          'error'
        )
      }
    })



  }

  public InsertLoginDetails(Request) {
    debugger
    var obj = {
      "ApplicationName": 'MAINTENANCE REQUEST ' + Request + ' Deleted',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "MAINTENANCE REQUEST",
      "Action": 'Delete MAINTENANCE REQUEST',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }


  exporttoexcel() {
    debugger;

    var ExportData = [];
    for (let i = 0; i < this.MaintainanceList.length; i++) {
      debugger;
      let singleData = {
        request: String,
        buildingname: String,
        floor: String,
        unitID: String,
        raisedby: String,
        raisedTo: String,
        assignedphoneno: String,
        equipmentname: String,
        vendorName: String,
        vendorphone: String

      }

      singleData.request = this.MaintainanceList[i].request
      singleData.buildingname = this.MaintainanceList[i].request,
        singleData.floor = this.MaintainanceList[i].request,
        singleData.unitID = this.MaintainanceList[i].request,
        singleData.raisedby = this.MaintainanceList[i].request,
        singleData.raisedTo = this.MaintainanceList[i].request,
        singleData.assignedphoneno = this.MaintainanceList[i].request,
        singleData.equipmentname = this.MaintainanceList[i].request,
        singleData.vendorName = this.MaintainanceList[i].request,
        singleData.vendorphone = this.MaintainanceList[i].request


      ExportData.push(singleData);


      debugger
    }

    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Assets List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Assets List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    debugger
    csvExporter.generateCsv(ExportData);
  }



}
