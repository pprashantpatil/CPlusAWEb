import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-award-prject-bid',
  templateUrl: './award-prject-bid.component.html',
  styleUrls: ['./award-prject-bid.component.css']
})
export class AwardPrjectBidComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }
  public pageMenuTitle;
  public awardProjectBid_PageTitle;
  public awardProjectBid_breadchrumb;
  public awardProjectBid_Request;
  public awardProjectBid_Request_Type;
  public awardProjectBid_Building;
  public awardProjectBid_RaisedBy;
  public awardProjectBid_ProjectBidDate;
  public awardProjectBid_Project_Start_Date;
  public awardProjectBid_Status;
  public awardProjectBid_NoOfBidsSubmitted;
  public awardProjectBid_BidAwarded_To;
  public awardProjectBid_Action;
  public AwardsList: any;
  public filteredAwardsList;
  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public searchaward;
  public buildingList;
  public requestTypeList;
  public awardbidAttachmentList = [];

  public currentawardbidlist;
  public vendorId;
  awardbidAttachment;
  awardbidComments = "";
  vendordate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  VendorList;
  vendorPhone;
  vendorEmail;
  awardbidList;


  ProjectRequest;


  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    let RaisedBy = localStorage.getItem("UserID");
    this.GetAwardProjectBidLanguageByLanguageID(selectedlanguage);
    this.GetAssignedToTaskProjectRequest(RaisedBy, selectedlanguage);
    this.getbuildingList(selectedlanguage);
    this.getRequesttype(selectedlanguage);
  }

  public GetAwardProjectBidLanguageByLanguageID(languageid) {
    this.fmsservice.GetAwardProjectBidLanguageByLanguageID(languageid).subscribe(
      res => {

        this.pageMenuTitle = res[0].pageMenuTitle;
        this.awardProjectBid_PageTitle = res[0].awardProjectBid_PageTitle;
        this.awardProjectBid_breadchrumb = res[0].awardProjectBid_breadchrumb;
        this.awardProjectBid_Request = res[0].awardProjectBid_Request;
        this.awardProjectBid_Request_Type = res[0].awardProjectBid_Request_Type;
        this.awardProjectBid_Building = res[0].awardProjectBid_Building;
        this.awardProjectBid_RaisedBy = res[0].awardProjectBid_RaisedBy;
        this.awardProjectBid_ProjectBidDate = res[0].awardProjectBid_ProjectBidDate;
        this.awardProjectBid_Project_Start_Date = res[0].awardProjectBid_Project_Start_Date;
        this.awardProjectBid_Status = res[0].awardProjectBid_Status;
        this.awardProjectBid_NoOfBidsSubmitted = res[0].awardProjectBid_NoOfBidsSubmitted;
        this.awardProjectBid_BidAwarded_To = res[0].awardProjectBid_BidAwarded_To;
        this.awardProjectBid_Action = res[0].awardProjectBid_Action;
      }
    )
  }

  public GetAssignedToTaskProjectRequest(languageid, RaisedBy) {
    this.fmsservice.GetAssignedToTaskProjectRequest(languageid, RaisedBy).subscribe(
      res => {
        debugger;
        this.AwardsList = res;
        this.filteredAwardsList = this.AwardsList;
      }
    )
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
  buildingID
  public onselectbuilding(evn) {
    this.buildingID = evn.target.value;
    if (this.buildingID != "none") {
      this.filteredAwardsList = this.AwardsList.filter(x => x.buildingID == this.buildingID);
    }
    else {
      this.filteredAwardsList = this.AwardsList;
    }

  }
  public getRequesttype(languageid) {
    this.fmsservice.GetProjectRequestType(languageid).subscribe(res => {

      this.requestTypeList = res;

    })
  }
  public onchangeProjectrequesttype(evn) {
    let requesttypeid = evn.target.value;
    if (requesttypeid != "none") {
      this.filteredAwardsList = this.AwardsList.filter(x => x.projectRequestTypeID == requesttypeid && x.buildingID == this.buildingID);
    }

    else {
      this.filteredAwardsList = this.AwardsList;
    }
  }

  public uploadvendorProjectbidattachment() {
    debugger;
    this.fmsservice.uploadvendorProjectbidattachment(this.awardbidAttachmentList).subscribe(res => {
      debugger;
      let awardattament = res;
      this.Insertvendorbidproject(awardattament);
    })
  }

  onFilesAddedAttached(files: File[]) {

    this.awardbidAttachmentList.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.awardbidAttachmentList.push(files[i]);
    }
  }
  getawardbiddetails(Awardbid) {
    debugger;
    this.currentawardbidlist = Awardbid;
    this.ProjectRequest = this.currentawardbidlist.request;
    let AssignedTo = this.currentawardbidlist.assignedTo.split(',');
    let AssignedName = this.currentawardbidlist.assignedToName.split(',');
    let AssignedVendorList = [];

    for (let i = 0; i < AssignedTo.length; i++) {
      let abc = {
        id: AssignedTo[i],
        name: AssignedName[i],

      }
      AssignedVendorList.push(abc);

    }
    this.VendorList = AssignedVendorList;
    this.vendorId = this.VendorList[0].id;
    this.GetVendorByID(this.vendorId);

    //this.Getonlyprojectvendorlist(this.currentawardbidlist.id);

  }

  Insertvendorbidproject(awardattament) {
    debugger;
    let entity = {
      "ProjectID": this.currentawardbidlist.id,
      "VendorID": this.vendorId,
      "Attachment": awardattament,
      "comment": this.awardbidComments,
      "Date": this.vendordate,
      "StatusID": 8
    }
    this.fmsservice.Insertvendorbidproject(entity).subscribe(res => {
      debugger;
      Swal.fire('Project Request has been sent!');
      this.Clear();

    })
  }


  public Clear() {
    this.currentawardbidlist.id = 0;
    this.vendorId = 0;
    this.awardbidComments = "";
    this.vendordate = "";
  }


  Getonlyprojectvendorlist(projectId) {
    this.fmsservice.Getonlyprojectvendorlist(projectId).subscribe(res => {
      this.VendorList = res;
    });
  }

  GetVendorByID(evn) {
    let vendorid;
    if (evn.target) {
      vendorid = evn.target.value;
    } else {
      vendorid = evn;
    }


    this.fmsservice.GetVendorByID(vendorid).subscribe(res => {
      debugger;
      this.vendorPhone = res[0].phoneNo;
      this.vendorEmail = res[0].emailID;
    })

  }
  awardbidList1
  isdisableall = false;
  Label: any;
  getawardbidlist(award) {
    debugger;
    this.fmsservice.Getvendorbidproject(award.id).subscribe(res => {
      debugger;
      for (let i = 0; i < res.length; i++) {
        if (res[i].statusID == 9) {
          this.Label = "Award Bid";
        }
        else if (res[i].statusID == 11) {
          this.Label = "Bid Awarded";
        }
      }
      this.isdisableall = false;
      this.awardbidList = res.filter(x => x.statusID == 9 || x.statusID == 11);
      this.awardbidList1 = res.filter(x => x.statusID == 11);

      if (this.awardbidList1.length > 0) {
        this.isdisableall = true;
      }
    })
  }

  closeProjectRequest(Awards) {
    this.fmsservice.closeproject(Awards.projectID, Awards.vendorID).subscribe(res => {
      Swal.fire('Bid Closed');
    })
  }

}
