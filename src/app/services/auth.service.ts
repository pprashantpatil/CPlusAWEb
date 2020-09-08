import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  debugger;
  // public fmsUrl1 = 'http://14.192.17.225/digiFMSv2API/';
  //public fmsUrl1 = 'http://14.192.17.225/JEG/';
  //public fmsUrl1 = 'http://14.192.17.225/JEGTest/';
  // public fmsUrl = 'https://14.192.17.225/Exchange106API';
  // public fmsUrl = 'https://14.192.17.225/CTCAPI';
  //public fmsUrl = "http://localhost:1807";
  //public fourteenurl="http://14.192.17.225/FMSTestingApi/"



  //  public fmsUrl1 = 'http://23.101.22.93/CTCAPI';
  // public fmsUrl = localStorage.getItem('fmsurl');
  public fmsUrl1 = 'http://localhost:1807';
  public fmsUrl = 'http://localhost:1807';
  constructor(public http: HttpClient) {

  }


  public GetUserLoginDetails(userID, u_Password) {
    // userID="Admin" ;
    // u_Password="1";
    debugger;
    let LoginTypeID = localStorage.getItem("LoginTypeID");
    if (LoginTypeID == '1') {
      return this.http.get(this.fmsUrl + "/User/GetStaffDetailsLogin?Name=" + userID + "&Password=" + u_Password);
    } else if (LoginTypeID == '2') {
      return this.http.get(this.fmsUrl + "/User/GetUsersdetails?Name=" + userID + "&Password=" + u_Password);
    }
    else if (LoginTypeID == '3') {
      return this.http.get(this.fmsUrl + "/User/GetCompanyDetailsLogin?Name=" + userID + "&Password=" + u_Password);
    }
    else if (LoginTypeID == '4') {
      return this.http.get(this.fmsUrl + "/Vendor/GetVendordetails?Name=" + userID + "&Password=" + u_Password);
    }
    else if (LoginTypeID == '5') {
      return this.http.get(this.fmsUrl + "/Vendor/GetFinancedetails?Name=" + userID + "&Password=" + u_Password);
    }
    else if (LoginTypeID == '6') {
      return this.http.get(this.fmsUrl + "/Vendor/GetWareHousedetails?Name=" + userID + "&Password=" + u_Password);
    }
    else if (LoginTypeID == '7') {
      return this.http.get(this.fmsUrl + "/Vendor/GetHRdetails?Name=" + userID + "&Password=" + u_Password);
    }
    else if (LoginTypeID == '8') {
      return this.http.get(this.fmsUrl + "/Building/GetSupervisorDetails?Name=" + userID + "&Password=" + u_Password);
    }
    else if (LoginTypeID == '9') {
      return this.http.get(this.fmsUrl + "/User/GetUsersdetails?Name=" + userID + "&Password=" + u_Password);
    }



  }

  public GetUserLoginDetailsadmin(userID, u_Password) {
    // userID="Admin" ;
    // u_Password="1";
    debugger;
    let LoginTypeID = localStorage.getItem("LoginTypeID");
    if (LoginTypeID == '1') {
      return this.http.get(this.fmsUrl1 + "/User/GetStaffDetailsLogin?Name=" + userID + "&Password=" + u_Password);
    } else if (LoginTypeID == '2') {
      return this.http.get(this.fmsUrl1 + "/User/GetUsersdetails?Name=" + userID + "&Password=" + u_Password);
    }
    else if (LoginTypeID == '3') {
      return this.http.get(this.fmsUrl1 + "/User/GetCompanyDetailsLogin?Name=" + userID + "&Password=" + u_Password);
    }
    else if (LoginTypeID == '4') {
      return this.http.get(this.fmsUrl1 + "/Vendor/GetVendordetails?Name=" + userID + "&Password=" + u_Password);
    }
    else if (LoginTypeID == '5') {
      return this.http.get(this.fmsUrl1 + "/Vendor/GetFinancedetails?Name=" + userID + "&Password=" + u_Password);
    }
    else if (LoginTypeID == '6') {
      return this.http.get(this.fmsUrl + "/Vendor/GetWareHousedetails?Name=" + userID + "&Password=" + u_Password);
    }
    else if (LoginTypeID == '7') {
      return this.http.get(this.fmsUrl + "/Vendor/GetHRdetails?Name=" + userID + "&Password=" + u_Password);
    }

    else if (LoginTypeID == '8') {
      return this.http.get(this.fmsUrl + "/Building/GetSupervisorDetails?Name=" + userID + "&Password=" + u_Password);
    }
    else if (LoginTypeID == '9') {
      return this.http.get(this.fmsUrl + "/User/GetUsersdetails?Name=" + userID + "&Password=" + u_Password);
    }

  }




  public getauthtokenbyuserlogin(username, password) {
    debugger;
    var headers = new HttpHeaders({
      "content-type": "application/x-www-form-urlencoded"
    })

    let LoginTypeID = localStorage.getItem("LoginTypeID");
    if (LoginTypeID == null) {
      Swal.fire("Please Select Type of User Login")
    }
    if (LoginTypeID == '2') {
      return this.http.post(this.fmsUrl + "/User/Authenicate", {
        UserName: username,
        Password: password,
        headers
      })
    }
    else if (LoginTypeID == '1') {
      return this.http.post(this.fmsUrl + "/User/StaffAuthenicate", {
        UserName: username,
        Password: password,
        headers
      })
    }
    else if (LoginTypeID == '3') {
      return this.http.get(this.fmsUrl + "/User/GetCompanyDetailsLogin?Name=" + username + "&Password=" + password);
    }
    else if (LoginTypeID == '4') {
      return this.http.get(this.fmsUrl + "/Vendor/GetVendordetails?Name=" + username + "&Password=" + password);
    }
    else if (LoginTypeID == '5') {
      return this.http.get(this.fmsUrl + "/Vendor/GetFinancedetails?Name=" + username + "&Password=" + password);
    }
    else if (LoginTypeID == '6') {
      return this.http.get(this.fmsUrl + "/Vendor/GetWareHousedetails?Name=" + username + "&Password=" + password);
    }
    else if (LoginTypeID == '7') {
      return this.http.get(this.fmsUrl + "/Vendor/GetHRdetails?Name=" + username + "&Password=" + password);
    }
    else if (LoginTypeID == '8') {
      return this.http.get(this.fmsUrl + "/Building/GetSupervisorDetails?Name=" + username + "&Password=" + password);
    }
    else if (LoginTypeID == '9') {
      return this.http.get(this.fmsUrl + "/User/GetUsersdetails?Name=" + username + "&Password=" + password);
    }

  }

  public getauthtokenbyuserloginAdmin(username, password) {
    debugger;
    var headers = new HttpHeaders({
      "content-type": "application/x-www-form-urlencoded"
    })

    let LoginTypeID = localStorage.getItem("LoginTypeID");
    if (LoginTypeID == null) {
      Swal.fire("Please Select Type of User Login")
    }
    if (LoginTypeID == '2') {
      return this.http.post(this.fmsUrl1 + "/User/Authenicate", {
        UserName: username,
        Password: password,
        headers
      })
    }
    else if (LoginTypeID == '1') {
      return this.http.post(this.fmsUrl1 + "/User/StaffAuthenicate", {
        UserName: username,
        Password: password,
        headers
      })
    }
    else if (LoginTypeID == '3') {
      return this.http.get(this.fmsUrl1 + "/User/GetCompanyDetailsLogin?Name=" + username + "&Password=" + password);
    }
    else if (LoginTypeID == '4') {
      return this.http.get(this.fmsUrl1 + "/Vendor/GetVendordetails?Name=" + username + "&Password=" + password);
    }
    else if (LoginTypeID == '5') {
      return this.http.get(this.fmsUrl1 + "/Vendor/GetFinancedetails?Name=" + username + "&Password=" + password);
    }
    else if (LoginTypeID == '6') {
      return this.http.get(this.fmsUrl1 + "/Vendor/GetWareHousedetails?Name=" + username + "&Password=" + password);
    }

    else if (LoginTypeID == '7') {
      return this.http.get(this.fmsUrl1 + "/Vendor/GetHRdetails?Name=" + username + "&Password=" + password);
    }
    else if (LoginTypeID == '8') {
      return this.http.get(this.fmsUrl + "/Building/GetSupervisorDetails?Name=" + username + "&Password=" + password);
    }

    else if (LoginTypeID == '9') {
      return this.http.get(this.fmsUrl + "/User/GetUsersdetails?Name=" + username + "&Password=" + password);
    }

  }
}
