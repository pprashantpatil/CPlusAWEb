import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { document } from 'ngx-bootstrap';
import { stringify } from 'querystring';
@Component({
  selector: 'app-contractor-documents',
  templateUrl: './contractor-documents.component.html',
  styleUrls: ['./contractor-documents.component.css']
})
export class ContractorDocumentsComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }
  public ContractorID: any;
  public Date: any;
  public DocumentName: any;
  public DocumentsDescriptions: any;
  ngOnInit() {
    this.getvendorlist();
  }

  vendorlist
  getvendorlist() {
    this.fmsservice.Get_SubContractor().subscribe(res => {
      debugger;
      this.vendorlist = res.filter(x => x.companyID == localStorage.getItem('UserID'));
    })
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
  public InsertEquipmentPhoto(ID) {
    debugger;
    for (let i = 0; i < this.UploadedPhotos.length; i++) {
      let entity = {
        'ContractorDocID': ID,
        'PhotoURL': this.UploadedPhotos[i].docpathURL1,
      }
      this.fmsservice.InsertDocuments(entity).subscribe(res => {
        debugger;
      })
    }
  }



  public Save() {
    let Entity = {
      'ContractorID': this.ContractorID,
      'DocumentName': this.DocumentName,
      'Date': this.Date,
      'DocumentsDescriptions': this.DocumentsDescriptions,
      'CompanyID': localStorage.getItem('userid')
    }

    this.fmsservice.InsertContractorDocuments(Entity).subscribe(res => {
      debugger;
      this.UploadAssetsPhotos(res)
      Swal.fire('Successfully Saved!');

      location.href = "#/ContractorDocumentsDashboard";
    })

  }

}
