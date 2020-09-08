import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { DatePipe } from '../../../../../node_modules/@angular/common';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css']
})
export class MyLibraryComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  branch: any;
  branch_class: any;
  confirmButtonText: string;
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

  dropdownEnabled = true;

  values: number[];

  directorydivs = [];
  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];
  buttonClass = this.buttonClasses[0];
  ngOnInit() {
    this.route.params.subscribe(params => {
      debugger;
      this.branch = params["Project"];
      this.branch_class = params["Folder"];
    }
    );


    let getpath = this.branch + "/" + this.branch_class;
    this.currentpath = getpath;
    this.currentfolder = this.branch_class;
    this.getchapterfolder(this.currentpath);
    this.getchapterfiles(this.currentpath);

    //this.getBooks();
  }

  createfolder(path) {

    var emptyfile = File;
    this.isfirstcall = false;
    this.ifafternewcreate = true;
    this.currentpath = path;
    this.fmsservice.ResoucesFlodersUpload(emptyfile, path).subscribe(res => {


      this.getchapterfolder(this.currentpath);
      this.getchapterfiles(this.currentpath);
    });
  }
  getchapterfolder(path) {
    debugger;
    this.fmsservice.getchapterfolder(path).subscribe(res => {
      this.esistingfolders.length = 0;
      if (res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          let r = res[i].split("\\");
          this.esistingfolders.push(r[r.length - 1]);
        }
      }
      this.breadchrumb = this.currentpath.split("/");
    });
  }


  getchapterfiles(path) {

    this.fmsservice.getchapterfiles(path).subscribe(res => {
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

    if (folder != this.branch) {
      let folderindex = folder.split('');
      this.currentpath = this.currentpath.substring(0, this.currentpath.indexOf(folder) + folderindex.length);
      this.getchapterfolder(this.currentpath);
      this.getchapterfiles(this.currentpath);
      this.currentfolder = folder;
    }
  }

  getfolders(path) {


    let l = path.split('/');
    let selectedfolder = l[l.length - 1];
    let level = (l.length - 1);


    let index = this.FindlevelandRemove(level);
    let folders = []
    this.fmsservice.getchapterfolder(path).subscribe(res_folder => {
      if (res_folder.length > 0) {
        for (let i = 0; i < res_folder.length; i++) {
          let r = res_folder[i].split("\\");
          folders.push({ folder: r[r.length - 1], path: path + '/' + r[r.length - 1] })
        }

      }


      this.fmsservice.getchapterfiles(path).subscribe(res_files => {

        let files = [];
        if (res_files.length > 0) {

          for (let i = 0; i < res_files.length; i++) {
            let r = res_files[i].split("\\");
            files.push({ file: r[r.length - 1], path: path + '/' + r[r.length - 1] });
          }


        }

        debugger;
        let f = {
          level: level,
          selectedfolder: selectedfolder,
          folders: folders,
          files: files
        }

        if (index == undefined || index == -1) {

          this.directorydivs.push(f);
        }
        else {
          this.directorydivs[index] = f;
        }



        //if (folders.length != 0 && files.length != 0) {

        //}


      });

    });

  }
  public FindlevelandRemove(level): any {
    debugger;
    let index;
    let isexistinlevel = this.directorydivs.filter(x => x.level == level);
    if (isexistinlevel.length > 0) {
      index = this.directorydivs.findIndex(x => x.level == level);
      if (index > -1) {
        this.directorydivs.splice(index + 1, this.directorydivs.length - (index + 1));
      }

    }
    return index;

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

      this.fmsservice.InsertResourcePDF(filter).subscribe(data => {

        if (data != undefined) {
          // Swal.fire("PDF Uploaded Successfully");
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





  ///////////////end Videos///////////////////////





  selectedChange(evn) {

  }

}
