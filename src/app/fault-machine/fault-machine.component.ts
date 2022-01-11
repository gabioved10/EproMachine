import {Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../api-service.service';
import { FaultLog } from '../fault-log';


@Component({
  selector: 'app-fault-machine',
  templateUrl: './fault-machine.component.html',
  styleUrls: ['./fault-machine.component.css']
})
export class FaultMachineComponent implements OnInit {

  @Input() numberMachine=0;
  @Output() dataToParent2 = new EventEmitter;
  faultLog:FaultLog[] = [];
  LastfaultLog:FaultLog[] = [];
  flagNewFault: boolean = false;
  machineSelect: number = 0;
  highestId:number=0;
  constructor(private ser: ApiService) { }

  addFualt(x:number){
    
    this.machineSelect = x;
    this.flagNewFault = true;
         
  }
updateFualt(numId:number){
  // var num = parseFloat((<Input>document.getElementById(numId.toString())).value);
  

}

  close() {
   
    this.dataToParent2.emit(this.numberMachine);
  }


  ChangeFlageFalse(Nm: any) {

    this.flagNewFault = false;
    
    let body: any = document.getElementById("body");
    body.style.opacity = '100%';
    // this.scroll(Nm);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    let elem: any = document.getElementById('myBtn');
    elem.style.display = "none";

  }

  ngOnInit(): void {
    var scroll=0
      var id = setInterval(frame, 2);
      function frame() {
        if (200!=scroll) {
          document.documentElement.scrollTop = 200;
          scroll++
        } }
      this.ser.GetfaultLog().subscribe(s => {
      this.faultLog=Object.values(s)
      this.LastfaultLog = this.faultLog.sort((a:any, b:any) => {return +b.ID - (+a.ID)})
      this.highestId = this.LastfaultLog[0].ID
      this.faultLog =  this.faultLog.filter(a =>  a.NumMachine == this.numberMachine),console.log(this.faultLog)
      });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    

  }

 

}
