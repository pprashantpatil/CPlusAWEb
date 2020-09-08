import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-action-items',
  templateUrl: './action-items.component.html',
  styleUrls: ['./action-items.component.css']
})
export class ActionItemsComponent implements OnInit {
  paramID
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  projectlist: any;
  ProjectTeamList: any;
  UserID: any
  BuildingID: any
  ngOnInit() {
    this.UserID = localStorage.getItem('UserID');
    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.Get_ActionItemsByID(this.paramID);
      }
    }
    );
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.id == localStorage.getItem('ProjectID'));
    })
    this.BuildingID = localStorage.getItem('ProjectID');
    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      this.ProjectTeamList = data.filter(x => x.projectID == localStorage.getItem('ProjectID'));
    })
  }

  ProjectWorks
  public Get_ActionItemsByID(ProjectID) {


    this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
      debugger
      let temp: any = data;
      this.ProjectWorks = temp.filter(x => x.id == ProjectID);
      let Project = this.ProjectWorks[0];
      this.fmsservice.GetBuildinglist(1).subscribe(Res => {
        debugger
        this.projectlist = Res;
      })
      this.ProjectId = Project["projectId"];
      this.fmsservice.GetProjectTeam().subscribe(data => {
        debugger
        this.ProjectTeamList = data.filter(x => x.projectID == Project["projectId"]);
      })

      this.ActionItemType = Project["actionItemType"];
      this.DueDate = this.datepipe.transform(Project["dueDate"], 'yyyy-MM-dd');
      this.Subject = Project["subject"];
      this.Description = Project["description"];
      this.Priority = Project["priority"];
      this.AssignedTo = Project["assignedTo"];
      this.Status = Project["status"];
    })

  }


  public GetProjectID(evn) {
    let ProjectID = evn.target.value;
    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      this.ProjectTeamList = data.filter(x => x.projectID == ProjectID);
    })
  }



  public AssetsPhotos = [];
  public UploadedPhotos = [];
  onFilesAddedPhoto(files: File[]) {
    this.AssetsPhotos.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.AssetsPhotos.push(files[i]);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Document Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  public UploadAssetsPhotos(ActionItemID) {
    this.fmsservice.EquipmentPhotoUpload(this.AssetsPhotos).subscribe(res => {
      debugger;

      for (let i = 0; i < res.length; i++) {
        let PhotosEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.UploadedPhotos.push(PhotosEntity);
      }
      this.InsertActionIteamsAttachments(ActionItemID);
      //Swal.fire('Updated Successfully!')
    })
  }

  public InsertActionIteamsAttachments(ActionItemsID) {
    debugger;
    for (let i = 0; i < this.UploadedPhotos.length; i++) {
      let entity = {
        ActionItemsID: ActionItemsID,
        Attachment: this.UploadedPhotos[i].docpathURL1,
        ModifiedBy: 'Admin',

      }
      this.fmsservice.InsertActionIteamsAttachments(entity).subscribe(res => {
        debugger;

      })
    }
  }


  ProjectId: any;
  ActionItemType: any;
  Description: any;
  DueDate: any;
  Subject: any;
  AssignedTo: any;
  Attachments: any;
  Status: any;
  Priority: any;
  public Save() {
    debugger;
    let object = {
      'ProjectId': this.BuildingID,
      'ActionItemType': this.ActionItemType,
      'Description': this.Description,
      'DueDate': this.DueDate,
      'Subject': this.Subject,
      'AssignedTo': this.AssignedTo,
      // 'Attachments': this.Attachments,
      'Status': this.Status,
      'Priority': this.Priority
    }

    this.fmsservice.Insert_ActionItems(object).subscribe(res => {
      debugger;
      this.UploadAssetsPhotos(res);
      this.InsertNotification();
      Swal.fire('Action Items Saved Successfully!');
      location.href = "#/ActionItemsDashboard";
    })
  }





  InsertNotification() {
    debugger

    var Filter = {
      'Date': new Date(),
      'Event': 'Action Item',
      'FromUser': 'Company',
      'ToUser': this.AssignedTo,
      'Message': ' Stage Action Item ' + this.Subject + ' has been assigned to the Staff',
      'Photo': 'photo',
      'Building': this.BuildingID,
      'NotificationTypeID': 14,
      'VendorID': 1
    }
    this.fmsservice.InsertNotification(Filter).subscribe(data => {
      debugger

    })
  }






  public Update() {
    debugger;
    let object = {
      'ID': this.paramID,
      'ProjectId': this.BuildingID,
      'ActionItemType': this.ActionItemType,
      'Description': this.Description,
      'DueDate': this.DueDate,
      'Subject': this.Subject,
      'AssignedTo': this.AssignedTo,
      'Status': this.Status,
      'Priority': this.Priority
    }

    this.fmsservice.Update_ActionItems(object).subscribe(res => {
      debugger;
      Swal.fire('Action Items Updated Successfully!');
      location.href = "#/ActionItemsDashboard";
    })
  }





}
