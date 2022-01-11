import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ApiService } from '../api-service.service';
import { machine } from '../machine';


@Component({
  selector: 'app-next-product',
  templateUrl: './next-product.component.html',
  styleUrls: ['./next-product.component.scss']
})
export class NextProductComponent implements OnInit {




  @Output() dataToParent2 = new EventEmitter
  @Input() numberMachine=0;
  machine: machine[] = [];

  constructor(private ser: ApiService) { }


  ul() {
    this.ser.GetAllEmployees().subscribe(s => {

      this.machine = s.filter(a => a.PortGroup == "1" && a.MacheineNumber == this.numberMachine);
      console.log(this.machine[0].MacheineNumber)
    })


  }

  ngOnInit(): void {
   
      var scroll=0
      var id = setInterval(frame, 1);
      function frame() {
        if (200!=scroll) {
          document.documentElement.scrollTop = 300;
          scroll++
        } }
    
    this.ul()
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  close() {
    this.dataToParent2.emit(this.numberMachine);
  }


  stringToBoolean(str:boolean){
    
    switch(str){
      case true:  return "כן";break;
      case false:  return "לא";break;
        
    }
}



}
