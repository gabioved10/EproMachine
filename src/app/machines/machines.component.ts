import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { machine } from '../machine';
import { ApiService } from '../api-service.service';
import { UserServiceServiceService } from '../user-service-service.service';
import { Router } from '@angular/router';
import { AuthserviceServiceService } from '../authservice-service.service';
import { Users } from '../users';
import { HostListener } from '@angular/core';
import Swal from 'sweetalert2';
import { GimorLog } from '../GimorLog';
import { GimprStation } from '../Station';
import { GimorEmploye } from '../gimor-employe';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {

  AllUsers: Users[] = [];
  users: Users[] = [];
  m: machine[] = [];
  mAll: machine[] = [];
  flageDetails: boolean = false;
  flagnextproduct: boolean = false;
  flageFautl: boolean = false;
  flagApprove: boolean = false;
  flagShowDetail: boolean = true;
  Group: number = 1;
  machineSelect: number = 0;
  postId: number = 0;
  userName: any;
  gl: GimorLog = new GimorLog();
  countInWork: number = 0;
  countInFoult: number = 0;
  countInTest: number = 0;
  countInNoWork: number = 0;
  countInWorkMantin: number = 0;
  countInFoultMantin: number = 0;
  GimprStationArry: GimprStation[] = []
  GimprOneStation: GimprStation | undefined;
  gimorEmploye: GimorEmploye[] = [];

  @HostListener("window:scroll", []) onWindowScroll() {
    // do some stuff here when the window is scrolled
    const verticalOffset = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;

  }


  constructor(private auth: AuthserviceServiceService, private ser: ApiService, private http: HttpClient, private UserService: UserServiceServiceService, private router: Router) { }




  ngOnInit(): void {

    this.ul();

    this.UserService.getCurrentUser().then(user1 => {
      this.userName = user1;
      this.ser.GetAllUsers().subscribe(user => {
        this.AllUsers = user,
        this.users = user.filter(item => {
          return item.EmailAddress == this.userName.email
        })
      })

      this.userName.userName
      // console.log(this.userName)
      // console.log(this.userName.email)

    })
  }


  Gimor() {

    this.ser.GetsNameStation().subscribe(gs => { this.GimprStationArry = gs; })
    this.ser.GetsNameEmploye().subscribe(ge => { this.gimorEmploye = ge; })

    this.ser.GetAllEmployees().subscribe(s => {
      let ul: any = document.getElementById("ul");
      ul.style.backgroundColor = "#e2a758fa";

      let mantin: any = document.getElementById("mantin");
      mantin.style.backgroundColor = "#e2a758fa";

      let gimor: any = document.getElementById("Gimor");
      gimor.style.backgroundColor = "rgb(253, 175, 7)";



      this.m = s
      this.m = this.m.filter(a => a.PortGroup == "3" && a.MacheineNumber != 0 && a.PortStatus != 0);
      this.sortResults('MacheineNumber', true);


    })

    this.Group = 2;

  }



  ul() {
    this.Group = 1;
    this.ser.GetAllEmployees().subscribe(s => {
      this.m = s
      this.mAll = s
      this.m = this.m.filter(a => a.PortGroup == "1" && a.MacheineNumber != 0 && a.PortStatus != 0);

      // console.log(this.m)
      this.sortResults('MacheineNumber', true);

      let ul: any = document.getElementById("ul");
      ul.style.backgroundColor = "rgb(253, 175, 7)";

      let mantin: any = document.getElementById("mantin");
      mantin.style.backgroundColor = "#e2a758fa";

      let gimor: any = document.getElementById("Gimor");
      gimor.style.backgroundColor = "#e2a758fa";

      this.countInWork = this.m.filter(a => a.PortGroup == "1" && a.MacheineNumber != 0 && a.PortStatus != 0 && a.MacheineSt == 1).length;
      this.countInFoult = this.m.filter(a => a.PortGroup == "1" && a.MacheineNumber != 0 && a.PortStatus != 0 && a.MacheineSt == 3).length;
      this.countInTest = this.m.filter(a => a.PortGroup == "1" && a.MacheineNumber != 0 && a.PortStatus != 0 && (a.MacheineSt == 0 && a.Quantity != 0)).length;
      this.countInNoWork = this.m.filter(a => a.PortGroup == "1" && a.MacheineNumber != 0 && a.PortStatus != 0 && (a.MacheineSt == 0 && a.Quantity != 0)).length;


    })


  }

  mantin() {
    this.ser.GetAllEmployees().subscribe(s => {

      let ul: any = document.getElementById("ul");
      ul.style.backgroundColor = "#e2a758fa";

      let mantin: any = document.getElementById("mantin");
      mantin.style.backgroundColor = "rgb(253, 175, 7)";

      let gimor: any = document.getElementById("Gimor");
      gimor.style.backgroundColor = "#e2a758fa";


      this.m = s
      this.m = this.m.filter(a => a.PortGroup == "2" && a.MacheineNumber != 0 && a.PortStatus != 0);
      this.sortResults('MacheineNumber', true);

      this.countInWorkMantin = this.m.filter(a => a.PortGroup == "2" && a.MacheineNumber != 0 && a.MacheineSt == 1).length;
      this.countInFoultMantin = this.m.filter(a => a.PortGroup == "2" && a.MacheineNumber != 0 && a.MacheineSt == 3).length;


    })

    this.Group = 3;
  }
  scroll(id: number) {

    console.log(`Location${id}`);
    let el: any = document.getElementById(`Location${id}`);
    let elem: any = document.getElementById('myBtn');
    elem.style.display = "block";

    el.scrollIntoView();
  }
  GetStutos(stat: any) {
    if (stat) {
      return ('- מאושר');
    } else {
      return ('');
    }

  }

  sortResults(prop: string, asc: boolean) {
    this.m.sort(function (a, b) {
      if (asc) {
        return (a["MacheineNumber"] > b["MacheineNumber"]) ? 1 : ((a["MacheineNumber"] < b["MacheineNumber"]) ? -1 : 0);
      } else {
        return (b["MacheineNumber"] > a["MacheineNumber"]) ? 1 : ((b["MacheineNumber"] < a["MacheineNumber"]) ? -1 : 0);
      }
    });
  }

  Details(x: number) {

    if (this.flagShowDetail == true) {

      this.machineSelect = x;
      this.flageFautl = false;
      this.flagnextproduct = false;
      this.flageDetails = true;
      let body: any = document.getElementById("body");
      body.style.opacity = '7%';

    }

    this.flagShowDetail = true;

  }

  fualtLog(x: number) {
    this.machineSelect = x;
    this.flageDetails = false;
    this.flagnextproduct = false;
    this.flageFautl = true;
    let body: any = document.getElementById("body");
    body.style.opacity = '7%';

  }

  nextproduct(x: number) {
    this.machineSelect = x;
    this.flageFautl = false;
    this.flageDetails = false;
    this.flagnextproduct = true;
    let body: any = document.getElementById("body");
    body.style.opacity = '7%';
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    let elem: any = document.getElementById('myBtn');
    elem.style.display = "none";
  }


  ChangeFlageFalse(Nm: any) {

    this.flageDetails = false;
    this.flagnextproduct = false;
    this.flageFautl = false;
    let body: any = document.getElementById("body");
    body.style.opacity = '100%';
    this.scroll(Nm);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    let elem: any = document.getElementById('myBtn');
    elem.style.display = "none";

  }


  async DownInstruction(nummachine: number, i: number) {

    this.flagShowDetail = false;
    var password
    await Swal.fire({
      title: 'הכנס סיסמא',
      input: 'textarea',
      icon: 'warning',

    }).then(function (result) {
      password = result.value
    })



    if (password == "2018") {
      let today = new Date();
      const headers = { 'Content-Type': 'application/json' };





      this.callPatchData(this.GetIdNumber(nummachine));
      const body = {
        "Machine": nummachine,
        "TriggerDate": today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2),
        "TriggerTime": today.getHours() + ":" + today.getMinutes() + ":" + ("0" + (today.getSeconds() + 1)).slice(-2),
        "workorderGoingDown": this.m[i].Instruction,
        "workorderGoingDownByUser": this.users[0].ID,
        "workorderGoingDownDateTime": 0,
        "workorderGoingUp": this.m[i].NextWorkorder,
        "fromAngular": 1,
        "apiKey": 0
      };

      this.http.post<any>('https://epro-f862b-default-rtdb.firebaseio.com/DownInstruction.json', body, { headers }).subscribe(data => {
        this.postId = data.id;
      });
      Swal.fire(
        'success!',
        'עודכן בהצלחה',
        'success'
      )

    }

    else {
      Swal.fire(
        'error',
        'סיסמתך שגויה :)',
        'error'
      )
    }

  }

  async UpInstruction(nummachine: number, i: number) {

    this.flagShowDetail = false;
    var password
    await Swal.fire({
      title: '  הכנס סיסמא להעלאת פקע',
      input: 'textarea',
      icon: 'warning',

    }).then(function (result) {
      password = result.value
    })

    if (password == "2018") {


      let today = new Date();
      const headers = { 'Content-Type': 'application/json' };

      this.callPatchData(this.GetIdNumber(nummachine));
      const body = {
        "Machine": nummachine,
        "TriggerDate": today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2),
        "TriggerTime": today.getHours() + ":" + today.getMinutes() + ":" + ("0" + (today.getSeconds() + 1)).slice(-2),
        "workorderGoingDown": this.m[i].Instruction,
        "workorderGoingDownByUser": this.users[0].ID,
        "workorderGoingDownDateTime": 0,
        "workorderGoingUp": this.m[i].NextWorkorder,
        "fromAngular": 1,
        "apiKey": 0
      };

      this.http.post<any>('https://epro-f862b-default-rtdb.firebaseio.com/UpInstruction.json', body, { headers }).subscribe(data => {
        this.postId = data.id;
      });

      Swal.fire(
        'success!',
        'עודכן בהצלחה',
        'success'
      )
    }

    else {
      Swal.fire(
        'error',
        'סיסמתך שגויה :)',
        'error'
      )
    }

  }

  logout() {
    Swal.fire({
      title: 'האם אתה בטוח שברצונך להתנתק מהמערכת?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ברצוני להתנתק',
      cancelButtonText: 'אמשיך לגלוש באתר'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'התנתקת',
          'success'
        )
        this.auth.logout().then(user => this.router.navigate(['']))
      }
    })


  }



 async ApproveProduct(nummachine: number, i: number) {

   var password
    this.flagShowDetail = false;

    await Swal.fire({
      title: 'הכנס סיסמא',
      input: 'textarea',
      icon: 'warning',

    }).then(function (result) {
      password = result.value
    })
    if (password == "2018") {
      let today = new Date();
      this.callPatchData(this.GetIdNumber(nummachine));
      const headers = { 'Content-Type': 'application/json' };
      const body = {
        "Machine": nummachine,
        "TriggerDate": today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2),
        "TriggerTime": today.getHours() + ":" + today.getMinutes() + ":" + ("0" + (today.getSeconds() + 1)).slice(-2),
        "workorderGoingDown": this.m[i].Instruction,
        "workorderGoingDownByUser": this.users[0].ID,
        "workorderGoingDownDateTime": 0,
        "workorderGoingUp": this.m[i].Instruction,
        "apiKey": 0,
        "fromAngular": 1
      };

      this.http.post<any>('https://epro-f862b-default-rtdb.firebaseio.com/ProductApproval.json', body, { headers }).subscribe(data => {
      
      
      this.postId = data.id;
      Swal.fire(
        'Deleted!',
        'בוצע',
        'success'
      )
      });
    }

    else {
      Swal.fire(
        'error',
        'סיסמתך שגויה :)',
        'error'
      )
    }




  }


  callPatchData(i: number) {

    this.ser.PatchData(i).subscribe(() => { this.ul(); })
  }

  SendRestDown() {


    let today = new Date();
    const headers = {
      "Content-Type": "application/json", "apiToken": "", "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Methods': '*', 'Access-Control-Allow-Headers': '*'
    };


    const body: any = {

      "StartDate": "19.10.2021",
      "StartTime": "12:38",
      "Owner": "643",
      "apiKey": "LoadMold",
      "OrderId": "8967",
      "Move": "Yes",
      "Action": "העבר להורדת תבנית"
    };
    // debugger;
    console.log(body);
    console.log(headers);

    this.http.post<any>('https://meteor.briefery.com/api/web', body, { headers }).subscribe(data => {
      console.log(data);
    });

  }







  GetIdNumber(nummachin: number) {
    for (let index = 0; index < this.mAll.length; index++) {
      if (this.mAll[index].MacheineNumber == nummachin) {
        return index;
      }

    }
    return 0;
  }

  //התחלת עבודה בחדר גימור
  start(MacheineNumber: number) {


    // this.ser.getAllStartGimor().subscribe(s => {
    //   this.gl.ID = ++s[s.length - 1].ID
    //   this.gl.Station = MacheineNumber;
    //   this.gl.Quntity = 0;
    //   this.gl.Start = new Date();
    //   this.gl.Stop = 0;
    //   this.ser.addStartGimor(this.gl).subscribe(s => alert("בוצע"))
    // })


    this.ser.PatchStatus(MacheineNumber, "1").subscribe(s => { alert("בוצע"); this.Gimor() })
    // this.ser.GetsNameStation().subscribe(gs => { this.GimprStationArry = gs; })

  }



  getNameEmploy(Num:any){

    for (let index = 0; index < this.AllUsers.length; index++) {
      if (this.AllUsers[index].ID == parseInt(Num)) {
        return this.AllUsers[index].userName;
      }

    }
    return 0;

  }
  // סיום עבודה חדר גימור
  finish(MacheineNumber: number, i: number) {

    let person = prompt("הכנס סיסמא :");
    if (person == "2018") {
    
    
    if (this.gl.Quntity == null) { alert("יש להזין כמות"); return }

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + "  "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes()

    this.ser.GetsOneStation(MacheineNumber).subscribe(gs => {
      this.GimprOneStation = gs;

      this.ser.PatchStatus(MacheineNumber, "0").subscribe() //עדכון סטטוס
      this.ser.GetsNameStation().subscribe(gs => { this.GimprStationArry = gs; })

      this.gl.Station = MacheineNumber;
      this.gl.Instruction = this.m[i].Instruction
      this.gl.Start = this.GimprOneStation?.TimeStart;
      this.gl.Stop = datetime;

      this.ser.addStartGimor(this.gl).subscribe(s => { alert("בוצע"), this.Gimor(), this.gl.Quntity = 0 })



    })
    Swal.fire(
      'Deleted!',
      'בוצע',
      'success'
    )
  
  }

  else {
    Swal.fire(
      'error',
      'סיסמתך שגויה :)',
      'error'
    )
  }



  }
  NameStation(MacheineNumber: any): any {
    return this.GimprStationArry[MacheineNumber].DESCRIPTION;
  }


  NameEmpl(EmpNumber: any): any {
    
    const result = this.gimorEmploye.filter(element => element.NumEmployee == EmpNumber);
    if(result[0] != null) return result[0].NameEmployee;
  
    else  return "";

  }





}
