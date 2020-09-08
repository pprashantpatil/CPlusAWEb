import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
import { Router } from '../../../../../node_modules/@angular/router';
@Component({
  selector: 'app-projectfiledash',
  templateUrl: './projectfiledash.component.html',
  styleUrls: ['./projectfiledash.component.css']
})
export class ProjectfiledashComponent implements OnInit {
  Search: any;
  Resources: any;
  confirmButtonText: string;
  BranchList: any[];
  ClassMasterlist: any;
  abSearch: any;
  SubjectFilterID: any;
  FolderName: string;
  branch: any;
  branch_class: any;
  currentpath: any;
  currentfolder: any;
  directorydivs = [];
  esistingfiles = [];
  LoginTypeID: any;
  constructor(public fmsService: FmsService, public router: Router) { }
  projectlist1;
  ngOnInit() {
    this.Physics = true;

    this.LoginTypeID = localStorage.getItem("LoginTypeID");
    this.branch = 'NIIT - Koramangala';
    this.branch_class = 'PUC 1 Science';
    let getpath = this.branch + "/" + this.branch_class;
    this.currentpath = getpath;
    this.currentfolder = this.branch_class;
    this.getchapterfolder(this.currentpath);
    this.getchapterfiles(this.currentpath);
    this.fmsService.GetBuildinglist(1).subscribe(
      res => {
        debugger;
        this.BranchList = res;
      }
    )


  }
  Resources1 = []
  getURl(evn) {
    let id = evn.id;
    // this.fmsService.GetResources().subscribe(
    //   res => {
    //     debugger;
    //     let temp: any = res
    //     let temp1: any = temp.filter(x => x.id == id);
    //     this.Resources1 = []
    //     var path = temp1[0].videoURL;
    //     var path2 = path.replace(/\\/g, "/");
    //     this.Resources1.push(path2);
    //   }
    // )
  }
  // public GetResources() {
  //   this.fmsService.GetResources().subscribe(
  //     res => {
  //       debugger;
  //       this.Resources = res;
  //     }
  //   )
  // }
  // BranchFilterID
  // BranchFilter(evn) {
  //   this.BranchFilterID = evn.target.value;
  //   this.ClassFilterID = 0;
  //   this.SubjectFilterID = 0;
  //   this.SubjectList = [];
  //   this.GetResourcesByBranch();
  // }
  // GetResourcesByBranch() {
  //   if (this.BranchFilterID == 0) {
  //     this.GetResources();
  //   }
  //   else {
  //     this.fmsService.GetResources().subscribe(
  //       res => {
  //         debugger;
  //         let temp: any = res
  //         this.Resources = temp.filter(x => x.branchID == this.BranchFilterID);
  //       }
  //     )
  //   }
  // }
  // ClassFilterID
  // SubjectList1
  // SubjectList: any
  // ClassFilter(evn) {
  //   this.ClassFilterID = evn.target.value;
  //   this.SubjectFilterID = 0;
  //   this.GetResourcesByClass();
  // }
  // SubjectFilter(evn) {
  //   this.SubjectFilterID = evn.target.value;
  //   this.GetResourcesBySubject();
  // }

  // GetResourcesBySubject() {
  //   if (this.SubjectFilterID == 0) {
  //     this.fmsService.GetResources().subscribe(
  //       res => {
  //         debugger;
  //         let temp: any = res
  //         this.Resources = temp.filter(x => x.classID == this.ClassFilterID && x.branchID == this.BranchFilterID);
  //       }
  //     )
  //   }
  //   else {
  //     this.fmsService.GetResources().subscribe(
  //       res => {
  //         debugger;
  //         let temp: any = res
  //         this.Resources = temp.filter(x => x.classID == this.ClassFilterID && x.branchID == this.BranchFilterID && x.subjectID == this.SubjectFilterID);
  //       }
  //     )
  //   }
  // }

  // GetResourcesByClass() {
  //   if (this.ClassFilterID == 0) {
  //     this.GetResourcesByBranch();
  //   }
  //   else {
  //     this.fmsService.GetResources().subscribe(
  //       res => {
  //         debugger;
  //         let temp: any = res
  //         this.Resources = temp.filter(x => x.classID == this.ClassFilterID && x.branchID == this.BranchFilterID);
  //       }
  //     )
  //   }
  //   this.fmsService.GetSubjectMaster().subscribe(data => {
  //     debugger
  //     this.SubjectList1 = data;
  //     var filter = this.SubjectList1.filter(x => x.classID == this.ClassFilterID && x.branchID == this.BranchFilterID);
  //     debugger
  //     this.SubjectList = filter;
  //   })
  // }

  // public DeleteResource(evn) {
  //   debugger;
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.value) {
  //       if (this.confirmButtonText = "Yes, delete it!") {
  //         this.DeleteResource1(evn.id);
  //       }
  //       Swal.fire(
  //         'Deleted!',
  //         'Resource has been deleted.',
  //         'success'
  //       )
  //     }
  //   })
  // }
  // public DeleteResource1(ID) {
  //   debugger;
  //   this.fmsService.DeleteResources(ID).subscribe(res => {
  //     debugger;
  //     this.GetResources();
  //   })
  // }



  BranchName;
  ClassName;
  Subjectname
  esistingfolders = [];
  //Resouces Upload 
  public UploadResources(evn) {


    this.BranchName = evn.branch;
    this.ClassName = evn.className;
    //this.Subjectname = evn.subjectName;
    //this.getchapterfolder();
  }


  createfolder() {
    //var files: File[];
    var emptyfile = File;
    var path = this.BranchName + "/" + this.ClassName + "/" + this.FolderName;
    this.fmsService.ResoucesFlodersUpload(emptyfile, path).subscribe(res => {
      debugger;
      this.FolderName = "";
    });
  }


  FolderForExistingFolder
  public UploadFolderForExistingFloder(evn) {
    this.FolderForExistingFolder = this.BranchName + "/" + this.ClassName + "/" + evn;

  }


  public createfolderforexisting() {
    var emptyfile = File;
    var path = this.FolderForExistingFolder;
    this.fmsService.ResoucesFlodersUpload(emptyfile, path).subscribe(res => {
      debugger;
      this.FolderName = "";
    });
  }



  ///////////////////////////////////////////////////////////////////////////////////


  public UploadResourcesnextpage(evn) {
    this.BranchName = evn.branch;
    this.ClassName = evn.className;
    this.router.navigate(['/ResourcesLibrary', this.BranchName, this.ClassName]);


  }


  //My Library items

  getchapterfolder(path) {
    debugger;
    this.fmsService.getchapterfolder(path).subscribe(res => {
      this.esistingfolders.length = 0;
      if (res.length > 0) {
        for (let i = 0; i < res.length; i++) {
          let r = res[i].split("\\");
          this.esistingfolders.push(r[r.length - 1]);
        }
      }
      //this.breadchrumb = this.currentpath.split("/");
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

  Physics: boolean;
  Chemistry: boolean;
  StatesOfMatter: boolean;
  getfolders(path) {
    debugger;
    let Path = path.currentTarget.text;
    this.Atoms = false;
    if (Path == 'Wisma 46') {
      this.Chemistry = false;
      this.Physics = true;
    }
    else {
      this.Chemistry = true;
      this.Physics = false;
      this.Atoms = false;
      this.Equilibrium = false;
      this.StatesOfMatter = false;
    }





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

  Atoms: boolean;
  public GetAtoms() {
    this.Atoms = true;
    this.Equilibrium = false;
    this.StatesOfMatter = false;
  }

  Equilibrium: boolean;

  public getEquilibrium() {
    this.Atoms = false;
    this.Equilibrium = true;
    this.StatesOfMatter = false;
  }

  public getMatters() {
    this.Atoms = false;
    this.Equilibrium = false;
    this.StatesOfMatter = true;
  }





  public BranchFilter(evn) {
    this.branch = evn.target.value;
    // this.branch_class = '10 STD';
    // let getpath = this.branch + "/" + this.branch_class;
    // this.currentpath = getpath;
    // this.currentfolder = this.branch_class;
    // this.getchapterfolder(this.currentpath);
    // this.getchapterfiles(this.currentpath);

  }

  branch1
  public ClassFilter(evn) {
    debugger;
    this.branch1 = this.branch;
    this.branch_class = evn.target.value;
    let getpath = this.branch1 + "/" + this.branch_class;
    this.currentpath = getpath;
    this.currentfolder = this.branch_class;
    this.getchapterfolder(this.currentpath);
    this.getchapterfiles(this.currentpath);

  }


}
