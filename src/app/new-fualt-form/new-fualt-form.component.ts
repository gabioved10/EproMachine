import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../api-service.service';
import { FaultLog } from '../fault-log';
import { KodFault } from '../kod-fault';




@Component({
  selector: 'app-new-fualt-form',
  templateUrl: './new-fualt-form.component.html',
  styleUrls: ['./new-fualt-form.component.css']
})
export class NewFualtFormComponent implements OnInit {
  @Input() numberMachine = 0;
  @Input() ID = 0;
  @Output() dataToParent3 = new EventEmitter;
  @Output() dataToParent2 = new EventEmitter;
  KodDescription: number = 0;
  KodFault: KodFault[] = [];
  today = new Date();
  selectedLevel: string  =""

  



  constructor(private ser: ApiService) { }

 
  
  ngOnInit(): void {
    this.faultLog.NumMachine = this.numberMachine;
    this.faultLog.ID = this.ID
    this.faultLog.ID++
    this.ser.GetKodfault().subscribe(s => {
      this.KodFault = s; console.log(s)
    })
    // this.ser.GetKodfault().subscribe(s=>{this.KodFault=s,console.log(s)})        


  }

  faultLog: FaultLog = {
    NumMachine: 0,
    OpenBy: 0,
    TimeOpen: "",
    TimeClose: "",
    KodTakala: 1,
    KodDescription: "",
    Comments: "",
    Owner: "",
    Better: 1,
    Stutos: 0,
    ID: 1,
    FixDescription: "",
    OpenOwner: 0
  }

  close() {
    this.dataToParent2.emit(this.numberMachine);
    this.dataToParent3.emit(this.numberMachine);
  }

  submitForm(f: NgForm) {

    var today = new Date();

    debugger;
    f.value.TimeOpen = today;
    f.value.KodDescription = this.GetDescription(f.value.KodTakala)
    f.value.OpenOwner = this.ser.UserName
   // console.log(f);
    this.ser.PostfaultLog(f.value).subscribe()
    this.faultLog.ID++
    // 
    // this.dataToParent2.emit(this.numberMachine);
    Swal.fire(
      '',
      'התקלה נשלחה בהצלחה',
      'success'
    )
    this.dataToParent3.emit(this.numberMachine);
    this.dataToParent2.emit(this.numberMachine);
  }


  GetDescription(kod: any) {
    // var k = this.KodFault.filter(s => s.KODFault == kod);
    for (let index = 0; index <  this.KodFault.length; index++) {
      const element =  this.KodFault[index];
       if (element.KODFault == kod)
        return element.NameFault;
     
    }
    return null;

  }


  selected(s:any){
    console.log(s)
  }

}
