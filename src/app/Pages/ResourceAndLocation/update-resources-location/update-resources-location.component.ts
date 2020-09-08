import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-update-resources-location',
  templateUrl: './update-resources-location.component.html',
  styleUrls: ['./update-resources-location.component.css']
})
export class UpdateResourcesLocationComponent implements OnInit {

  public pageMenuTitle;
  public updateresourcelocation_PageTitle;
  public updateresourcelocation_breadchrumb;
  public updateresourcelocation_button_save;
  public updateresourcelocation_Name;
  public updateresourcelocation_Building;
  public updateresourcelocation_Location;
  public updateresourcelocation_Parent_Resource;
  public updateresourcelocation_Asset;
  public updateresourcelocation_Inventory;
  public updateresourcelocation_Attachment;
  public Buildinglist;
  public AssetsList;
  public buildingID;
  public Building;
  public InventoryList;
  paramID: any;
  resourcelist: any;
  actualAttachment: any;
  photourl: any;
  resourceID:any;

  FileName:any;
  FileType:any;
  base64textString:any;

  public filenamedetails = [];
  public filetypedetails = [];
  public base64textStringdetails = [];


  public ResourceEntity = {
    ID: 0,
    Name: "",
    BuildingID: 0,
    ParentResource: "",
    Location: "",
    EquipmentID: 0,
    InventoryID: 0,
    Attachment: "",
    LanguageID: 0,
   
  }

  constructor(public fmsservice: FmsService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    var list = this.activatedRoute.params.subscribe(data => {
      debugger
      this.paramID = data['id']
      debugger

      this.fmsservice.GetResourceLocationByID(this.paramID).subscribe(data => {
        debugger
        this.resourcelist = data;
        debugger
        this.ResourceEntity.Name = this.resourcelist[0].resourceName
        this.ResourceEntity.BuildingID = this.resourcelist[0].buildingID
        this.ResourceEntity.ParentResource = this.resourcelist[0].parentResource
        this.ResourceEntity.Location = this.resourcelist[0].location
        this.ResourceEntity.EquipmentID = this.resourcelist[0].equipmentID
        this.ResourceEntity.InventoryID = this.resourcelist[0].inventoryID
        this.photourl = this.resourcelist[0].attachment
        this.ResourceEntity.LanguageID = this.resourcelist[0].languageID
        this.ResourceEntity.Attachment = this.resourcelist[0].actualAttachment

        this.fmsservice.GetEquipmentlist(this.resourcelist[0].languageID).subscribe(
          res => {
            debugger;
            var list = res.filter(x => x.buildingID == this.resourcelist[0].buildingID);
            debugger
            this.AssetsList = list;
          }
        )

      })

    })




    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetupdateresourcelocationLanguageByLanguageID(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    // this.GetEquipmentlist(selectedlanguage,this.BuildingID);




    this.GetInventoryList(selectedlanguage);
  }


  handleFileSelect1(evt){
    debugger
        for(var i=0; i < evt.target.files.length; i++){
          debugger
          //console.log(evt);
          var File=evt.target.files[i];
          debugger
         // console.log(File);
           //let subStringData=File.substr(12,27);
          //console.log(X);
          var FileName = File.name.split('.')[0];
          var FileType =File.name.split('.')[1];
    
          debugger
          console.log(FileName);
         console.log(FileType);
         this.FileName=FileName;
         this.FileType=FileType;
        //this.filenamedetails.push({fname:this.FileName,ffile:this.FileType,base:this.base64textString});
         //this.filetypedetails.push(this.FileType);
         
         var files = evt.target.files;
          var file = files[i];
          if (files && file) {
            var reader = new FileReader();
            reader.onload =this._handleReaderLoaded1.bind(this);
            reader.readAsBinaryString(file);
    
           
        } 
        
        this.filenamedetails.push({fname:this.FileName,ffile:this.FileType,base:this.base64textStringdetails});
        debugger
      }
    
       
    }
    _handleReaderLoaded1(readerEvt) {
    
      debugger
      var binaryString = readerEvt.target.result;
             this.base64textString= btoa(binaryString);
             this.base64textStringdetails.push(this.base64textString)
             console.log( this.base64textString);       
    debugger
    
     }
    
     ///////////////end photo///////////////////////


  GetupdateresourcelocationLanguageByLanguageID(id) {
    this.fmsservice.GetupdateresourcelocationLanguageByLanguageID(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.updateresourcelocation_PageTitle = res[0].updateresourcelocation_PageTitle;
        this.updateresourcelocation_breadchrumb = res[0].updateresourcelocation_breadchrumb;
        this.updateresourcelocation_button_save = res[0].updateresourcelocation_button_save;
        this.updateresourcelocation_Name = res[0].updateresourcelocation_Name;
        this.updateresourcelocation_Building = res[0].updateresourcelocation_Building;
        this.updateresourcelocation_Location = res[0].updateresourcelocation_Location;
        this.updateresourcelocation_Parent_Resource = res[0].updateresourcelocation_Parent_Resource;
        this.updateresourcelocation_Asset = res[0].updateresourcelocation_Asset;
        this.updateresourcelocation_Inventory = res[0].updateresourcelocation_Inventory;
        this.updateresourcelocation_Attachment = res[0].updateresourcelocation_Attachment;
      }
    )
  }
  onFilesAddedAttached(files: File[]) {
    this.fmsservice.ResLocDocUpload(files).subscribe(res => {
      this.ResourceEntity.Attachment = res.toString();
    })
  }


  public InsertResourceLocation() {
    debugger;
    this.ResourceEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
    this.ResourceEntity.Attachment="attachment"
    let test = this.ResourceEntity;
    this.fmsservice.InsertResourceLocation(this.ResourceEntity).subscribe(res => {
      debugger;
      if(res!=undefined){

        this.resourceID=res

        this.InsertResourceDocument();
debugger
        Swal.fire('Resources location Successfully Saved!')
      }
     
    })
  }

  InsertResourceDocument(){
    debugger
   

    for (let j=0;j<this.filenamedetails.length;j++)
    {
      
      var obj = {
        'ResourceID': this.resourceID,
        "FileType": this.filenamedetails[j].ffile,
        "FileName": this.filenamedetails[j].fname,
        "modifieddate": new Date(),
        "Base64Data":this.filenamedetails[j].base[j],
        "ModifiedBy":'Test Name',
        "PDF":"pdf"
      }
      debugger;
      this.fmsservice.InsertResourceDocument(obj).subscribe((data) => {
        if (data!=null && data!=undefined) {
          debugger;
        
         
        }
      })
    }
  }

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;
      }
    )
  }


  public GetBuildingAssets(evn) {
    debugger;
    this.buildingID = evn.target.value;
    let LanguageID = localStorage.getItem('selectedLanguageID');
    this.fmsservice.GetEquipmentlist(LanguageID).subscribe(
      res => {
        debugger;
        var list = res.filter(x => x.buildingID == this.buildingID);
        debugger
        this.AssetsList = list;
      }
    )
  }

  // public GetEquipmentlist(languageid,BuildingID) {
  //   this.fmsservice.GetEquipmentlist(languageid).subscribe(
  //     res => {
  //       debugger;
  //       var list = res.filter(x=>x.buildingID==BuildingID);
  //       debugger
  //       this.AssetsList=list;
  //     }
  //   )
  // }

  public GetInventoryList(languageid) {
    this.fmsservice.GetInventoryList(languageid).subscribe(
      res => {
        debugger;
        this.InventoryList = res;
      }
    )
  }


  public UpdateResourceLocation() {
    debugger;
    this.ResourceEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
    this.ResourceEntity.Attachment="attachment"
    this.ResourceEntity.ID = this.paramID

    let test = this.ResourceEntity;
    this.fmsservice.UpdateResourceLocation(this.ResourceEntity).subscribe(res => {
      debugger;
      Swal.fire('Resources location Successfully Updated!')
    })
  }



}
