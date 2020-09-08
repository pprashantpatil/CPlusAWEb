import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-suppoapproval',
  templateUrl: './suppoapproval.component.html',
  styleUrls: ['./suppoapproval.component.css']
})
export class SuppoapprovalComponent implements OnInit {

  constructor(public fmsservice: FmsService,) { }
  public leavelist:any;
  selectedlanguage:any;
  BuildingStaffList:any;
  Opapproval:any;
  Opapprovallist:any;
  Staffsearch:any;
  Reason:any;
  type:any;
  Comment:any;

  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.type=localStorage.getItem('Type');
    this.fmsservice.GetPOApproval().subscribe(
      res => {
        debugger;
        this.Opapproval = res;

        if(this.type==10013){

          debugger
          var List=this.Opapproval.filter(x=>x.managerID== localStorage.getItem('userid') && x.approvalType==this.type)
  
          this.Opapprovallist=List
        }

        else if(this.type==10012){
          debugger
          var List=this.Opapproval.filter(x=>x.finanacerID== localStorage.getItem('userid') && x.approvalType==this.type)
  
          this.Opapprovallist=List

        }

        else if(this.type==10014){
          debugger
          var List=this.Opapproval.filter(x=>x.cfoid== localStorage.getItem('userid') && x.approvalType==this.type)
  
          this.Opapprovallist=List

        }

      }
    )
  }

  SID;
  ApprovalID;
Approvalpo(ID,appID){
  debugger
this.SID=ID;
this.ApprovalID=appID
  
}



Approvalrejion(){
  debugger

  if(this.ApprovalID==10013){

    this.fmsservice.UpdateApprovalPO(this.SID,10012,this.Comment).subscribe(data=>{
      debugger
      if(data!=undefined){
  
        Swal.fire('Approved Successfully')
  
        this.fmsservice.GetPOApproval().subscribe(
          res => {
            debugger;
            this.Opapproval = res;
    
            if(this.type==10013){
    
              debugger
              var List=this.Opapproval.filter(x=>x.managerID== localStorage.getItem('userid') && x.approvalType==this.type)
      
              this.Opapprovallist=List
            }
    
            else if(this.type==10012){
              debugger
              var List=this.Opapproval.filter(x=>x.finanacerID== localStorage.getItem('userid') && x.approvalType==this.type)
      
              this.Opapprovallist=List
    
            }
    
            else if(this.type==10014){
              debugger
              var List=this.Opapproval.filter(x=>x.cfoid== localStorage.getItem('userid') && x.approvalType==this.type)
      
              this.Opapprovallist=List
    
            }
    
          }
        )
      }
    })
  }

  else if(this.ApprovalID==10012){
    this.fmsservice.UpdateApprovalPO(this.SID,10014,Comment).subscribe(data=>{
      debugger
      if(data!=undefined){
  
        Swal.fire('Approved Successfully')

        this.Comment=''
  
        this.fmsservice.GetPOApproval().subscribe(
          res => {
            debugger;
            this.Opapproval = res;
    
            if(this.type==10013){
    
              debugger
              var List=this.Opapproval.filter(x=>x.managerID== localStorage.getItem('userid') && x.approvalType==this.type)
      
              this.Opapprovallist=List
            }
    
            else if(this.type==10012){
              debugger
              var List=this.Opapproval.filter(x=>x.finanacerID== localStorage.getItem('userid') && x.approvalType==this.type)
      
              this.Opapprovallist=List
    
            }
    
            else if(this.type==10014){
              debugger
              var List=this.Opapproval.filter(x=>x.cfoid== localStorage.getItem('userid') && x.approvalType==this.type)
      
              this.Opapprovallist=List
    
            }
    
          }
        )
      }
    })

  }

 

}

reID:any;
PoRejected(ID){
  debugger
this.reID=ID
  
}



PoReject(){
  debugger
  this.fmsservice.UpdateApprovalPO(this.reID,0,this.Comment).subscribe(data=>{
    debugger
    if(data!=undefined){

      Swal.fire('Rejected Successfully')
      this.Comment=''
      this.fmsservice.GetPOApproval().subscribe(
        res => {
          debugger;
          this.Opapproval = res;
  
          if(this.type==10013){
  
            debugger
            var List=this.Opapproval.filter(x=>x.managerID== localStorage.getItem('userid') && x.approvalType==this.type)
    
            this.Opapprovallist=List
          }
  
          else if(this.type==10012){
            debugger
            var List=this.Opapproval.filter(x=>x.finanacerID== localStorage.getItem('userid') && x.approvalType==this.type)
    
            this.Opapprovallist=List
  
          }
  
          else if(this.type==10014){
            debugger
            var List=this.Opapproval.filter(x=>x.cfoid== localStorage.getItem('userid') && x.approvalType==this.type)
    
            this.Opapprovallist=List
  
          }
  
        }
      )
    }
  })

}
  
}
