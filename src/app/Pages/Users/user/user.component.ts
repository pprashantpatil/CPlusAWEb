import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public pageMenuTitle;
  public userDashboard_PageTitle;
  public userDashboard_breadchrumb;
  public userDashboard_button_NewUser;
  public userDashboard_Photo;
  public userDashboard_User_Type;
  public userDashboard_Name;
  public userDashboard_Email;
  public userDashboard_Phone;
  public userDashboard_Module;
  public userDashboard_Actions;
  public UsersList: any;
  selectedlanguage: any;
  userTypelist: any;
  userTypeID: any;
  serachtext: any;
  RoleTypeList: any;
  userRoletype: any;
  UserID: any;
  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetUserDashboardLanguageByLanguageID(this.selectedlanguage);
    this.GetUserslist(this.selectedlanguage);

    // this.fmsservice.GetUserType(this.selectedlanguage).subscribe(
    //   res => {
    //     debugger;
    //     this.userTypelist = res;
    //   }
    // )

    this.fmsservice.GetRoleType(1).subscribe(
      res => {
        debugger;
        this.RoleTypeList = res;

        this.RoleTypeList.sort(function (a, b) {
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
    )


  }




  GetUserDashboardLanguageByLanguageID(id) {
    debugger
    this.fmsservice.GetUserDashboardLanguageByLanguageID(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.userDashboard_PageTitle = res[0].userDashboard_PageTitle;
        this.userDashboard_breadchrumb = res[0].userDashboard_breadchrumb;
        this.userDashboard_button_NewUser = res[0].userDashboard_button_NewUser;
        this.userDashboard_Photo = res[0].userDashboard_Photo;
        this.userDashboard_User_Type = res[0].userDashboard_User_Type;
        this.userDashboard_Name = res[0].userDashboard_Name;
        this.userDashboard_Email = res[0].userDashboard_Email;
        this.userDashboard_Phone = res[0].userDashboard_Phone;
        this.userDashboard_Module = res[0].userDashboard_Module;
        this.userDashboard_Actions = res[0].userDashboard_Actions;
        this.UserID = res[0].userID;
      }

    )
  }


  public GetUserslist(languageid) {
    this.fmsservice.GetUserslist(languageid).subscribe(
      res => {
        debugger;
        this.UsersList = res;
      }
    )
  }


  filterrole(userRoletype) {
    this.userRoletype = userRoletype.target.value;




  }


  // DeleteUsers(){

  // }


  DeleteUsers(userID, Name) {
    debugger;



    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover User Details!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsservice.DeleteUsers(userID).subscribe(data => {
          if (data != undefined) {
            Swal.fire(
              'Deleted!',
              'Your User Details has been deleted.',
              'success'
            )

            this.GetUserslist(this.selectedlanguage);
            this.InsertLoginDetails(Name);
          }
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your User Details is safe :)',
          'error'
        )
      }
    })

  }


  InsertLoginDetails(Name) {
    debugger
    var obj = {
      "ApplicationName": 'User ' + Name + ' Deleted',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "User",
      "Action": 'Delete User',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }


  FilteruserType(userTypeID) {
    debugger
    this.userTypeID = userTypeID.target.value;
    if (this.userTypeID == '') {
      this.fmsservice.GetUserslist(this.selectedlanguage).subscribe(
        res => {
          debugger;
          this.UsersList = res;
        }
      )
    }
    else {
      this.fmsservice.GetUserslist(this.selectedlanguage).subscribe(
        res => {
          debugger;
          this.UsersList = res;
          debugger
          var list = this.UsersList.filter(x => x.userTypeID == this.userTypeID)
          debugger
          this.UsersList = list;
        }
      )

    }

  }


  PouseUsers(data) {

    var filter = {
      'ID': data,
      'Pause': 1

    }

    this.fmsservice.PouseUsers(filter).subscribe(data => {
      debugger
      if (data != undefined) {
        Swal.fire("User Suspended Successfully");
        this.fmsservice.GetUserslist(this.selectedlanguage).subscribe(
          res => {
            debugger;
            this.UsersList = res;
          }
        )

      }
    })
  }


  playUsers(data) {
    var filter = {
      'ID': data,
      'Pause': 0

    }

    this.fmsservice.PouseUsers(filter).subscribe(data => {
      debugger

      if (data != undefined) {
        Swal.fire("User is Activated Successfully");

        this.fmsservice.GetUserslist(this.selectedlanguage).subscribe(
          res => {
            debugger;
            this.UsersList = res;
          }
        )

      }
    })
  }


}
