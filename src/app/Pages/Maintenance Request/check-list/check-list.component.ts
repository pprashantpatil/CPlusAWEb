import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import Swal from 'sweetalert2';
import{DatePipe} from '@angular/common'

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit {
  public showorhidecontent: boolean;
  pickeroptions: NgDateRangePickerOptions;

  constructor(public fmsservice: FmsService, private datePipe:DatePipe) { }
  public pageMenuTitle;
  public checkList_PageTitle;
  public checkList_breadchrumb;
  public checkList_search;
  public checkList_name;
  public checkList_button_add;
  newTodoText: any;
  checkListName: any;
  CheckListTypeID: any;
  selectedlanguage: any;
  allcheckList: any;
  list: any;
  textsearch: any;

  showtable:any;
  Isempty:any;

  ngOnInit() {








    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetCheckListLanguageByLanguageID(this.selectedlanguage);
    this.fmsservice.GetCheckListDashboard(0).subscribe(data => {
      debugger

      this.allcheckList = data;
    })

    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,

    };

  }

  public GetCheckListLanguageByLanguageID(languageid) {
    this.fmsservice.GetCheckListLanguageByLanguageID(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.checkList_PageTitle = res[0].checkList_PageTitle;
        this.checkList_breadchrumb = res[0].checkList_breadchrumb;
        this.checkList_search = res[0].checkList_search;
        this.checkList_name = res[0].checkList_name;
        this.checkList_name = res[0].checkList_name;
        this.checkList_button_add = res[0].checkList_button_add;
      }
    )
  }

  changeStatus(evn) {

    if (evn.currentTarget.checked) {
      this.showorhidecontent = false;
    }
    else {
      this.showorhidecontent = true;
    }

  }

  Getlist(data) {
    debugger

    this.fmsservice.GetCheckListDashboard(data).subscribe(data => {
      debugger
      this.list = data;
    })

  }

  todoList = [];
  // addToDoItem(event, clickPlus){
  //   if (this.newTodoText != '') {
  //     if (clickPlus || event.which === 13) {
  //         this.todoList.push({
  //             text: this.newTodoText,

  //         });
  //         this.newTodoText = '';
  //     }
  // }
  // }

  addToDoItem() {
    debugger

    var list={
     
      'CheckListName': this.checkListName,
      'LanguageID': this.newTodoText
    }

    let validate = this.fmsservice.isEmpty(list);
if (validate.length > 0) {
  debugger
  this.Isempty = true;

  
  debugger
}


else{
  this.showtable=1


  this.todoList.push({
    text: this.newTodoText,

  });

  this.newTodoText = ''
  debugger

}

   
  }


  deletetext(value) {
    debugger


    var index = this.todoList.indexOf(value);
    debugger
    this.todoList.splice(index, 1);

  }

  insertchecklist() {
    debugger
    var entity = {
      'TypeID': 1,
      'CheckListName': this.checkListName,
      'ModifiedBy': 'Admin',
      'LanguageID': this.selectedlanguage
    }

    this.fmsservice.InsertCheckList(entity).subscribe(data => {
      if (data != undefined) {
        debugger
        this.CheckListTypeID = data;
        debugger
        this.saveCheckLists();
      }

    })

  }


  saveCheckLists() {
    debugger

    this.todoList.forEach(ele => {
      debugger
      var Entity1 = {
        'TypeID': 2,
        'CheckList': ele.text,
        'ModifiedBy': 'Admin',
        'CheckListTypeID': this.CheckListTypeID,
        'Order': 1
      }

      this.fmsservice.InsertCheckList(Entity1).subscribe(data => {
        debugger
        if (data != undefined) {

          debugger

          Swal.fire("Check List Saved Successfully")
          this.InsertLoginDetails(Entity1.CheckList);

          this.fmsservice.GetCheckListDashboard(0).subscribe(data => {
            debugger

            this.allcheckList = data;
          })

          this.clear();
        }
      })
    })
  }

  public InsertLoginDetails(CheckList) {
    debugger
    var obj = {
      "ApplicationName": ' CheckList ' + CheckList + ' Added',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "CheckList",
      "Action": 'Add New CheckList',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }
  clear() {
    debugger

    this.checkListName = ''
    this.todoList = null
  }




  DeleteCheckList(ID) {
    debugger

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover Checklist!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsservice.DeleteCheckList(ID).subscribe(data => {
          if (data != undefined) {
            Swal.fire(
              'Deleted!',
              'Your Checklist has been deleted.',
              'success'
            )

            this.fmsservice.GetCheckListDashboard(0).subscribe(data => {
              debugger

              this.allcheckList = data;
            })
          }
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Checklist is safe :)',
          'error'
        )
      }
    })



  }





}
