import { Component, OnInit } from '@angular/core';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';



@Component({
  selector: 'app-technology-request',
  templateUrl: './technology-request.component.html',
  styleUrls: ['./technology-request.component.css']
})
export class TechnologyRequestComponent implements OnInit {
  options: FullCalendarOptions;
  events: EventObject[];
  public showorhidecontent: boolean;

  public pageMenuTitle;
  public technology_PageTitle;
  public technology_BreadChrumb;
  public technology_Button;
  public technology_Excel;
  public technology_Calendar;
  public technology_List;
  public technology_Search;
  public technology_RequestName;
  public technology_RequestType;
  public technology_Building;
  public technology_Floor;
  public technology_Unit;
  public technology_DueDate;
  public technology_RaisedBy;
  public technology_AssignedTo;
  public technology_Status;
  public technology_Comment;
  public technology_Actions;
  public selectedlanguage;
  public TechnologyList: any;
  public filteredTechnologyList: any;
  public buildingList;
  public statustypeList;
  pickeroptions;
  TechnologyRequestTypeList;
  searchtechreq;
  vendortypelist;
  vendorlist;
  TechnologyAttachment;

  vendortypeid;
  vendorname;
  vendorid;

  public Uploadattachmentlist = [];

  vendorPhonenumber;
  vendoremail;
  SelectedVendorType;
  SelectedVendor;

  SelectedTechID;
  //callender variables;
  public callenderyear;
  public callenderMonth;
  public callenderstartday;
  public callenderendday;
  public callenderdaysdount = [];
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');

  constructor(public fmsservice: FmsService, private datePipe: DatePipe, public router: Router) { }




  ngOnInit() {

    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetTechnologyLanguage(selectedlanguage);
    this.GetTechnologyRequest(selectedlanguage);
    this.GetTechnologyRequestType(selectedlanguage);
    this.getbuildingList(selectedlanguage);
    this.GetStatusType();
    if (selectedlanguage == '1') {
      this.selectedlanguage = 'en';
    }
    else if (selectedlanguage == '2') {
      this.selectedlanguage = 'ar';
    }
    else if (selectedlanguage == '3') {
      this.selectedlanguage = 'id';
    }
    else if (selectedlanguage == '4') {
      this.selectedlanguage = 'zh';
    }
    else if (selectedlanguage == '5') {
      this.selectedlanguage = 'th';
    }
    else if (selectedlanguage == '6') {
      this.selectedlanguage = 'es';
    }
    this.options = {

      editable: true,
      locale: this.selectedlanguage,

      header: {
        right: 'prev,next ',
        center: 'title',
        left: 'month listMonth'
      },

      // contentHeight: 300,
      height: 500,

    };

    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,

    };

    this.events = [
      { id: 'a', title: 'My Birthday', allDay: true },
      { id: 'b', title: 'Friends coming round', start: '2018-07-26T18:00:00', end: '2018-07-26T23:00:00' }
    ]


  }

  public GetTechnologyLanguage(languageid) {
    this.fmsservice.GetTechnologyLanguage(languageid).subscribe(
      res => {

        this.pageMenuTitle = res[0].pageMenuTitle;
        this.technology_PageTitle = res[0].technology_PageTitle;
        this.technology_BreadChrumb = res[0].technology_BreadChrumb;
        this.technology_Button = res[0].technology_Button;
        this.technology_Excel = res[0].technology_Excel;
        this.technology_Calendar = res[0].technology_Calendar;
        this.technology_List = res[0].technology_List;
        this.technology_Search = res[0].technology_Search;
        this.technology_RequestName = res[0].technology_RequestName;
        this.technology_RequestType = res[0].technology_RequestType;
        this.technology_Building = res[0].technology_Building;
        this.technology_Floor = res[0].technology_Floor;
        this.technology_Unit = res[0].technology_Unit;
        this.technology_DueDate = res[0].technology_DueDate;
        this.technology_RaisedBy = res[0].technology_RaisedBy;
        this.technology_AssignedTo = res[0].technology_AssignedTo;
        this.technology_Status = res[0].technology_Status;
        this.technology_Comment = res[0].technology_Comment;
        this.technology_Actions = res[0].technology_Actions;
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

  public GetTechnologyRequest(languageid) {
    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();

    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');
    debugger;
    this.fmsservice.GetTechnologyRequest("2019-01-01", "2019-12-31", languageid).subscribe(
      res => {
        debugger;
        this.TechnologyList = res;
        this.filteredTechnologyList = this.TechnologyList;
        this.buildcallender(this.TechnologyList);
      }
    )
  }

  public buildcallender(TechnologyList) {
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
      let dateformat = this.datePipe.transform(sdate, 'MM-dd-yyyy');

      this.callenderdaysdount[i] = { date: _date, day: _day, dateformat: dateformat };
    }

    //Events Binding

    for (let j = 0; j < TechnologyList.length; j++) {
      debugger;
      let DepartureDate = TechnologyList[j].dueDate.split(' ');
      let currenteventlist = this.callenderdaysdount.filter(x => x.dateformat == DepartureDate[0]);
      if (currenteventlist.length > 0) {
        this.callenderdaysdount[currenteventlist[0].date - 1]['request'] = TechnologyList[j].request;
        this.callenderdaysdount[currenteventlist[0].date - 1]['building'] = TechnologyList[j].building;
        this.callenderdaysdount[currenteventlist[0].date - 1]['floor'] = TechnologyList[j].floor;
        this.callenderdaysdount[currenteventlist[0].date - 1]['raisedBy'] = TechnologyList[j].raisedBy;
        this.callenderdaysdount[currenteventlist[0].date - 1]['phoneNo'] = TechnologyList[j].phoneNo;
        this.callenderdaysdount[currenteventlist[0].date - 1]['statusID'] = TechnologyList[j].statusID;
      }

    }
  }

  public previousmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.buildcallender(this.TechnologyList);
  }
  public nextmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.TechnologyList);
  }

  public GetTechnologyRequestType(languageid) {
    this.fmsservice.GetTechnologyRequestType(languageid).subscribe(res => {
      this.TechnologyRequestTypeList = res;
      this.TechnologyRequestTypeList.sort(function (a, b) {
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
    })

  }

  reqesttype;
  public onselecttechnologyrequesttype(evn) {
    this.reqesttype = evn.target.value;
    if (this.reqesttype != "none") {
      this.filteredTechnologyList = this.TechnologyList.filter(x => x.requestTypeID == this.reqesttype && x.buildingID == this.buildingid);
    }
    else {
      this.filteredTechnologyList = this.TechnologyList;
    }

  }

  public getbuildingList(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(res => {
      this.buildingList = res;
      this.buildingList.sort(function (a, b) {
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
    })
  }

  buildingid;
  public onselectbuilding(evn) {
    this.buildingid = evn.target.value;
    if (this.buildingid != "none") {
      this.filteredTechnologyList = this.TechnologyList.filter(x => x.buildingID == this.buildingid);
    }
    else {
      this.filteredTechnologyList = this.TechnologyList;
    }
  }


  public GetStatusType() {

    this.fmsservice.GetStatusType().subscribe(res => {
      debugger;
      this.statustypeList = res;
    })

  }

  public onselectstatus(evn) {
    let statusid = evn.target.value;

    if (statusid != "none") {
      this.filteredTechnologyList = this.TechnologyList.filter(x => x.statusID == statusid && x.buildingID == this.buildingid && x.requestTypeID == this.reqesttype
      );
    }
    else {
      this.filteredTechnologyList = this.TechnologyList;
    }

  }

  public getattachments(Technology) {
    debugger;
    this.TechnologyAttachment = Technology;
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    //this.GetTechnologyLanguage(selectedlanguage);
    this.getvendortypelist(selectedlanguage);

  }

  // onfileatchmentSelect(files: File[]) {
  //   this.Uploadattachmentlist.length = 0;
  //   for (let i = 0; i < files.length; i++) {
  //     this.Uploadattachmentlist.push(files[i]);
  //   }
  // }

  public TechAttactments = [];
  onfileatchmentSelect(files: File[]) {
    this.TechAttactments.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.TechAttactments.push(files[i]);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public UpdateAttachments() {
    debugger;
    if (this.TechAttactments.length < 1) {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Please Drop some files',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      this.fmsservice.EquipmentInvoiceUpload(this.TechAttactments).subscribe(res => {
        debugger;
        let UploadedAttachmentList = res;
        for (let i = 0; i < UploadedAttachmentList.length; i++) {
          let Entity = {
            ID: this.TID,
            Attachment: UploadedAttachmentList[i],
            pdf: 'null'
          }
          this.fmsservice.UpdateTechnologyDocument(Entity).subscribe(
            res => {
              let SuccesAttachmentList = res;
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Your Documents has been saved',
                showConfirmButton: false,
                timer: 1500
              })
            }
          )
        }

      })
    }
  }

  updateAttachment() {
    if (this.Uploadattachmentlist.length == 0) {
      Swal.fire("Please drop some files");
    }
    else {
      this.GetTechnologyDocument()
    }
  }


  GetTechnologyDocument() {
    this.fmsservice.GetTechnologyDocument(this.TechnologyAttachment.id).subscribe(res => {
      // let technologyDocumentList=res;
      let attachmentid = res[0].id;
      this.fmsservice.EquipmentInvoiceUpload(this.Uploadattachmentlist).subscribe(res => {
        let attacmentpaths = res;
        //   let ttt = this.TechnologyAttachment;
        for (let i = 0; i < attacmentpaths.length; i++) {
          let entity = {
            ID: attachmentid,
            Attachment: attacmentpaths[i],
            pdf: "null"
          }
          this.fmsservice.updatetechrequestattachment(entity).subscribe(res => {

            let result = res;
            let selectedlanguage = localStorage.getItem('selectedLanguageID');
            this.GetTechnologyRequest(selectedlanguage);
          })
        }
      })

    })
  }

  getvendortypelist(languageid) {
    this.fmsservice.GetVendorType(languageid).subscribe(res => {
      this.vendortypelist = res;
    })
  }

  onselectvendortype(evn) {
    this.fmsservice.GetVendorByTypeID(evn.target.value).subscribe(res => {
      debugger;
      this.vendorlist = res;
    })
  }

  onselectvendor(evn) {
    debugger;
    let ven = this.vendorlist.filter(x => x.id == evn.target.value);
    this.vendorPhonenumber = ven[0].phoneNo;
    this.vendoremail = ven[0].emailID;
    this.vendorid = ven[0].id;
    this.vendorname = ven[0].vendorName;

  }

  entity;
  assignTask() {
    this.entity = {
      "ID": this.TechnologyAttachment.id,
      "AssignedToName": this.vendorname,
      "AssignedTo": this.vendorid,
      "AssignedToPhoneNo": this.vendorPhonenumber,
      "AssignedToEmailID": this.vendoremail,
      "InternalUserID": this.vendorid
    };

    this.fmsservice.UpdateTechnologyRequestAssign(this.entity).subscribe(res => {
      this.Clear();
      Swal.fire("Assinged Successfully");
      this.GetTechnologyRequest(1);
    })
  }

  public Clear() {
    debugger;
    this.vendorPhonenumber = null;
    this.vendoremail = null;
    this.vendorname = null;
    this.SelectedVendorType=0;
    this.SelectedVendor=0;

  }

  deletetechgRequest(techreq) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you want to delete!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.fmsservice.DeleteTechnology(techreq.id).subscribe(res => {
          Swal.fire("Deleted Successfully");
          let selectedlanguage = localStorage.getItem('selectedLanguageID');
          this.GetTechnologyRequest(selectedlanguage);
        })
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'Deleted Successfully',
        //   'error'
        // )
      }
    })
  }


  CanceltechgRequest(techreq) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you want to Cancel!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.fmsservice.CancelTechnology(techreq.id).subscribe(res => {
          Swal.fire("Cancelled Successfully");
          let selectedlanguage = localStorage.getItem('selectedLanguageID');
          this.GetTechnologyRequest(selectedlanguage);
        })
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'Cancelled Successfully',
        //   'error'
        // )
      }
    })
  }

  public UploadPhotos(evn) {
    debugger;
    let PhotoID = evn.target.value;
  }


  TechnologyID;
  public EditTechnology(evn) {
    debugger;
    let TechnologyID = evn.id;
    this.router.navigate(['/UpdateTechnologyRequest', TechnologyID]);
  }

  NoImagesAvail;
  public TechnologyAttachmentList;
  public NewPhotos(evn) {
    debugger;
    this.SelectedTechID = evn.id;
    this.fmsservice.GetTechnologyDocument(evn.id).subscribe(res => {
      debugger;
      this.TechnologyAttachmentList = res;
      if (res.length == 0) {
        this.NoImagesAvail = true;
      }
      else {
        this.NoImagesAvail = false;
      }
    })


  }

  public TID;
  public TechnologyDetails(evn) {
    debugger;
    this.TID = evn.id;
  }

  public confirmButtonText;

  public DeleteAttachments(evn) {
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
          this.DeleteTechnologyDocument(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }

  public DeleteTechnologyDocument(ID) {
    debugger;
    //this.EventPlannerEntity.LanguageID=Number(localStorage.getItem('selectedLanguageID'))
    // let test = this.AssetsEntity;
    this.fmsservice.DeleteTechnologyDocument(ID).subscribe(res => {
      debugger;
      this.GetTechnologyRequest(1);
    })
  }

  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Technology List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Technology List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.filteredTechnologyList);
  }


  public AddAttachments() {
    debugger;
    this.UploadAttachmentsNew(this.SelectedTechID);
  }

  public Photos = [];
  public UploadedPhotos = [];
  onFilesAdded(files: File[]) {
    debugger;
    this.Photos.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.Photos.push(files[i]);
    }
  }


  public UploadAttachmentsNew(TechnologyID) {
    this.fmsservice.TechReqDocUpload(this.Photos).subscribe(res => {
      debugger;
      for (let i = 0; i < res.length; i++) {
        let PhotosEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.UploadedPhotos.push(PhotosEntity);
      }
      this.InsertTechnologyDocument(TechnologyID);
      //Swal.fire('Updated Successfully!');
    })
  }

  public InsertTechnologyDocument(ID) {
    debugger;
    for (let i = 0; i < this.UploadedPhotos.length; i++) {
      let entity = {
        TechnologyID: ID,
        Attachment: this.UploadedPhotos[i].docpathURL1,
        ModifiedBy: 'Admin',
        pdf: 'Null'
      }
      this.fmsservice.InsertTechnologyDocument(entity).subscribe(res => {
        debugger;
        Swal.fire('Document Successfully Saved!');
      })
    }
  }




}
