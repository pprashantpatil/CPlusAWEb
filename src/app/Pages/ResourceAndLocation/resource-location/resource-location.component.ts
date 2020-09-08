import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-resource-location',
  templateUrl: './resource-location.component.html',
  styleUrls: ['./resource-location.component.css']
})
export class ResourceLocationComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }

  public pageMenuTitle;
  public resourcelocation_PageTitle;
  public resourcelocation_breadchrumb;
  public resourcelocation_button_AddnewResource;
  public resourcelocation_button_ExportToexcel;
  public resourcelocation_Name;  
  public resourcelocation_Building;
  public resourcelocation_Parent_Resource;
  public resourcelocation_Location;
  public resourcelocation_Actions;
  
  public ResourceList: any;
  selectedlanguage:any;
  Buildinglist:any;
  buildingID:any;
  resourceInageslist:any;
  searchtext:any;

  FileName:any;
  FileType:any;
  base64textString:any;
  ImageID:any;
  
  
  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetresourcelocationLanguageByLanguageID(this.selectedlanguage);
    this.GetResourceLocation(this.selectedlanguage);

    this.fmsservice.GetBuildinglist(this.selectedlanguage).subscribe(data=>{
      debugger
      this.Buildinglist=data;
    })

  }

  getimage(BuildingID){
    debugger

    this.fmsservice.GetResourceDocument(BuildingID).subscribe(data=>{
      debugger

      this.resourceInageslist=data;
    })

  }


  


  GetresourcelocationLanguageByLanguageID(id) {
    this.fmsservice.GetresourcelocationLanguageByLanguageID(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.resourcelocation_PageTitle = res[0].resourcelocation_PageTitle;
        this.resourcelocation_breadchrumb = res[0].resourcelocation_breadchrumb;
        this.resourcelocation_button_AddnewResource = res[0].resourcelocation_button_AddnewResource;
        this.resourcelocation_button_ExportToexcel = res[0].resourcelocation_button_ExportToexcel;
        this.resourcelocation_Name = res[0].resourcelocation_Name;
        this.resourcelocation_Building = res[0].resourcelocation_Building;
        this.resourcelocation_Parent_Resource = res[0].resourcelocation_Parent_Resource;
        this.resourcelocation_Location = res[0].resourcelocation_Location;
        this.resourcelocation_Actions = res[0].resourcelocation_Actions;
      }

    )
  }

  public GetResourceLocation(languageid) {
    this.fmsservice.GetResourceLocation(languageid).subscribe(
      res => {
        debugger;
        this.ResourceList = res;
      }
    )
  }

  handleFileSelect(evt){
    //console.log(evt);
    var File=evt.target.value;
   // console.log(File);
     let subStringData=File.substr(12,27);
    //console.log(X);
    var FileName = subStringData.split('.')[0];
    var FileType =subStringData.split('.')[1];
    console.log(FileName);
   console.log(FileType);
   this.FileName=FileName;
   this.FileType=FileType;
   var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
  }

   
}
_handleReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
         this.base64textString= btoa(binaryString);
         console.log( this.base64textString);
 }


  DeleteResourceLocation(resourdeID){
    debugger

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover Resource Location!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsservice.DeleteResourceLocation(resourdeID).subscribe(data=>{
if(data!=undefined){
  Swal.fire(
    'Deleted!',
    'Your Resource Location has been deleted.',
    'success'
  )
  this.GetResourceLocation(this.selectedlanguage);
  
}
       })
       
    
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Resource Location is safe :)',
          'error'
        )
      }
    })



  }

  updateattachment(image){
    debugger

    this.ImageID=image
  }


  UpdatebuildingDocument(){
    debugger

    var filter={
      'ID': this.ImageID,
      'FileName':this.FileName,
      'FileType':this.FileType,
      'modifieddate':new Date(),
      'Base64Data' :this.base64textString,
      'pdf': "PDF"
    }

    this.fmsservice.UpdateResourceDocument(filter).subscribe(data=>{
      debugger
if(data!=undefined){
  Swal.fire("Resource Image Updated Successfully")
}
    
    })
   
  }

  

  DeleteResourceDocument(resourdeID){
    debugger

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Resource Image!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsservice.DeleteResourceDocument(resourdeID).subscribe(data=>{
if(data!=undefined){
  Swal.fire(
    'Deleted!',
    'Your Resource Image has been deleted.',
    'success'
  )
  this.GetResourceLocation(this.selectedlanguage);
  
}
       })
       
    
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Resource Image is safe :)',
          'error'
        )
      }
    })



  }


  FilterBuilding(buildingID){
    debugger
this.buildingID=buildingID.target.value

if(this.buildingID==''){

 this.fmsservice.GetResourceLocation(this.selectedlanguage).subscribe(
      res => {
        debugger;
        this.ResourceList = res;
      }
    )
}

else
{
  this.fmsservice.GetResourceLocation(this.selectedlanguage).subscribe(
    res => {
      debugger;
      this.ResourceList = res;

      var list=this.ResourceList.filter(X=>X.buildingID==this.buildingID)
      this.ResourceList=list;
    }
  )
}
}

}
