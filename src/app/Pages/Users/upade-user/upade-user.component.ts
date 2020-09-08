import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
//import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-upade-user',
  templateUrl: './upade-user.component.html',
  styleUrls: ['./upade-user.component.css']
})
export class UpadeUserComponent implements OnInit {

  public pageMenuTitle;
  public updateUser_PageTitle;
  public updateUser_breadchrumb;
  public updateUser_button_Save;
  public updateUser_User_Role;
  public updateUser_Name;
  public updateUser_Email;
  public updateUser_Phone;
  public updateUser_Module;
  public updateUser_Description;
  public updateUser_User_Photo;
  public RoleTypeList;
  public UserRoleList = [];
  dropdownSettings = {}
  paramID: any;
  selectedlanguage: any;
  userlist: any;
  inserteduserID: any;
  res = [];

  FileName1: any;
  FileType1: any;
  base64textString1: any;
  Images: any;
  usernameid: any;
  userpassword: any;
  Isempty: any;
  selecteditemsModule = [];
  selecteditemsModule1 = [];
  Password: any;
  public UsersEntity = {
    ID: 0,
    Name: "",
    EmailID: "",
    PhoneNo: "",
    UserTypeID: 1,
    UserRoleID: "",
    Description: "",
    PhotoURL: "",
    LanguageID: 0,
    FileName: "",
    FileType: "",
    Base64Data: "",
    modifieddate: new Date(),
    Password: "",
    UsernameID: ""
  }



  constructor(public fmsservice: FmsService, public activatedRoute: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetUpdateUserLanguageByLanguageID(this.selectedlanguage);
    this.GetRoleType(this.selectedlanguage);
    this.GetUserrole(this.selectedlanguage);

    var list = this.activatedRoute.params.subscribe(data => {
      this.paramID = data['id']

      if (this.paramID != null && this.paramID != undefined) {
        debugger;
        this.fmsservice.GetUsers(this.paramID, this.selectedlanguage).subscribe(data => {
          debugger;
          this.userlist = data;
          this.UsersEntity.Name = this.userlist[0].name;
          this.UsersEntity.EmailID = this.userlist[0].emailID;
          this.UsersEntity.PhoneNo = this.userlist[0].phoneNo;
          this.UsersEntity.UserRoleID = this.userlist[0].userRoleID;
          this.UsersEntity.UsernameID = this.userlist[0].userID;
          // this.UsersEntity.Password = this.userlist[0].password;
          this.DecrptPassword(this.userlist[0].password);
          let userrole = this.userlist[0].userRoles.split(',');
          let FillteredModels = [];
          debugger;
          for (let i = 0; i < userrole.length; i++) {
            let userselectedModule = this.UserRoleList.filter(x => x.id == userrole[i].trim());
            FillteredModels.push(userselectedModule[0]);
            this.selecteditemlist.push(userselectedModule[0]);
          }
          this.selecteditemsModule = FillteredModels;
          // var temp = [];
          // var templist = this.userlist[0].userRoles.split(',')
          // 
          // for (var i = 0; i < templist.length; i++) {
          //   
          //   let dd = { "key": templist[i] }
          //   temp.push(dd);
          // }


          //  for( var j = 0; j < temp.length; j++){

          //           temp.forEach(ele => {
          //             
          //             this.fmsservice.GetUserrole(1).subscribe(
          //               result => {

          //                 this.UserRoleList = result;

          //                 var list = this.UserRoleList.filter(x => x.id == parseInt(ele.key))

          //                 this.res.push(list[0])
          //                 
          //                 this.UserRoleList = this.res;
          //                 
          //               }

          //             )
          // 

          //             
          //           })




          //  }



          this.UsersEntity.Description = this.userlist[0].description
          this.UsersEntity.PhotoURL = this.userlist[0].actPhotoURL
          this.Images = this.userlist[0].photoURL
          this.UsersEntity.LanguageID = this.userlist[0].languageID


        })

      }
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'short',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };
    //this.selecteditemsModule = [];
    // this.fmsservice.GetUsers()


  }



  public DecrptPassword(password) {
    this.fmsservice.DecrptPassword(password).subscribe(
      res => {
        this.Password = res;
        this.UsersEntity.Password = this.Password;
      }
    )
  }

  GetUpdateUserLanguageByLanguageID(id) {
    this.fmsservice.GetUpdateUserLanguageByLanguageID(id).subscribe(
      res => {

        this.pageMenuTitle = res[0].pageMenuTitle;
        this.updateUser_PageTitle = res[0].updateUser_PageTitle;
        this.updateUser_breadchrumb = res[0].updateUser_breadchrumb;
        this.updateUser_button_Save = res[0].updateUser_button_Save;
        this.updateUser_User_Role = res[0].updateUser_User_Role;
        this.updateUser_Name = res[0].updateUser_Name;
        this.updateUser_Email = res[0].updateUser_Email;
        this.updateUser_Phone = res[0].updateUser_Phone;
        this.updateUser_Module = res[0].updateUser_Module;
        this.updateUser_Description = res[0].updateUser_Description;
        this.updateUser_User_Photo = res[0].updateUser_User_Photo;
        this.usernameid = res[0].usernameID;
        this.userpassword = res[0].userpassword;
      }

    )
  }

  public GetRoleType(UserTypeID) {
    this.fmsservice.GetRoleType(1).subscribe(
      res => {

        this.RoleTypeList = res;
      }
    )
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
    this.FileName1 = FileName;
    this.FileType1 = FileType;
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
    this.base64textString1 = btoa(binaryString);
    console.log(this.base64textString1);
  }

  public GetUserrole(languageid) {
    this.fmsservice.GetUserrole(languageid).subscribe(
      res => {
        ;
        this.UserRoleList = res;
      }
    )
  }


  selecteditemlist1 = [];
  selecteditemlist = [];
  onItemSelect(item: any) {
    this.selecteditemlist.push(item)
  }
  onItemDeSelect(item: any) {
    var index = this.selecteditemlist.findIndex(x => x.id == item.id)
    this.selecteditemlist.splice(index, 1);

  }

  onSelectAll(items: any) {
    console.log(items);
    this.selecteditemlist1.push(items)
    this.selecteditemlist = this.selecteditemlist1[0]
  }





  selectedTenantUnit = [];
  selectedlist = [];
  onItemSelect1(item: any) {
    this.selectedTenantUnit.push(item)
  }
  onItemDeSelect1(item: any) {
    var index = this.selectedTenantUnit.findIndex(x => x.id == item.id)
    this.selectedTenantUnit.splice(index, 1);

  }

  onSelectAll1(items: any) {
    console.log(items);
    this.selectedTenantUnit.push(items)
    this.selectedTenantUnit = this.selectedTenantUnit[0]
  }


  


  onFilesAddedAttached(files: File[]) {
    this.fmsservice.UploadCV(files).subscribe(res => {
      this.UsersEntity.PhotoURL = res.toString();
    })
  }


  PasswordValid;
  public InsertUsers() {
    var list = {
      FileType: this.FileType1,
      selecteditemlist: this.selecteditemlist.length
    }
    let validate = this.fmsservice.isEmpty(list);
    if (validate.length > 0) {
      this.Isempty = true;
    }
    else {
      this.PasswordValid = this.fmsservice.strongpassword(this.UsersEntity.Password);
      if (this.PasswordValid == false) {
        debugger;
        Swal.fire("Week Password!! Please Enter Password Which Contains One Capital, One Number, One Special Character & Eight Characters")
      } else {
        this.UsersEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
        this.UsersEntity.FileName = this.FileName1
        this.UsersEntity.FileType = this.FileType1
        this.UsersEntity.Base64Data = this.base64textString1
        this.UsersEntity.modifieddate = new Date();
        let test = this.UsersEntity;
        this.fmsservice.InsertUsers(this.UsersEntity).subscribe(res => {
          debugger;
          this.inserteduserID = res;
          this.InsertUserRoles();
          Swal.fire('User Saved Successfully !');
          this.InsertLoginDetails();
          this.clear();
          location.href="#/User";
        });
      }
    }
  }


  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'User ' + this.UsersEntity.Name + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "New User",
      "Action": 'Add New User',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        this.clear();
      }
    })
  }

  InsertLoginDetails1() {
    debugger
    var obj = {
      "ApplicationName": 'User ' + this.UsersEntity.Name + ' Update',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "New User",
      "Action": 'Update User',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        this.clear();
      }
    })
  }


  InsertUserRoles() {
    for (var i = 0; i < this.selecteditemlist.length; i++) {
      this.fmsservice.InsertUserRoles(this.inserteduserID, this.selecteditemlist[i].id, 'Admin').subscribe(data => {
        if (data != undefined) {
        }
      })
    }

  }





  // InsertUserDocuments(){
  //   
  //       for (let j=0;j<this.filenamedetails.length;j++)
  //       {

  //         var obj = {
  //           'UserID':this.inserteduserID,
  //           'ModifiedBy':'Admin',
  //           "FileType": this.filenamedetails[j].ffile,
  //           "FileName": this.filenamedetails[j].fname,
  //           "modifieddate": new Date(),
  //           "Base64Data":this.filenamedetails[j].base[j],
  //         }
  //         
  //         this.fmsservice.InsertUserDocuments(obj).subscribe((data) => {
  //           if (data!=null && data!=undefined) {
  //             


  //           }
  //         })
  //       }

  //     }


  // UpdateUsers(){
  //   
  //   var Filter={

  //   }
  // }

  public UpdateUsers() {
    // this.FileType1="ksjdnvk"
    var list = {
      UserRoleID: this.UsersEntity.UserRoleID,
    }
    let validate = this.fmsservice.isEmpty(list);
    if (validate.length > 0) {
      this.Isempty = true;
    }
    else {

      this.PasswordValid = this.fmsservice.strongpassword(this.UsersEntity.Password);
      if (this.PasswordValid == false) {
        debugger;
        Swal.fire("Week Password!! Please Enter Password Which Contains One Capital, One Number, One Special Character & Eight Characters")
      } else {
        this.UsersEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
        this.UsersEntity.ID = this.paramID
        this.UsersEntity.FileName = this.FileName1 != undefined ? this.FileName1 : null
        this.UsersEntity.FileType = this.FileType1 != undefined ? this.FileType1 : null
        this.UsersEntity.Base64Data = this.base64textString1 != undefined ? this.base64textString1 : this.UsersEntity.PhotoURL
        this.UsersEntity.modifieddate = new Date()
        let test = this.UsersEntity;
        this.fmsservice.UpdateUsers(this.UsersEntity).subscribe(res => {

          if (res != undefined) {
            Swal.fire('User Updated Successfully!');
            this.InsertLoginDetails();
            location.href="#/User";
          }
          for (var i = 0; i < this.selecteditemlist.length; i++) {
            this.fmsservice.InsertUserRoles(this.paramID, this.selecteditemlist[i].id, 'Admin').subscribe(data => {
            })
          }
          this.clear();
        })
      }

    }

  }


  clear() {

    this.UsersEntity = {
      ID: 0,
      Name: "",
      EmailID: "",
      PhoneNo: "",
      UserTypeID: 1,
      UserRoleID: "",
      Description: "",
      PhotoURL: "",
      LanguageID: 0,
      FileName: "",
      FileType: "",
      Base64Data: "",
      modifieddate: new Date(),
      Password: "",
      UsernameID: ""
    }
  }

  ngAfterViewInit() {
    debugger;


  }




}
