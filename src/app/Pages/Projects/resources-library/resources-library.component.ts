import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resources-library',
  templateUrl: './resources-library.component.html',
  styleUrls: ['./resources-library.component.css']
})
export class ResourcesLibraryComponent implements OnInit {

  constructor(private route: ActivatedRoute, public fmsService: FmsService) { }
  branch;
  branch_class;
  esistingfolders = [];
  esistingfiles = [];
  currentfolder;
  isnewfloder = false;
  isfirstcall = true;
  ifafternewcreate = false;
  IsmoreFolders = false;
  breadchrumb = [];
  currentpath = "";
  abSearch: any;

  SubjectList: any;
  ClassMasterlist: any;
  Topic: any;
  resourceID: any;

  FileName: any;
  FileType: any;
  base64textString: any;

  public filenamedetails = [];
  public filetypedetails = [];
  public base64textStringdetails = [];


  FileName2: any;
  FileType2: any;
  base64textString2: any;

  public filenamedetails2 = [];
  public filetypedetails2 = [];
  public base64textStringdetails2 = [];
  VideoURL: any;
  BranchList: any[];
  BranchID: number;
  paramID: any;
  URL: any;
  PDFDocument: any;
  SubjectList1: any;
  ClassID: number;
  SubjectID: number;
  topicURL: any;
  ngOnInit() {
    debugger;
    this.route.params.subscribe(params => {
      this.branch = params["Project"];
      this.branch_class = params["Folder"];
      let getpath = this.branch + "/" + this.branch_class;
      this.currentpath = getpath;
      this.currentfolder = this.branch_class;
      this.getchapterfolder(this.currentpath);
      this.getchapterfiles(this.currentpath);
    });
  }

  createfolder(path) {

    var emptyfile = File;
    this.isfirstcall = false;
    this.ifafternewcreate = true;
    this.currentpath = path;
    this.fmsService.ResoucesFlodersUpload(emptyfile, path).subscribe(res => {
      this.getchapterfolder(this.currentpath);
      this.getchapterfiles(this.currentpath);
    });
  }


  getchapterfolder(path) {
    this.fmsService.getchapterfolder(path).subscribe(res => {

      this.esistingfolders.length = 0;
      if (res.length > 0) {

        for (let i = 0; i < res.length; i++) {
          let r = res[i].split("\\");
          this.esistingfolders.push(r[r.length - 1]);
        }


        // this.currentfolder = this.esistingfolders[0];
        //    if (this.ifafternewcreate == true) {
        //   this.IsmoreFolders = true;
        //   this.currentfolder = this.breadchrumb[this.breadchrumb.length - 1];
        //   this.ifafternewcreate = false;
        // }
        // else {
        //  // this.currentfolder = this.esistingfolders[0];
        // }

      }
      this.breadchrumb = this.currentpath.split("/");
    });
  }

  getchapterfiles(path) {

    this.fmsService.getchapterfiles(path).subscribe(res => {

      this.esistingfiles.length = 0;
      if (res.length > 0) {

        for (let i = 0; i < res.length; i++) {
          let r = res[i].split("\\");
          this.esistingfiles.push(r[r.length - 1]);
        }

      }

    });
  }

  buildandcreate() {

    //let path = this.branch + "/" + this.branch_class;
    // if (this.esistingfolders.length > 0) {
    //   let foldername = document.getElementById('txtfoldername')["value"];
    //   this.createfolder( path+"/"+this.currentfolder  + "/" + foldername);
    // }
    // else {
    //   let foldername = document.getElementById('txtfoldername')["value"];
    //   this.createfolder(path + "/" + foldername);
    // }

    let foldername = document.getElementById('txtfoldername')["value"];
    this.createfolder(this.currentpath + "/" + foldername);
    document.getElementById('txtfoldername')["value"] = "";
    this.currentfolder = foldername;

  }
  showcreatefolder() {
    if (this.isnewfloder == true) {
      this.isnewfloder = false;
      this.isNewFilesUploads = false;
      this.isNewVideosUploads = false;
    }
    else {
      this.isnewfloder = true;
      this.isNewFilesUploads = false;
      this.isNewVideosUploads = false;
    }

  }

  isNewFilesUploads = false;
  isNewVideosUploads = false;
  showUploadFiles() {
    if (this.isNewFilesUploads == true) {
      this.isNewFilesUploads = false;
      this.isNewVideosUploads = false;
      this.isnewfloder = false;
    }
    else {
      this.isNewFilesUploads = true;
      this.isNewVideosUploads = true;
      this.isnewfloder = false;
    }

  }

  gotofolder(folder) {
    this.currentpath = this.currentpath + "/" + folder;
    this.getchapterfolder(this.currentpath);
    this.getchapterfiles(this.currentpath);
    this.currentfolder = folder;
  }
  gotospecificditectory(folder) {
    debugger
    if (folder != this.branch) {
      let folderindex = folder.split('');
      this.currentpath = this.currentpath.substring(0, this.currentpath.indexOf(folder) + folderindex.length);
      this.getchapterfolder(this.currentpath);
      this.getchapterfiles(this.currentpath);
      this.currentfolder = folder;
    }
  }


  ///////////////Start PDf///////////////////////

  handleFileSelect2(evt) {

    for (var i = 0; i < evt.target.files.length; i++) {

      //console.log(evt);
      var File2 = evt.target.files[i];

      // console.log(File);
      //let subStringData=File.substr(12,27);
      //console.log(X);
      var FileName2 = File2.name.split('.')[0];
      var FileType2 = File2.name.split('.')[1];


      console.log(FileName2);
      console.log(FileType2);
      this.FileName2 = FileName2;
      this.FileType2 = FileType2;
      //this.filenamedetails.push({fname:this.FileName,ffile:this.FileType,base:this.base64textString});
      //this.filetypedetails.push(this.FileType);

      var files = evt.target.files;
      var file = files[i];
      if (files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded2.bind(this);
        reader.readAsBinaryString(file);


      }

      this.filenamedetails2.push({ fname: this.FileName2, ffile: this.FileType2, base: this.base64textStringdetails2 });

    }


  }
  _handleReaderLoaded2(readerEvt) {
    var binaryString2 = readerEvt.target.result;
    this.base64textString2 = btoa(binaryString2);
    this.base64textStringdetails2.push(this.base64textString2)
    console.log(this.base64textString2);

  }


  public buildandcreatePDF() {
    for (let j = 0; j < this.filenamedetails2.length; j++) {

      var filter = {
        // 'ResourceID': this.resourceID,
        "FileType": this.filenamedetails2[j].ffile,
        "FileName": this.filenamedetails2[j].fname,
        "modifieddate": new Date(),
        "Base64Data": this.filenamedetails2[j].base[j],
        "PDFURL": this.currentpath
      }

      this.fmsService.InsertResourcePDF(filter).subscribe(data => {

        if (data != undefined) {
          Swal.fire("PDF Uploaded Successfully");
          //this.getchapterfolder(this.currentpath);
          this.getchapterfiles(this.currentpath);
        }
      })

    }
  }




  ///////////////end PDf///////////////////////







  ///////////////Start Videos///////////////////////

  handleFileSelect1(evt) {

    for (var i = 0; i < evt.target.files.length; i++) {

      //console.log(evt);
      var File = evt.target.files[i];

      // console.log(File);
      //let subStringData=File.substr(12,27);
      //console.log(X);
      var FileName = File.name.split('.')[0];
      var FileType = File.name.split('.')[1];


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

    }


  }
  _handleReaderLoaded1(readerEvt) {


    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.base64textStringdetails.push(this.base64textString)
    console.log(this.base64textString);


  }


  public buildandcreateVideos() {

    for (let j = 0; j < this.filenamedetails.length; j++) {

      var filter = {
        // 'ResourceID': this.resourceID,
        FileType: this.filenamedetails[j].ffile,
        FileName: this.filenamedetails[j].fname,
        modifieddate: new Date(),
        Base64Data: this.filenamedetails[j].base[j],
        VideoURL: this.currentpath,
      }

      this.fmsService.InsertResourceVideos(filter).subscribe(data => {

        if (data != undefined) {
          this.getchapterfiles(this.currentpath);
          Swal.fire("Videos Uploaded Successfully");

        }
      })

    }
  }

  deletefolder(foldrpath) {
    debugger;
    let todeletefolderpath = this.currentpath + "/" + foldrpath;
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
          // this.fmsService.deleteResoucesFloder(todeletefolderpath).subscribe(data => {
          //   debugger;
          //   if (data != undefined) {
          //     this.getchapterfolder(this.currentpath);
          //     // this.getchapterfiles(this.currentpath);
          //     Swal.fire("Folder delete Successfully");
          //   }
          // })
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )

      }
    })

  }


  confirmButtonText: any
  deletefile(filepath) {
    debugger;
    let todeletefilepath = this.currentpath + "/" + filepath;
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
          // this.fmsService.deleteResoucesFile(todeletefilepath).subscribe(data => {
          //   debugger;
          //   if (data != undefined) {
          //     //this.getchapterfolder(this.currentpath);
          //     this.getchapterfiles(this.currentpath);
          //     Swal.fire("File delete Successfully");
          //   }
          // })
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )

      }
    })

  }

  ///////////////end Videos///////////////////////
}
