import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../api-service.service';
import { machine } from '../machine';
import { StopData } from '../stop-data';
import { DatePipe } from '@angular/common'
import { Psolim } from '../psolim';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Output() dataToParent2 = new EventEmitter;
  @Input() numberMachine = 0;
  machine: machine[] = [];
  stopData: StopData[] = [];
  displayFoalts: Boolean = false;
  

  psolim:Psolim={
    Num_Instuction:0,
    Num_Fault:  0,
    Quantity:0,
    NUMEMP:0,
    DateFautl:"30/12/1899",
    Close: 0,
    TimeFautl:"15:00:00"

  };

  QuntityPsolim:Number=0;



  constructor(public datepipe: DatePipe, private ser: ApiService) { }


  ul() {
    this.ser.GetAllEmployees().subscribe(s => {

      this.machine = s.filter(a => a.PortGroup == "1" && a.MacheineNumber == this.numberMachine);
      // console.log(this.machine[0].MacheineNumber)
    })


  }

  ngOnInit(): void {
    var scroll=0
    var id = setInterval(frame, 2);
    function frame() {
      if (200!=scroll) {
        document.documentElement.scrollTop = 450;
        scroll++
      } }
      
    this.ul()

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.displayFoalts = false
  }
  close() {

    this.dataToParent2.emit(this.numberMachine);
  }

  StopData() {


    this.displayFoalts = !this.displayFoalts
    // debugger;
    this.ser.GetStopData().subscribe(s => {
      console.log(s[0].Num_Instuction);
      s.forEach(element => {
      if(element.Num_Instuction== this.machine[0].Instruction){
        this.stopData.push(element)
      }
      });
      this.stopData.sort(function (a, b) {
        return b.NumStop - a.NumStop;
      });

          // this.stopData = s.filter(a => a.Num_Instuction == this.machine[0].Instruction)
        console.log(this.stopData);
    })



  }

  PsolimUpdate(Instruction:any){


    if(this.QuntityPsolim == 0){

      Swal.fire(
        '',
        'לא הוזן כמות',
        'error'
      )

      
    }

    else{

      const today = new Date();
      let  dd= today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      let  tt= today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  
  
  
      this.psolim.Num_Instuction=Instruction;
      this.psolim.Num_Fault = 0;
      this.psolim.Quantity=this.QuntityPsolim;
      this.psolim.NUMEMP=this.ser.UserId;
      this.psolim.DateFautl =dd;
      this.psolim.Close = 0;
      this.psolim.TimeFautl = tt;
      
      this.ser.PostPsolim(this.psolim).subscribe();
      this.QuntityPsolim =0;
      Swal.fire(
        '',
        'העדכון נשלח בהצלחה',
        'success'
      )
    }
   
  }

 getStopTime(){
  
   var Cdate =  new Date()
  
  var Polse1= new Date(this.machine[0].PolseDate)

   return  this.diff_hours(Polse1,Cdate) 
 }

  diff_hours(dt2:Date, dt1:Date) 

  
 {

 

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
 
  return Math.abs(parseFloat(diff.toFixed(1)));
  
 }

  convertHMS(timeString: any, Qun: any) {

    const arr = timeString.split(":");

    if (Qun > 1) {

      const seconds = (arr[1] * 60 + (+arr[2])) / 3600 * Qun;
      return seconds.toFixed(1);
    }
    else {
      return 0;

    }

  }

}

