import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-financeprojectprogressdash',
  templateUrl: './financeprojectprogressdash.component.html',
  styleUrls: ['./financeprojectprogressdash.component.css']
})
export class FinanceprojectprogressdashComponent implements OnInit {
  Projectlist: any;
  PaymentstatusID = 0;
  invoiceno: any;
  financecomments: any;
  ProID: any;
  payAmount: any;
  date: any;
  ProjectSearch: any;
  PaymentTypelist: any;
  constructor(public fmsService: FmsService) { }

  ngOnInit() {
    this.fmsService.GetBuildingProjectProgress().subscribe(data => {
      debugger
      this.Projectlist = data;
      let list = this.Projectlist.filter(x => x.qcApproval == 1)
      this.Projectlist = list;

    })

    this.fmsService.GetPaymentType(1).subscribe(
      res => {
        debugger;
        this.PaymentTypelist = res;
      }
    )
  }


  getmyupdate(data) {
    debugger
    this.ProID = data;

  }





  TransactionNo: any;
  Amount: any;
  FinanceComment: any;
  PaymentType: any;
  UpdateBuildingProjectProgressfinance() {
    debugger

    var filter = {
      'ID': this.ProID,
      'TransactionNo': this.TransactionNo,
      'Amount': this.Amount,
      'Date': this.date,
      'FinanceComment': this.FinanceComment,
      'PaymentType': this.ChequeID
    }

    debugger
    this.fmsService.UpdateBuildingProjectProgressfinance(filter).subscribe(data => {
      debugger
      if (data != undefined) {
        Swal.fire("Updated Successfully");

        this.clear();
        this.fmsService.GetBuildingProjectProgress().subscribe(data => {
          debugger
          this.Projectlist = data;
          let list = this.Projectlist.filter(x => x.qcApproval == 1)
          this.Projectlist = list;

        })

      }
    })
  }



  ApproveFinance(evn) {
    debugger
    let BuildingStageID = evn;

    var filter = {
      'ID': BuildingStageID,
      'FinanceApproval': 1
    }

    this.fmsService.UpdateFinanceAprrovals(filter).subscribe(data => {
      debugger;
      Swal.fire("Approved Successfully");
      this.fmsService.GetBuildingProjectProgress().subscribe(data => {
        debugger

        this.Projectlist = data;

        let list = this.Projectlist.filter(x => x.apProvalBIT == 1)

        this.Projectlist = list;

      })
    })

  }
  ChequeID
  public PaymentBasedTextBox(evn) {
    debugger;
    this.ChequeID = evn.target.value;
  }

  RejectFinance(evn) {
    debugger
    let BuildingStageID = evn;
    var filter = {
      'ID': BuildingStageID,
      'FinanceApproval': 2
    }
    this.fmsService.UpdateFinanceAprrovals(filter).subscribe(data => {
      debugger;
      Swal.fire("Rejected Successfully");
      this.fmsService.GetBuildingProjectProgress().subscribe(data => {
        debugger

        this.Projectlist = data;

        let list = this.Projectlist.filter(x => x.apProvalBIT == 1)

        this.Projectlist = list;

      })
    })

  }



  clear() {
    debugger
    this.PaymentstatusID = 0,
      this.financecomments = '',
      this.invoiceno = '',
      this.payAmount = ''

  }

  // photo
  // getphpto(data) {
  //   debugger
  //   this.photo = data;
  // }

  video = [];
  getVideo(data) {
    debugger
    this.video.length = 0
    this.video.push(data);
    debugger
  }


  photos
  public getphpto(id) {
    debugger;
    debugger
    this.fmsService.GetStaffUploadedPhotos(id).subscribe(data => {
      debugger
      this.photos = data;
    })
  }

  qcphotos
  public getQCphpto(id) {
    this.fmsService.GetBuildingProjectProgresQCApprovalPhotos(id).subscribe(data => {
      debugger
      this.qcphotos = data;
    })
  }

  video1 = [];
  public getQCVideo(data) {
    debugger;
    this.video1.length = 0
    this.video1.push(data);
    debugger
  }
}
