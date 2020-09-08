import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tenent-notice',
  templateUrl: './tenent-notice.component.html',
  styleUrls: ['./tenent-notice.component.css']
})
export class TenentNoticeComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }
  public pageMenuTitle;
  public tenantnotice_PageTitle;
  public tenantnotice_BreadChrumb;
  public tenantnotice_Search;
  public tenantnotice_Building;
  public tenantnotice_Floor;
  public tenantnotice_TenantName;
  public tenantnotice_Notice;
  public tenantnotice_NoticeDate;
  public tenantnotice_Notes;
  public tenantnotice_Actions;
  public tenantnotice_Accept;
  public TenantList: any;
  public Search;
  public Buildinglist;
  public BuildingID;
  public Floorlist;
  public FilteredTenantList;
  public AcceptVis:boolean;



  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetTenantnoticeLanguage(selectedlanguage);
    this.GetTenantNotice(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
  }

  public GetTenantnoticeLanguage(languageid) {
    this.fmsservice.GetTenantnoticeLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.tenantnotice_PageTitle = res[0].tenantnotice_PageTitle;
        this.tenantnotice_BreadChrumb = res[0].tenantnotice_BreadChrumb;
        this.tenantnotice_Search = res[0].tenantnotice_Search;
        this.tenantnotice_Building = res[0].tenantnotice_Building;
        this.tenantnotice_Floor = res[0].tenantnotice_Floor;
        this.tenantnotice_TenantName = res[0].tenantnotice_TenantName;
        this.tenantnotice_Notice = res[0].tenantnotice_Notice;
        this.tenantnotice_NoticeDate = res[0].tenantnotice_NoticeDate;
        this.tenantnotice_Notes = res[0].tenantnotice_Notes;
        this.tenantnotice_Actions = res[0].tenantnotice_Actions;
        this.tenantnotice_Accept = res[0].tenantnotice_Accept;
      }
    )
  }

  public GetTenantNotice(languageid) {
    this.fmsservice.GetTenantNotice(languageid).subscribe(
      res => {
        debugger;
        this.TenantList = res;
        this.FilteredTenantList = this.TenantList;
        // for(let i=0; i<this.FilteredTenantList.length; i++){
        //   debugger;
        //   if(this.FilteredTenantList[i].noticeAccepted==false){
        //     this.AcceptVis=true;
        //   }
        //   else{
        //     this.AcceptVis=false;
        //   }
        // }

      }
    )
  }

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;
      }
    )
  }

  public GetFloor(evn) {
    debugger;
    this.BuildingID = evn.target.value;
    this.fmsservice.GetFloor(this.BuildingID).subscribe(
      res => {
        debugger;
        this.Floorlist = res;
        this.FilteredTenantList = this.TenantList.filter(x => x.buildingID == this.BuildingID);
      }
    )
  }


  public FilteredFloorList(evn) {
    debugger;
    this.FilteredTenantList = this.TenantList.filter(x => x.buildingID == this.BuildingID && x.floorID == evn.target.value);
  }



  tenentEntity = {
    ID: 0,
    NoticeAccepted: 1,
    NoticeReason: "",
    NoticeDate:""
  }

  public TenantNoticeAccept(evn) {
    debugger;
    this.tenentEntity.ID=evn.id;


    // this.fmsservice.UpdateTenantNotice( this.tenentEntity.ID,this.tenentEntity.NoticeAccepted,this.tenentEntity.NoticeReason,this.tenentEntity).subscribe(res => {
    //   debugger;
    //   Swal.fire('Grocery Request Assigned Successfully');
    //   //this.Clear();
    //   this.GetTenantNotice(1);
    // })
  }

  public savecancelreason(){
    debugger;
    this.fmsservice.UpdateTenantNotice( this.tenentEntity.ID,this.tenentEntity.NoticeAccepted,this.tenentEntity.NoticeReason,this.tenentEntity.NoticeDate,this.tenentEntity).subscribe(res => {
      debugger;
      Swal.fire('Tenant Notice Accepted Successfully');
      //this.Clear();
      this.GetTenantNotice(1);
    })
  }


}
