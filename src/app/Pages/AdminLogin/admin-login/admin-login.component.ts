import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {


  public languages;
  public username;
  public userpassword;
  public fmsurl;
  public FilteredAssetList;
  public UserNameVis: boolean;
  public PasswordVis: boolean;
  public LoginButtonVis: boolean;
  public LanguageVis: boolean;
  public SubmitButtonVis: boolean;
  public Enitity = {
    companyID: 9999
  }

  constructor(public fmsservice: FmsService, private router: Router, private authService: AuthService, public datepipe: DatePipe) { }
  public ChangeEntity = {
    NewPassword: "",
    Password: ""
  }
  ngOnInit() {

    localStorage.removeItem('fmsurl');
    this.SubmitButtonVis = true;
    debugger;
    let jjj = document.getElementsByClassName('navbardivstyles');
    jjj[0]['style'].display = 'none';
    //document.getElementsByClassName('navbardivstyles')[0].setAttribute('style','none');
    this.fmsservice.Userlogin = false;
    localStorage.setItem('selectedLanguageID', '1');
    this.getlanguages();
  }


  public onCompanyIDSubmit() {
    debugger;
    this.Enitity.companyID;

    this.fmsservice.GetBaseURLByCompanyID(this.Enitity.companyID).subscribe(
      res => {
        debugger;
        //this.fmsurl=res.baseAPIURL;
        // this.AssetsList = res;
        this.FilteredAssetList = res;
        // this.fmsurl=res.baseAPIURL;

        localStorage.setItem('fmsurl', res["baseAPIURL"]);
        this.authService.fmsUrl = localStorage.getItem('fmsurl').toString();
        this.UserNameVis = true;
        this.PasswordVis = true;
        this.LoginButtonVis = true;
        this.LanguageVis = true;
        this.SubmitButtonVis = false
      }
    )

  }

  LoginTypeID
  public GetLoginType(evn) {
    debugger;
    this.LoginTypeID = evn.target.value;
    localStorage.setItem('LoginTypeID', evn.target.value);
  }


  onLogin() {
    debugger;
    localStorage.setItem('fmsurl', 'http://23.101.22.93/CASASARCHITECTUREAPI');
    this.authService.getauthtokenbyuserloginAdmin(this.username, this.userpassword).subscribe(res => {
      debugger;
      if (res == null) {
        Swal.fire("Please Enter Proper Credentials")
      } else {
        if (res["access_token"] == undefined || res["access_token"] == null) {
          res["access_token"] = "token unavailable";
        }
        localStorage.setItem('Token', res["access_token"]);
        localStorage.setItem('userLogin', 'true');
        localStorage.setItem('UserID', res["id"]);
        let userlogin = localStorage.getItem('userLogin');
        localStorage.setItem('password', res["password"]);
        let DecryptedPassword = localStorage.getItem("password");
        var boolValue = (userlogin == "true");
        localStorage.setItem('UserTypeID', res["userTypeID"]);
        let UserRoleID = localStorage.getItem('UserTypeID');

        this.authService.GetUserLoginDetailsadmin(this.username, DecryptedPassword).subscribe(res => {
          debugger;
          if (boolValue) {
            debugger;
            this.fmsservice.Userlogin = false;
            localStorage.setItem('userid', res["id"]);
            localStorage.setItem('Type', res["type"]);
            localStorage.setItem('username', res["name"]);
            localStorage.setItem('usermodules', res["userRoles"]);
            localStorage.setItem('SupervisorID', res["userRoleID"]);
            localStorage.setItem('ProjectID', res['building']);
            let SID = localStorage.getItem('SupervisorID');
            let test = location;
            let LoginTypeID = localStorage.getItem("LoginTypeID");
            if (LoginTypeID == '1') {
              location.href = '#/Dashboard';
              location.reload();
            }
            else if (LoginTypeID == '3') {
              location.href = '#/Dashboard';
              location.reload();
            }
            else if (LoginTypeID == '4') {
              location.href = '#/Building';
              location.reload();
            }
            else if (LoginTypeID == '5') {
              location.href = '#/Dashboard';
              location.reload();
            }
            else if (LoginTypeID == '2') {
              location.href = '#/Companydash';
              location.reload();
            }

          }

        })
      }
      this.InsertAccesReports();

    });


  }


  public InsertAccesReports() {

    var entity = {
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "UserID": localStorage.getItem("UserID"),
      "UserName": "-",
      "LoginTime": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "LogoutTime": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "BuildingID": 74
    }
    this.fmsservice.InsertAccesReports(entity).subscribe(res => {
      debugger;
      //Swal.fire('Successfully Saved!');
    })

  }




  public UpdatePassword() {
    debugger;

    if (this.username == null) {
      Swal.fire("Please Enter Your User Name")
    }
    this.authService.GetUserLoginDetails(this.username, this.ChangeEntity.Password).subscribe(res => {
      debugger;
      //let userlogin = localStorage.getItem('userLogin');
      //  var boolValue = (userlogin == "true");
      // if (boolValue) {
      //   debugger;
      //   this.fmsservice.Userlogin = false;
      localStorage.setItem('userid', res["id"]);
      // }

      let UserID = localStorage.getItem('userid');
      let Entity = {
        UserID: UserID,
        NewPassword: this.ChangeEntity.NewPassword,
        Password: this.ChangeEntity.Password
      }
      this.fmsservice.ChangePasswordWEB(UserID, Entity).subscribe(res => {
        debugger;
        if (res == 0) {
          Swal.fire('Incorrect Password! Please Enter Old Password Currectly!');
        }
        else {
          Swal.fire('Password Saved Successfully!');
        }

      })
    })

  }

  getlanguages() {
    this.fmsservice.getlanguagemaster().subscribe(
      res => {
        this.languages = res;
      }

    )
  }

  selectLanguage(evn) {
    localStorage.setItem('selectedLanguageID', evn.target.value);
  }


}
