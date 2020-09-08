import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ExportToCsv } from 'export-to-csv';
import { stringify } from '@angular/compiler/src/util';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  constructor(public fmsservice: FmsService, public router: Router, public datepipe: DatePipe) { }
  public pageMenuTitle;
  public asseT_PageTitle;
  public asseT_breadchrumb;
  public asseT_button_AddnewAsset;
  public asseT_Name;
  public asseT_Type;
  public asseT_Building;
  public asseT_Address;
  public asseT_Floor;
  public asseT_Next_Service_Due;
  public asseT_Warranty_Till;
  public asseT_Vendor_Contact_Name;
  public asseT_Vendor_Phone;
  public asseT_Actions;
  public AssetsSearch;
  public AssetsList: any;
  public Buildinglist;
  public FilteredAssetList;
  public confirmButtonText;
  public Attachmentlist;
  public Photoslist;
  public EquipmentID;
  public PhotosID;
  public Invoicelist;
  public Search;
  public searchBuildinglist;
  LoginTypeID: any;

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.fmsservice.GetFloor(localStorage.getItem('ProjectID')).subscribe(
      res => {
        debugger;
        this.Floorlist = res;
        //  this.FilteredGroceryList = this.GroceryList.filter(x => x.buildingID == this.BuildingID);
      }
    )
    this.GetAssetLanguageByLanguageID(selectedlanguage);
    this.GetEquipmentlist(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
  }

  UserRoleList: any;
  public GetUnit_MasterbyfloorID(FloorID) {
    this.fmsservice.GetUnit_MasterbyfloorID(FloorID).subscribe(
      res => {
        this.UserRoleList = res;
      }
    )
  }

  public GetAssetLanguageByLanguageID(languageid) {
    this.fmsservice.GetAssetLanguageByLanguageID(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.asseT_PageTitle = res[0].asseT_PageTitle;
        this.asseT_breadchrumb = res[0].asseT_breadchrumb;
        this.asseT_button_AddnewAsset = res[0].asseT_button_AddnewAsset;
        this.asseT_Name = res[0].asseT_Name;
        this.asseT_Type = res[0].asseT_Type;
        this.asseT_Building = res[0].asseT_Building;
        this.asseT_Address = res[0].asseT_Address;
        this.asseT_Floor = res[0].asseT_Floor;
        this.asseT_Next_Service_Due = res[0].asseT_Next_Service_Due;
        this.asseT_Warranty_Till = res[0].asseT_Warranty_Till;
        this.asseT_Vendor_Contact_Name = res[0].asseT_Vendor_Contact_Name;
        this.asseT_Vendor_Phone = res[0].asseT_Vendor_Phone;
        this.asseT_Actions = res[0].asseT_Actions;

      }
    )
  }
  Count: any;
  public GetEquipmentlist(languageid) {
    this.fmsservice.GetEquipmentlist(languageid).subscribe(
      res => {
        debugger;
        this.AssetsList = res;
        this.FilteredAssetList = this.AssetsList.filter(x => x.buildingID == localStorage.getItem('ProjectID'));
        this.Count = this.FilteredAssetList.length;
      }
    )
  }

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        this.Buildinglist = res;
        this.Buildinglist.sort(function (a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
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


  BuildingID;
  FloorName;
  Floorlist;
  floorID: any;

  public GetFloor(evn) {
    debugger;
    this.floorID = evn.target.value;

    if (this.floorID == 0) {
      this.FilteredAssetList = this.AssetsList.filter(x => x.buildingID == localStorage.getItem('ProjectID'));
      this.Count = this.FilteredAssetList.length;
    }
    else {
      this.FilteredAssetList = this.AssetsList.filter(x => x.floorID == this.floorID && x.buildingID == localStorage.getItem('ProjectID'));
      this.Count = this.FilteredAssetList.length;
      this.GetUnit_MasterbyfloorID(this.floorID);
    }
  }



  UnitID
  public GetUnitID(evn) {
    debugger;
    this.UnitID = evn.target.value;
  }

  public DeleteEquipment(ID) {
    debugger;
    //this.EventPlannerEntity.LanguageID=Number(localStorage.getItem('selectedLanguageID'))
    // let test = this.AssetsEntity;
    this.fmsservice.DeleteEquipment(ID).subscribe(res => {
      debugger;
      this.GetEquipmentlist(1);
    })
  }

  public EditAssets(evn) {
    debugger;
    let AssetsID = evn.id;
    this.router.navigate(['/UpdateAsset', AssetsID]);
  }

  public DeleteAssets(evn) {
    let AssetName = evn.equipmentname;

    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        if (this.confirmButtonText = "Yes, delete it!") {
          this.DeleteEquipment(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
        this.InsertLoginDetails(AssetName);
      }
    })
  }

  public InsertLoginDetails(AssetName) {
    debugger
    var obj = {
      "ApplicationName": 'Asset ' + AssetName + ' Deleted',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Assets",
      "Action": 'Delete  Asset',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  SelectedInvoiceID;
  public Invoice(evn) {
    debugger;
    this.SelectedInvoiceID = evn.id;
    this.GetEquipmentInvoice(evn.id);
  }


  NoImagesAvail = false;
  public GetEquipmentInvoice(ID) {
    this.fmsservice.GetEquipmentInvoice(ID).subscribe(
      res => {
        debugger;
        this.Invoicelist = res;
        if (res.length == 0) {
          this.NoImagesAvail = true;
        }
        else {
          this.NoImagesAvail = false;
        }
      }
    )
  }


  SelectedPhotosID
  public Photos(evn) {
    debugger;
    this.SelectedPhotosID = evn.id;
    this.GetEquipmentPhoto(evn.id);
  }


  public GetEquipmentPhoto(ID) {
    this.fmsservice.GetEquipmentPhoto(ID).subscribe(
      res => {
        this.Photoslist = res;

        if (res.length == 0) {
          this.NoImagesAvail = true;
        }
        else {
          this.NoImagesAvail = false;
        }
      }
    )
  }

  SelectedAttachmentID;
  public Attachment(evn) {
    this.SelectedAttachmentID = evn.id;
    this.GetEquipmentAttachment(evn.id);
  }

  public GetEquipmentAttachment(ID) {
    this.fmsservice.GetEquipmentAttachment(ID).subscribe(
      res => {
        this.Attachmentlist = res;
        if (res.length == 0) {
          this.NoImagesAvail = true;
        }
        else {
          this.NoImagesAvail = false;
        }

      }
    )
  }

  public InvoiceDetails(evn) {
    debugger;
    this.EquipmentID = evn.id;
  }

  public UploadPhotos(PhotosID) {
    debugger;
    this.PhotosID = PhotosID;
  }

  public AID;
  public UploadAssetsAttachments(AID) {
    this.AID = AID;
  }


  public AssetsInfoAttachments = [];
  onFilesAddedAttached(files: File[]) {
    debugger;
    this.AssetsInfoAttachments.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.AssetsInfoAttachments.push(files[i]);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  public UpdateAssetsAttachments() {
    if (this.AssetsInfoAttachments.length < 1) {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Please Drop some files',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      this.fmsservice.EquipmentAttachmentUpload(this.AssetsInfoAttachments).subscribe(res => {
        debugger;
        let UploadedAttachmentList = res;
        for (let i = 0; i < UploadedAttachmentList.length; i++) {
          let Entity = {
            ID: this.AID.id,
            Attachment: UploadedAttachmentList[i],
            pdf: 'null'
          }
          this.fmsservice.UpdateEquipmentAttachment(Entity).subscribe(
            res => {
              let SuccesAttachmentList = res;
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Your Documents has been saved',
                showConfirmButton: false,
                timer: 1500
              })
            }
          )
        }

      })
    }
  }

  public AssetsInvoice = [];
  onFilesAddedInvoice(files: File[]) {
    this.AssetsInvoice.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.AssetsInvoice.push(files[i]);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  public UpdateAssetsInvoice() {
    if (this.AssetsInvoice.length < 1) {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Please Drop some files',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      this.fmsservice.EquipmentInvoiceUpload(this.AssetsInvoice).subscribe(res => {
        debugger;
        let UploadedAttachmentList = res;
        for (let i = 0; i < UploadedAttachmentList.length; i++) {
          let Entity = {
            ID: this.EquipmentID,
            Attachment: UploadedAttachmentList[i],
            pdf: 'null'
          }
          this.fmsservice.UpdateEquipmentInvoice(Entity).subscribe(
            res => {
              let SuccesAttachmentList = res;
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Your Documents has been saved',
                showConfirmButton: false,
                timer: 1500
              })
            }
          )
        }

      })
    }
  }

  public AssetsPhotos = [];
  onFilesAddedPhotos(files: File[]) {
    this.AssetsPhotos.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.AssetsPhotos.push(files[i]);
    }
  }
  public UpdateAssetsPhotos() {
    if (this.AssetsPhotos.length < 1) {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Please Drop some files',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      debugger;
      this.fmsservice.EquipmentPhotoUpload(this.AssetsPhotos).subscribe(res => {
        debugger;
        let UploadedPhotosList = res;
        for (let i = 0; i < UploadedPhotosList.length; i++) {
          let jebhf = UploadedPhotosList[i].toString();
          let Entity = {
            ID: this.PhotosID,
            Photo: UploadedPhotosList[i].toString(),
            pdf: 'null'
          }
          this.fmsservice.UpdateEquipmentPhoto(Entity).subscribe(
            res => {
              debugger;
              let SuccesPhotosList = res;
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Uploaded Successfully',
                showConfirmButton: false,
                timer: 1500
              })
            }
          )
        }
      })
    }
  }


  public DeleteInvoice(evn) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        if (this.confirmButtonText = "Yes, delete it!") {
          this.DeleteEquipmentInvoice(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }
  public DeleteEquipmentInvoice(ID) {
    debugger;
    this.fmsservice.DeleteEquipmentInvoice(ID).subscribe(res => {
      debugger;
      this.GetEquipmentlist(1);
    })
  }
  public DeletePhotos(evn) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        if (this.confirmButtonText = "Yes, delete it!") {
          this.DeleteEquipmentPhoto(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }
  public DeleteEquipmentPhoto(ID) {
    debugger;
    this.fmsservice.DeleteEquipmentPhoto(ID).subscribe(res => {
      debugger;
      this.GetEquipmentlist(1);
    })
  }
  public DeleteAttachment(evn) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        if (this.confirmButtonText = "Yes, delete it!") {
          this.DeleteEquipmentAttachment(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }
  public DeleteEquipmentAttachment(ID) {
    debugger;
    this.fmsservice.DeleteEquipmentAttachment(ID).subscribe(res => {
      debugger;
      this.GetEquipmentlist(1);
    })
  }


  public FilterByBuildingname(evn) {
    debugger;
    if (evn.target.value == "none") {
      debugger;
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredAssetList = this.AssetsList;
      this.Count = this.FilteredAssetList.length;
    }
    else {
      debugger;
      let selectedBuilding = evn.target.value;
      this.FilteredAssetList = this.AssetsList.filter(x => x.buildingID == selectedBuilding);
      this.Count = this.FilteredAssetList.length;

      this.fmsservice.GetFloor(selectedBuilding).subscribe(
        res => {
          debugger;
          this.Floorlist = res;
          //  this.FilteredGroceryList = this.GroceryList.filter(x => x.buildingID == this.BuildingID);
        }
      )




    }
  }

  assetID;
  mainserhistry
  getassetID(data) {
    debugger
    this.assetID = data;

    this.fmsservice.GetmaintenanceservicesHistoryby_AssetID(this.assetID).subscribe(data => {
      debugger

      this.mainserhistry = data;
    })

  }

  // public FilterByBuildingname(evn) {
  //   debugger;
  //   this.searchBuildinglist = evn;
  //   if (evn == undefined) {
  //     this.FilteredAssetList = this.AssetsList;
  //   }
  //   else {
  //     let selectedBuilding = evn;
  //     this.FilteredAssetList = this.AssetsList.filter(x => x.buildingname == selectedBuilding);
  //   }
  //   document.getElementById("myDropdown").classList.toggle("show");
  // }

  // myFunction() {
  //   document.getElementById("myDropdown").classList.toggle("show");
  // }




  exporttoexcel() {
    debugger;

    var ExportData = [];
    for (let i = 0; i < this.FilteredAssetList.length; i++) {
      debugger;
      let singleData = {
        AssetName: String,
        Assetstype: String,
        buildingname: String,
        address: String,
        floor: String,
        nextServiceDue: "",
        warrantyTill: "",
        vendorName: String,
        vendorPhoneNo: String
      }
      singleData.Assetstype = this.FilteredAssetList[i].short;
      singleData.AssetName = this.FilteredAssetList[i].equipmentname;
      singleData.buildingname = this.FilteredAssetList[i].buildingname;
      singleData.address = this.FilteredAssetList[i].address;
      singleData.floor = this.FilteredAssetList[i].floor;
      singleData.nextServiceDue = this.datepipe.transform(this.FilteredAssetList[i].nextServiceDue, 'yyyy-MM-dd');
      singleData.warrantyTill = this.datepipe.transform(this.FilteredAssetList[i].warrantyTill, 'yyyy-MM-dd');
      singleData.vendorName = this.FilteredAssetList[i].vendorName;
      singleData.vendorPhoneNo = this.FilteredAssetList[i].vendorPhoneNo;
      ExportData.push(singleData);


      debugger
    }

    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Assets List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Assets List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    debugger
    csvExporter.generateCsv(ExportData);
  }


  //New Invoice 

  public AddInvoices() {
    debugger;
    this.UploadAssetsInvoiceNew(this.SelectedInvoiceID);

  }

  public AssetsInvoice1 = [];
  public UploadedInvoice = [];
  onFilesAddedInvoices(files: File[]) {
    debugger;
    this.AssetsInvoice1.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.AssetsInvoice1.push(files[i]);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Document Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  public UploadAssetsInvoiceNew(equipmentID) {
    this.fmsservice.EquipmentInvoiceUpload(this.AssetsInvoice1).subscribe(res => {
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
        Swal.fire('Invoice Attachment is Successfully Saved!');
      })
    }
  }



  // New Photos
  public AddPhotos() {
    debugger;
    this.UploadAssetsPhotosNew(this.SelectedPhotosID);
  }



  public AssetsPhotos3 = [];
  public UploadedPhotos = [];
  onFilesPhotos(files: File[]) {
    this.AssetsPhotos3.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.AssetsPhotos3.push(files[i]);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Document Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  public UploadAssetsPhotosNew(equipmentID) {
    this.fmsservice.EquipmentPhotoUpload(this.AssetsPhotos3).subscribe(res => {
      debugger;

      for (let i = 0; i < res.length; i++) {
        let PhotosEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.UploadedPhotos.push(PhotosEntity);
      }
      this.InsertEquipmentPhoto(equipmentID);
      //Swal.fire('Updated Successfully!');
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
        Swal.fire('Photo is Successfully Saved!');
      })
    }
  }


  // New Attachments

  public AddAttachments() {
    debugger;
    this.UploadAssetsAttachmentsNew(this.SelectedAttachmentID)
  }



  public UploadedAttachments = [];
  public AssetsAttachment = [];
  onFilesNewAttachments(files: File[]) {
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
  public UploadAssetsAttachmentsNew(equipmentID) {
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
        Swal.fire('Attachment is Successfully Saved!');
      })
    }
  }


}
