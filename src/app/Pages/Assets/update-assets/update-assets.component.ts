import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { document } from 'ngx-bootstrap';


@Component({
  selector: 'app-update-assets',
  templateUrl: './update-assets.component.html',
  styleUrls: ['./update-assets.component.css']
})
export class UpdateAssetsComponent implements OnInit {
  public pageMenuTitle;
  public updateAsset_PageTitle;
  public updateAsset_breadchrumb;
  public updateAsset_button_save;
  public updateAsset_Asset_Name;
  public updateAsset_Asset_Type;
  public updateAsset_Building;
  public updateAsset_Address;
  public updateAsset_Floor;
  public updateAsset_Unit;
  public updateAsset_Parent_Asset;
  public updateAsset_Model_Name;
  public updateAsset_Serial_Number;
  public updateAsset_Purchase_Date;
  public updateAsset_Vendor_Name;
  public updateAsset_Vendor_Phone;
  public updateAsset_Vendor_Email;
  public updateAsset_Warranty_Till;
  public updateAsset_First_Service_Due;
  public updateAsset_Next_Service_Due;
  public updateAsset_Remind_Me_In;
  public updateAsset_Invoice;
  public updateAsset_Attachment;
  public updateAsset_Asset_Photo;
  public Buildinglist;
  public BuildingID;
  public BuildingAddress = "";
  public FloorList;
  public Equipmentlist;
  public ParentEquipmentlist;
  public Reminderlist;
  public Exitsing = false;
  public New;
  public Vendorslist;

  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  Assetid: any;
  //param2: string;

  public AssetsEntity = {
    Name: "",
    TypeID: 0,
    BuildingID: 0,
    Floor: 0,
    Unit: 0,
    ParentEquipmentID: 0,
    ModelNo: "",
    SerialNo: "",
    PurchaseDate: "",
    VendorName: "",
    VendorContactName: "",
    VendorPhoneNo: "",
    VendorEmailID: "",
    Warranty: "",
    WarrantyTill: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    FirstServiceDue: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    NextServiceDue: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    RemindTypeID: 0,
    Invoice: "NULL",
    Attachment: "NULL",
    PhotoURL: "NULL",
    Barcode: "NULL",
    AssetCosts:0,
    Depreciationpercentage:0
  }





  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) {
  }

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.BuildingID = localStorage.getItem('ProjectID');
    this.GetFloor(this.BuildingID);

    this.fmsservice.GetBuilding(1, this.BuildingID).subscribe(
      res => {
        debugger;
        this.BuildingAddress = res['address'];
        this.GetFloor(this.BuildingID);
        // this.GetEquipmentlist(LanguageID, this.BuildingID);
      }
    )
    this.AssetsEntity.BuildingID = this.BuildingID;
    this.GetUpdateAssetLanguageByLanguageID(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.GetEquipmentType(selectedlanguage);
    this.GetParentEquipmentmaster(selectedlanguage);
    this.GetRemindType(selectedlanguage);
    this.GetVendorList(selectedlanguage);
    this.route.params.subscribe(params => {
      debugger;
      this.Assetid = params['id'];
      if (params['id'] != undefined) {
        this.Assetid = params['id'];
        this.GetEquipment(this.Assetid);
        this.GetVendorList(selectedlanguage);
        this.GetEquipmentInvoice(this.Assetid);
        this.GetEquipmentPhoto(this.Assetid);
        this.GetEquipmentAttachment(this.Assetid);
      }

    }
    );
    //this.GetUnit_MasterbybID(this.BuildingID, this.FloorID);
  }

  public GetUpdateAssetLanguageByLanguageID(languageid) {
    this.fmsservice.GetUpdateAssetLanguageByLanguageID(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.updateAsset_PageTitle = res[0].updateAsset_PageTitle;
        this.updateAsset_breadchrumb = res[0].updateAsset_breadchrumb;
        this.updateAsset_button_save = res[0].updateAsset_button_save;
        this.updateAsset_Asset_Name = res[0].updateAsset_Asset_Name;
        this.updateAsset_Asset_Type = res[0].updateAsset_Asset_Type;
        this.updateAsset_Building = res[0].updateAsset_Building;
        this.updateAsset_Address = res[0].updateAsset_Address;
        this.updateAsset_Floor = res[0].updateAsset_Floor;
        this.updateAsset_Unit = res[0].updateAsset_Unit;
        this.updateAsset_Parent_Asset = res[0].updateAsset_Parent_Asset;
        this.updateAsset_Model_Name = res[0].updateAsset_Model_Name;
        this.updateAsset_Serial_Number = res[0].updateAsset_Serial_Number;
        this.updateAsset_Purchase_Date = res[0].updateAsset_Purchase_Date;
        this.updateAsset_Vendor_Name = res[0].updateAsset_Vendor_Name;
        this.updateAsset_Vendor_Phone = res[0].updateAsset_Vendor_Phone;
        this.updateAsset_Vendor_Email = res[0].updateAsset_Vendor_Email;
        this.updateAsset_Warranty_Till = res[0].updateAsset_Warranty_Till;
        this.updateAsset_First_Service_Due = res[0].updateAsset_First_Service_Due;
        this.updateAsset_Next_Service_Due = res[0].updateAsset_Next_Service_Due;
        this.updateAsset_Remind_Me_In = res[0].updateAsset_Remind_Me_In;
        this.updateAsset_Invoice = res[0].updateAsset_Invoice;
        this.updateAsset_Attachment = res[0].updateAsset_Attachment;
        this.updateAsset_Asset_Photo = res[0].updateAsset_Asset_Photo;
      }
    )
  }

  Isempty = false;
  EmailValid;
  PhoneNumberValid;
  public InsertEquipment() {
    debugger;
    //this.EventPlannerEntity.LanguageID=Number(localStorage.getItem('selectedLanguageID'))
    if (this.AssetsEntity.PurchaseDate < this.AssetsEntity.FirstServiceDue
      && this.AssetsEntity.FirstServiceDue < this.AssetsEntity.NextServiceDue
      && this.AssetsEntity.WarrantyTill > this.AssetsEntity.NextServiceDue) {

      let mandatoryfields = {
        Name: this.AssetsEntity.Name,
        TypeID: this.AssetsEntity.TypeID,
        buildingID: this.AssetsEntity.BuildingID,
        Address: this.BuildingAddress,
        Floor: this.AssetsEntity.Floor,
        PurchaseDate: this.AssetsEntity.PurchaseDate,
        // VendorName: this.AssetsEntity.VendorName,
        // VendorContactName: this.AssetsEntity.VendorContactName,
        // VendorPhone: this.AssetsEntity.VendorPhoneNo,
      
        RemindTypeID: this.AssetsEntity.RemindTypeID,
      }
      if (this.Exitsing) {
        mandatoryfields["VendorName"] = this.AssetsEntity.VendorName;
        mandatoryfields["VendorContactName"] = this.AssetsEntity.VendorContactName;
        mandatoryfields["VendorPhoneNo"] = this.AssetsEntity.VendorPhoneNo;

      }
      else {
        mandatoryfields["VendorName"] = this.AssetsEntity.VendorName;
        mandatoryfields["VendorPhoneNo"] = this.AssetsEntity.VendorPhoneNo;
        //  mandatoryfields["VendorEmailID"]=this.AssetsEntity.VendorEmailID;
      }

      let validate = this.fmsservice.isEmpty(mandatoryfields);
      if (validate.length > 0) {
        this.Isempty = true;
      } else {

        this.EmailValid = this.fmsservice.validateEmail(this.AssetsEntity.VendorEmailID);
        debugger;
        this.PhoneNumberValid = this.fmsservice.phonenumber(this.AssetsEntity.VendorPhoneNo);

        if (this.EmailValid == false || this.PhoneNumberValid == false) {

          debugger;
        } else {
          this.fmsservice.InsertEquipment(this.AssetsEntity).subscribe(res => {
            debugger;
            let name = this.AssetsEntity.Name;
            this.UploadAssetsAttachments(res);
            this.UploadAssetsInvoice(res);
            this.UploadAssetsPhotos(res);
            Swal.fire('Assets Successfully Saved!');
            this.Clear();
            this.InsertLoginDetails(name);
          })
        }

      }

    }
    else {
      Swal.fire("Please Check Purchase Date, First Service Due Date, Next Service Due Date");
    }


  }
  public InsertLoginDetails(name) {
    debugger
    var obj = {
      "ApplicationName": 'Asset ' + name + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Assets",
      "Action": 'Insert  new Asset',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }





  public Clear() {
    this.AssetsEntity.Name = "",
      this.AssetsEntity.TypeID = 0,
      this.AssetsEntity.BuildingID = 0,
      this.AssetsEntity.Floor = 0,
      this.AssetsEntity.Unit = 0,
      this.AssetsEntity.ParentEquipmentID = 0,
      this.AssetsEntity.ModelNo = "",
      this.AssetsEntity.SerialNo = "",
      this.AssetsEntity.PurchaseDate = "",
      this.AssetsEntity.VendorName = "",
      this.AssetsEntity.VendorContactName = "",
      this.AssetsEntity.VendorPhoneNo = "",
      this.AssetsEntity.VendorEmailID = "",
      this.AssetsEntity.Warranty = "",
      this.AssetsEntity.WarrantyTill = this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      this.AssetsEntity.FirstServiceDue = this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      this.AssetsEntity.NextServiceDue = this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      this.AssetsEntity.RemindTypeID = 0,
      this.AssetsEntity.Invoice = "Null",
      this.AssetsEntity.Attachment = "Null",
      this.AssetsEntity.PhotoURL = "Null",
      this.AssetsEntity.Barcode = ""
    this.BuildingAddress = "";
  }

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;
      }
    )
  }

  public GetBuildingAddress(evn) {
    debugger;
    this.BuildingID = evn.target.value;
    this.BuildingAddress = "";
    let LanguageID = localStorage.getItem('selectedLanguageID');
    this.fmsservice.GetBuilding(LanguageID, this.BuildingID).subscribe(
      res => {
        debugger;
        this.BuildingAddress = res['address'];
        this.GetFloor(this.BuildingID);
        // this.GetEquipmentlist(LanguageID, this.BuildingID);
      }
    )
  }

  public GetFloor(BuildingID) {
    debugger;
    this.fmsservice.GetFloor(BuildingID).subscribe(
      res => {
        debugger;
        this.FloorList = res;
      }
    )
  }


  public GetEquipmentType(languageid) {
    debugger;
    this.fmsservice.GetEquipmentType(languageid).subscribe(
      res => {
        debugger;
        this.Equipmentlist = res;
      }
    )
  }

  public GetParentEquipmentmaster(languageid) {
    debugger;
    this.fmsservice.GetParentEquipmentmaster(languageid).subscribe(
      res => {
        debugger;
        this.ParentEquipmentlist = res;
      }
    )
  }

  public GetRemindType(languageid) {
    debugger;
    this.fmsservice.GetRemindType(languageid).subscribe(
      res => {
        debugger;
        this.Reminderlist = res;
      }
    )
  }

  public GetVendorList(languageid) {
    debugger;
    this.fmsservice.GetVendorList(languageid).subscribe(
      res => {
        debugger;
        this.Vendorslist = res;
        let jjj = this.Vendorslist.filter(x => x.vendorName == this.AssetsEntity.VendorName);
        if (jjj.length > 0) {
          document.getElementById('inlineradio02').checked = true;
          this.Exitsing = false;
        }
        else {
          document.getElementById('inlineradio01').checked = true;
          this.Exitsing = true;
        }
      }
    )
  }

  public GetEquipment(ID) {
    debugger;
    this.fmsservice.GetEquipment(ID).subscribe(
      res => {
        debugger;
        this.AssetsEntity.Name = res["name"];
        this.AssetsEntity.TypeID = res["typeID"];
        this.AssetsEntity.BuildingID = res["buildingID"];
        this.AssetsEntity.Unit = res["unit"];
        this.AssetsEntity.ParentEquipmentID = res["parentEquipmentID"];
        this.AssetsEntity.ModelNo = res["modelNo"];
        this.AssetsEntity.SerialNo = res["serialNo"];
        this.AssetsEntity.PurchaseDate = this.datepipe.transform(res["purchaseDate"], 'yyyy-MM-dd');
        this.AssetsEntity.WarrantyTill = this.datepipe.transform(res["warrantyTill"], 'yyyy-MM-dd');
        this.AssetsEntity.VendorName = res["vendorName"];
        this.AssetsEntity.VendorContactName = res["vendorContactName"];
        this.AssetsEntity.VendorPhoneNo = res["vendorPhoneNo"];
        this.AssetsEntity.VendorEmailID = res["vendorEmailID"];
        this.AssetsEntity.Warranty = res["warranty"];
        this.AssetsEntity.FirstServiceDue = this.datepipe.transform(res["firstServiceDue"], 'yyyy-MM-dd');
        this.AssetsEntity.NextServiceDue = this.datepipe.transform(res["nextServiceDue"], 'yyyy-MM-dd');
        this.AssetsEntity.RemindTypeID = res["remindTypeID"];
        this.AssetsEntity.Invoice = res["invoice"];
        this.getFloor(this.AssetsEntity.BuildingID, res["floor"]);
        this.GetBuilding(1, res["buildingID"]);
        this.GetUnit_MasterbybID(this.AssetsEntity.BuildingID, res["floor"]);

      }
    )
  }

  public getFloor(BuildingID, floorID) {
    debugger;
    this.fmsservice.GetFloor(BuildingID).subscribe(
      res => {
        debugger;
        this.FloorList = res;
        this.AssetsEntity.Floor = floorID;

      }
    )
  }

  public UpdateEquipment() {
    debugger;

    let mandatoryfields = {
      Name: this.AssetsEntity.Name,
      TypeID: this.AssetsEntity.TypeID,
      buildingID: this.AssetsEntity.BuildingID,
      Address: this.BuildingAddress,
      Floor: this.AssetsEntity.Floor,
      PurchaseDate: this.AssetsEntity.PurchaseDate,
      // VendorName: this.AssetsEntity.VendorName,
      // VendorContactName: this.AssetsEntity.VendorContactName,
      // VendorPhone: this.AssetsEntity.VendorPhoneNo,
      unit: this.AssetsEntity.Unit,
      RemindTypeID: this.AssetsEntity.RemindTypeID,
    }
    if (this.Exitsing) {
      mandatoryfields["VendorName"] = this.AssetsEntity.VendorName;
      mandatoryfields["VendorContactName"] = this.AssetsEntity.VendorContactName;
      mandatoryfields["VendorPhoneNo"] = this.AssetsEntity.VendorPhoneNo;

    }
    else {
      mandatoryfields["VendorName"] = this.AssetsEntity.VendorName;
      mandatoryfields["VendorPhoneNo"] = this.AssetsEntity.VendorPhoneNo;
      //  mandatoryfields["VendorEmailID"]=this.AssetsEntity.VendorEmailID;
    }
    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    } else {
      this.EmailValid = this.fmsservice.validateEmail(this.AssetsEntity.VendorEmailID);
      debugger;
      this.PhoneNumberValid = this.fmsservice.phonenumber(this.AssetsEntity.VendorPhoneNo);

      if (this.EmailValid == false || this.PhoneNumberValid == false) {

        debugger;
      } else {

        this.fmsservice.UpdateEquipment(this.Assetid, this.AssetsEntity).subscribe(res => {
          debugger;
          Swal.fire('Assets Updated Successfully!');
          this.InsertLoginDetails1();

        })
      }
    }
  }
  public InsertLoginDetails1() {
    debugger
    var obj = {
      "ApplicationName": 'Asset ' + this.AssetsEntity.Name + ' Updated',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Assets",
      "Action": 'Update  Asset',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }



  public AssetsInvoice = [];
  public UploadedInvoice = [];
  onFilesAddedInvoice(files: File[]) {
    debugger;
    this.AssetsInvoice.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.AssetsInvoice.push(files[i]);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Document Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  public UploadAssetsInvoice(equipmentID) {
    this.fmsservice.EquipmentInvoiceUpload(this.AssetsInvoice).subscribe(res => {
      debugger;
      for (let i = 0; i < res.length; i++) {
        let InvoiceEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.UploadedInvoice.push(InvoiceEntity);
      }
      this.InsertEquipmentInvoice(equipmentID);
      // Swal.fire('Updated Successfully!');
    })
  }
  public InsertEquipmentInvoice(equipmentID) {
    for (let i = 0; i < this.UploadedInvoice.length; i++) {
      let entity = {
        EquipmentID: equipmentID,
        Attachment: this.UploadedInvoice[i].docpathURL1,
        ModifiedBy: 'Admin',
        pdf: 'Null'
      }
      this.fmsservice.InsertEquipmentInvoice(entity).subscribe(res => {
        debugger;
        //Swal.fire('Successfully Saved!');
      })
    }
  }



  public AssetsPhotos = [];
  public UploadedPhotos = [];
  onFilesAddedPhoto(files: File[]) {
    this.AssetsPhotos.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.AssetsPhotos.push(files[i]);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Document Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  public UploadAssetsPhotos(equipmentID) {
    this.fmsservice.EquipmentPhotoUpload(this.AssetsPhotos).subscribe(res => {
      debugger;

      for (let i = 0; i < res.length; i++) {
        let PhotosEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.UploadedPhotos.push(PhotosEntity);
      }
      this.InsertEquipmentPhoto(equipmentID);
      //Swal.fire('Updated Successfully!')
    })
  }
  public InsertEquipmentPhoto(equipmentID) {
    debugger;
    for (let i = 0; i < this.UploadedPhotos.length; i++) {
      let entity = {
        EquipmentID: equipmentID,
        Photo: this.UploadedPhotos[i].docpathURL1,
        ModifiedBy: 'Admin',
        pdf: 'Null'
      }
      this.fmsservice.InsertEquipmentPhoto(entity).subscribe(res => {
        debugger;
        this.Clear();
        //Swal.fire('Successfully Saved!');
      })
    }
  }

  public UploadedAttachments = [];
  public AssetsAttachment = [];
  onFilesAddedAttachment(files: File[]) {
    this.AssetsAttachment.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.AssetsAttachment.push(files[i]);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Document Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  public UploadAssetsAttachments(equipmentID) {
    this.fmsservice.EquipmentAttachmentUpload(this.AssetsAttachment).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        let AttachmentsEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.UploadedAttachments.push(AttachmentsEntity);

      }
      this.InsertEquipmentAttachment(equipmentID);
      //Swal.fire('Updated Successfully!')

    })
  }
  public InsertEquipmentAttachment(equipmentID) {
    for (let i = 0; i < this.UploadedAttachments.length; i++) {
      let entity = {
        EquipmentID: equipmentID,
        Attachment: this.UploadedAttachments[i].docpathURL1,
        ModifiedBy: 'Admin',
        pdf: 'Null'
      }
      this.fmsservice.InsertEquipmentAttachment(entity).subscribe(res => {
        debugger;
        //Swal.fire('Successfully Saved!');
      })
    }
  }

  public GetBuilding(ID, BuildingID) {
    //let LanguageID = localStorage.getItem('selectedLanguageID');
    this.fmsservice.GetBuilding(ID, BuildingID).subscribe(
      res => {
        debugger;
        this.BuildingAddress = res['address'];

      }
    )
  }


  public Existing(evn) {
    debugger;
    this.Exitsing = false;
  }
  public NewVendor(evn) {
    debugger;
    this.Exitsing = true;
    this.AssetsEntity.VendorName = "";
    this.AssetsEntity.VendorEmailID = "";
    this.AssetsEntity.VendorPhoneNo = "";
    this.AssetsEntity.VendorContactName = "";



  }

  public Invoicelist;
  public GetEquipmentInvoice(ID) {
    this.fmsservice.GetEquipmentInvoice(ID).subscribe(
      res => {
        this.Invoicelist = res;
      }
    )
  }

  public Photoslist;
  public GetEquipmentPhoto(ID) {
    this.fmsservice.GetEquipmentPhoto(ID).subscribe(
      res => {
        this.Photoslist = res;
      }
    )
  }

  public Attachmentlist;
  public GetEquipmentAttachment(ID) {
    this.fmsservice.GetEquipmentAttachment(ID).subscribe(
      res => {
        this.Attachmentlist = res;
      }
    )
  }
  public FloorID;

  public UnitByID(evn) {
    debugger;
    this.FloorID = evn.target.value;
    let ttt = this.FloorList.filter(x => x.id == this.FloorID);
    this.GetUnit_MasterbybID(ttt[0].buildingID, this.FloorID);
  }

  public Unitslist;
  public GetUnit_MasterbybID(BuildingID, FloorID) {
    this.fmsservice.GetUnit_MasterbybID(BuildingID, FloorID).subscribe(
      res => {
        // this.AssetsEntity.Unit=0;
        this.Unitslist = res;
      }
    )
  }

  public FilteredVendors;
  public VPhone;
  public VEmail;
  public VendorDetails(evn) {
    debugger;
    let VendorsName = evn.target.value;
    this.FilteredVendors = this.Vendorslist.filter(x => x.vendorName == VendorsName);
    this.AssetsEntity.VendorPhoneNo = this.FilteredVendors[0].phoneNo;
    this.AssetsEntity.VendorEmailID = this.FilteredVendors[0].emailID;
  }



}
