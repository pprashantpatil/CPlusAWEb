import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-tenant-inventorymaster',
  templateUrl: './edit-tenant-inventorymaster.component.html',
  styleUrls: ['./edit-tenant-inventorymaster.component.css']
})
export class EditTenantInventorymasterComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute, private router: Router, public fmsservice: FmsService) { }

  public ID: any;
  public detailes: any;
  public Equipmentid: any;
  public itemdesc: any;
  public itemname: any;
  public photo: any;
  public attachments: File[] = [];
  public attachmentsurl = [];
  public equipmentlist: any;
  public selectedLangauge: any;
  public attachmenturl: any;

  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      this.selectedLangauge = localStorage.getItem("selectedLanguageID");
      this.GetTenantMasterByID();
      this.GetEquipmentType(this.selectedLangauge);
    }
    )
  }

  public GetTenantMasterByID() {
    this.fmsservice.GetTenantInventorymasterByID(this.ID).subscribe(data => {
      debugger
      this.detailes = data;
      this.itemdesc = this.detailes[0].itemDescription,
        this.itemname = this.detailes[0].itemName,
        this.Equipmentid = this.detailes[0].itemType,
        this.photo = this.detailes[0].photo
    })
  }

  public GetEquipmentType(LanagaugeID) {
    this.fmsservice.GetEquipmentType(LanagaugeID).subscribe(data => {
      debugger
      this.equipmentlist = data;
    })
  }

  public GetEquipmentID(even) {
    debugger
    this.Equipmentid = even.target.value;
  }

  public onattachmentUpload(abcd) {
    debugger;
    this.attachments.length = 0;
    this.attachments.push(abcd);
    this.uploadattachments();
  }
  public uploadattachments() {
    this.fmsservice.Uploaditemphoto(this.attachments).subscribe(res => {
      debugger;
      this.attachmentsurl.push(res);
      this.attachments.length = 0;
      this.attachmenturl = this.attachmentsurl[0];
      debugger;
      Swal.fire("Added Successfully");
    });
  }

  public UpdateTenant() {
    var entity = {
      ID: this.ID,
      ItemType: this.Equipmentid,
      ItemName: this.itemname,
      ItemDescription: this.itemdesc,
      Photo: this.attachmenturl
    }
    this.fmsservice.UpdateTenantInventorymaster(entity).subscribe(data => {
      if (data != null) {
        Swal.fire("Updated Sucessfully");
      }
    })
  }



}
