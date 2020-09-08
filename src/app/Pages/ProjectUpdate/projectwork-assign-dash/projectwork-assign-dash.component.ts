import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
@Component({
  selector: 'app-projectwork-assign-dash',
  templateUrl: './projectwork-assign-dash.component.html',
  styleUrls: ['./projectwork-assign-dash.component.css']
})
export class ProjectworkAssignDashComponent implements OnInit {

  constructor(public fmsservice: FmsService,) { }
  pickeroptions
  ProjectID
  LoginTypeID
  value: any;
  StageList: any;
  StaffTypelist: any;
  StaffName: any;
  ngOnInit() {
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.StageID = 0;
    this.StaffTypeID = 0;
    this.StaffName = 0;
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.GetProjectWorkAssign();

    this.fmsservice.GetArchitecturalStages().subscribe(data => {
      debugger
      this.StageList = data;
    })

    this.fmsservice.GetStaffType(1).subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffTypelist = temp.filter(x => x.id > 11);
      }
    )
  }
  projectlist;
  Count: any;

  public GetProjectWorkAssign() {
    debugger
    if (this.LoginTypeID == 1) {
      this.fmsservice.GetProjectWorkAssign('2020/01/01', '2022/01/01').subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == this.ProjectID && x.staffID == localStorage.getItem('UserID'));
        this.Count = this.projectlist.length;
      })
    }
    else {
      this.fmsservice.GetProjectWorkAssign('2020/01/01', '2022/01/01').subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
        this.Count = this.projectlist.length;
      })
    }

  }

  public DeleteProject(id) {
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
        this.fmsservice.DeleteProjectWorkAssign(id).subscribe(res => {
          let test = res;
          this.GetProjectWorkAssign()
        })
        Swal.fire(
          'Deleted!',
          'Project Work Assign has been deleted.',
          'success'
        )
      }
      else {
        this.GetProjectWorkAssign()
      }
    })
  }
  StageID
  StaffTypeID
  StaffID
  Description
  public GetProjectWork(project) {
    debugger
    this.ProjectID = project.projectID;
    this.StageID = project.stageID;
    this.StaffTypeID = project.staffTypeID;
    this.StaffID = project.staffID;

  }
  FileName: any;
  FileType: any;
  base64textString: any;
  public filenamedetails1 = [];
  public base64textStringdetails1 = [];
  FileName1: any;
  FileType1: any;
  base64textString1: any;
  public filenamedetails = [];
  public base64textStringdetails = [];
  handleFileSelect1(evt) {
    debugger
    for (var i = 0; i < evt.target.files.length; i++) {
      debugger

      var File = evt.target.files[i];
      debugger

      var FileName = File.name.split('.')[0];
      var FileType = File.name.split('.')[1];

      debugger
      console.log(FileName);
      console.log(FileType);
      this.FileName1 = FileName;
      this.FileType1 = FileType;


      var files = evt.target.files;
      var file = files[i];
      if (files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded1.bind(this);
        reader.readAsBinaryString(file);


      }

      this.filenamedetails.push({ fname: this.FileName1, ffile: this.FileType1, base: this.base64textStringdetails1 });
      debugger

      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Photos Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })

    }

  }
  _handleReaderLoaded1(readerEvt) {

    debugger
    var binaryString = readerEvt.target.result;
    this.base64textString1 = btoa(binaryString);
    this.base64textStringdetails1.push(this.base64textString1)
    console.log(this.base64textString1);
    debugger

  }

  handleFileSelect(evt) {
    debugger
    for (var i = 0; i < evt.target.files.length; i++) {
      debugger

      var File = evt.target.files[i];
      debugger

      var FileName = File.name.split('.')[0];
      var FileType = File.name.split('.')[1];

      debugger
      console.log(FileName);
      console.log(FileType);
      this.FileName = FileName;
      this.FileType = FileType;


      var files = evt.target.files;
      var file = files[i];
      if (files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded2.bind(this);
        reader.readAsBinaryString(file);


      }

      this.filenamedetails1.push({ fname: this.FileName, ffile: this.FileType, base: this.base64textStringdetails });
      debugger

      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Videos Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })

    }

  }
  _handleReaderLoaded2(readerEvt) {

    debugger
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.base64textStringdetails.push(this.base64textString)
    console.log(this.base64textString);
    debugger

  }

  public SaveProjectUpdate() {
    debugger
    var obj1 = {
      "ProjectID": this.ProjectID,
      "StageID": this.StageID,
      "StaffTypeID": this.StaffTypeID,
      "StaffID": this.StaffID,
      "Notes": this.Description,
    }
    this.fmsservice.InsertProjectUpdateMenu(obj1).subscribe(res => {
      if (res != null && res != undefined) {
        debugger;
        this.InsertDailyUpdateMenuPhotos(res);
        this.InsertDailyUpdateMenuVideos(res);
        this.Description = '';
        Swal.fire("Project Update Saved  Successfully");
        //location.href = "#/DailyUpdateMenuDash";
      }
    })



  }

  public InsertDailyUpdateMenuPhotos(id) {
    debugger
    for (let j = 0; j < this.filenamedetails.length; j++) {
      var obj = {
        "ProjectUpdateMenuID": id,
        "FileType": this.filenamedetails[j].ffile,
        "FileName": this.filenamedetails[j].fname,
        "modifieddate": new Date(),
        "Base64Data": this.filenamedetails[j].base[j]

      }
      debugger;
      this.fmsservice.InsertProjectUpdateMenuPhotos(obj).subscribe((data) => {
        if (data != null && data != undefined) {
          debugger;
          //Swal.fire('Uploaded Photos Successfully');
        }
      })


    }
  }
  public InsertDailyUpdateMenuVideos(id) {
    debugger
    for (let j = 0; j < this.filenamedetails1.length; j++) {
      var obj = {
        "ProjectUpdateMenuID": id,
        "FileType1": this.filenamedetails1[j].ffile,
        "FileName1": this.filenamedetails1[j].fname,
        "modifieddate1": new Date(),
        "Base64Data1": this.filenamedetails1[j].base[j]
      }
      debugger;
      this.fmsservice.InsertProjectUpdateMenuVideos(obj).subscribe((data) => {
        if (data != null && data != undefined) {
          debugger;
          // Swal.fire('Videos Saved Successfully');
        }
      })
    }
  }



  public GetStages(evn) {
    debugger;
    this.StageID = evn.target.value;

    if (evn.target.value == '0') {
      if (this.LoginTypeID == 1) {
        this.fmsservice.GetProjectWorkAssign('2020/01/01', '2022/01/01').subscribe(data => {
          debugger
          let temp: any = data;
          this.projectlist = temp.filter(x => x.projectID == this.ProjectID && x.staffID == localStorage.getItem('UserID'));
          this.Count = this.projectlist.length;
        })
      }
      else {
        this.fmsservice.GetProjectWorkAssign('2020/01/01', '2022/01/01').subscribe(data => {
          debugger
          let temp: any = data;
          this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
          this.Count = this.projectlist.length;
        })
      }
    } else {

      if (this.LoginTypeID == 1) {
        this.fmsservice.GetProjectWorkAssign('2020/01/01', '2022/01/01').subscribe(data => {
          debugger
          let temp: any = data;
          this.projectlist = temp.filter(x => x.projectID == this.ProjectID && x.staffID == localStorage.getItem('UserID') && x.stageID == evn.target.value);
          this.Count = this.projectlist.length;
        })
      }
      else {
        this.fmsservice.GetProjectWorkAssign('2020/01/01', '2022/01/01').subscribe(data => {
          debugger
          let temp: any = data;
          this.projectlist = temp.filter(x => x.projectID == this.ProjectID && x.stageID == evn.target.value);
          this.Count = this.projectlist.length;
        })
      }
    }
  }



  StaffList: any;
  public getStaffTypeID(event) {
    debugger
    this.StaffTypeID = event.target.value;
    this.fmsservice.GetStaff(1).subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffList = temp.filter(x => x.staffTypeID == this.StaffTypeID);
      }
    )
  }


  public GetStaff(event) {
    this.StaffID = event.target.value;

    if (event.target.value == '0') {
      if (this.LoginTypeID == 1) {
        this.fmsservice.GetProjectWorkAssign('2020/01/01', '2022/01/01').subscribe(data => {
          debugger
          let temp: any = data;
          this.projectlist = temp.filter(x => x.projectID == this.ProjectID && x.staffID == localStorage.getItem('UserID'));
          this.Count = this.projectlist.length;
        })
      }
      else {
        this.fmsservice.GetProjectWorkAssign('2020/01/01', '2022/01/01').subscribe(data => {
          debugger
          let temp: any = data;
          this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
          this.Count = this.projectlist.length;
        })
      }
    } else {

      if (this.LoginTypeID == 1) {
        this.fmsservice.GetProjectWorkAssign('2020/01/01', '2022/01/01').subscribe(data => {
          debugger
          let temp: any = data;
          this.projectlist = temp.filter(x => x.projectID == this.ProjectID && x.staffID == localStorage.getItem('UserID') && x.staffName == event.target.value);
          this.Count = this.projectlist.length;
        })
      }
      else {
        this.fmsservice.GetProjectWorkAssign('2020/01/01', '2022/01/01').subscribe(data => {
          debugger
          let temp: any = data;
          this.projectlist = temp.filter(x => x.projectID == this.ProjectID && x.staffName == event.target.value);
          this.Count = this.projectlist.length;
        })
      }
    }
  }
  datelist;
  startdate: Date;
  enddate: Date;
  public selectedDate(value) {
    debugger
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];
    debugger
    //Date date= new Date('dd-MM-yyyy');
    if (this.LoginTypeID == 1) {
      this.fmsservice.GetProjectWorkAssign(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == this.ProjectID && x.staffID == localStorage.getItem('UserID'));
        this.Count = this.projectlist.length;
      })
    }
    else {
      this.fmsservice.GetProjectWorkAssign(this.startdate, this.enddate).subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
        this.Count = this.projectlist.length;
      })
    }
  }
}
