import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../api-service.service';
import { machine } from '../machine';
import { StopData } from '../stop-data';
import { DatePipe } from '@angular/common'


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
        document.documentElement.scrollTop = 200;
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

