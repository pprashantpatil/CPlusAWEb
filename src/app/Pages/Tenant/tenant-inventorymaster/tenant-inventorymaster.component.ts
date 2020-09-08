import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tenant-inventorymaster',
  templateUrl: './tenant-inventorymaster.component.html',
  styleUrls: ['./tenant-inventorymaster.component.css']
})
export class TenantInventorymasterComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }

  public attachments: File[] = [];
  public attachmentsurl = [];
  public selectedLangauge: any;
  public equipmentlist: any;
  public Equipmentid: any;
  public itemdesc: any;
  public itemname: any;


  ngOnInit() {
    debugger
    this.selectedLangauge = localStorage.getItem("selectedLanguageID");
    this.GetEquipmentType(this.selectedLangauge);
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
      debugger;
      Swal.fire("Added Successfully");
    });
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

  public InsertDetailes() {
    var entity = {
      ItemType: this.Equipmentid,
      ItemName: this.itemname,
      ItemDescription: this.itemdesc,
      Photo: this.attachmentsurl[0]
    }
    this.fmsservice.InsertTenantInventorymaster(entity).subscribe(data => {
      if (data != null || data != undefined) {
        Swal.fire("Saved Successfully")
      }
    })
  }

}
