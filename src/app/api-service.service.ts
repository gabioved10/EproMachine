import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { FaultLog } from './fault-log';
import { GimorEmploye } from './gimor-employe';
import { GimorLog } from './GimorLog';
import { KodFault } from './kod-fault';
import { machine } from './machine';
import { Psolim } from './psolim';
import { GimprStation } from './Station';
import { StopData } from './stop-data';
import { Users } from './users';



// import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
 UserId:number=0;
 UserName:number=0;

  // public flagForDetails = false;
  constructor(private http: HttpClient) {

  }
  GetAllEmployees(): Observable<machine[]> {
    return this.http.get<machine[]>(environment.urlmachine);
  }

  GetAllUsers(): Observable<Users[]> {

    return this.http.get<Users[]>(environment.urlmachine.substring(0, environment.urlmachine.length - 16) + "/Users.json");
  }

  PatchData(id: number): Observable<object> {

    // console.log(environment.urlmachine.substring(0, environment.urlmachine.length - 5) + "/" + id + ".json");



    return this.http.patch(environment.urlmachine.substring(0, environment.urlmachine.length - 5) + "/" + id + ".json", JSON.stringify({ "AppFlag": 1 }))

  }


  GetStopData(): Observable<StopData[]> {

    return this.http.get<StopData[]>(environment.urlmachine.substring(0, environment.urlmachine.length - 16) + "/stopData.json");


  }

  GetfaultLog(): Observable<FaultLog[]> {
    // console.log(environment.urlmachine.substring(0, environment.urlmachine.length - 16)  +"/FaultLog.json");
    return this.http.get<FaultLog[]>(environment.urlmachine.substring(0, environment.urlmachine.length - 16) + "/FaultLog.json");

  }
  // -----------
  GetKodfault(): Observable<KodFault[]> {
    console.log(environment.urlmachine.substring(0, environment.urlmachine.length - 16) + "/KodFault.json");
    return this.http.get<KodFault[]>(environment.urlmachine.substring(0, environment.urlmachine.length - 16) + "/KodFault.json");

  }

  GetsNameStation(): Observable<GimprStation[]> {

   return this.http.get<GimprStation[]>("https://epro-f862b-default-rtdb.firebaseio.com/GimorStation.json");

  }

  GetsNameEmploye(): Observable<GimorEmploye[]> {

    return this.http.get<GimorEmploye[]>("https://epro-f862b-default-rtdb.firebaseio.com/GimorEmployee.json");
 
   }

  GetsOneStation(machine:number): Observable<GimprStation> {
    return this.http.get<GimprStation>("https://epro-f862b-default-rtdb.firebaseio.com/GimorStation/"+machine+".json");
 
   }


  PostfaultLog(faultLog: FaultLog): Observable<FaultLog> {
    const headers = { 'Content-Type': 'application/json' };
    const body = faultLog;

    return this.http.post<FaultLog>(environment.urlmachine.substring(0, environment.urlmachine.length - 16) + "/FaultLog.json", body, { headers });


  }

  PostPsolim(psolim: Psolim): Observable<Psolim> {
    const headers = { 'Content-Type': 'application/json' };
    const body = psolim;
    debugger;
    return this.http.post<Psolim>(environment.urlmachine.substring(0, environment.urlmachine.length - 16) + "/PsolimData.json", body, { headers });


  }



  addStartGimor(start:GimorLog): Observable<GimorLog> {
       return this.http.post<GimorLog>("https://epro-f862b-default-rtdb.firebaseio.com/GimorLog.json",start);
  }

  getAllStartGimor(): Observable<GimorLog []> {
    
    return this.http.get<GimorLog[]>("https://epro-f862b-default-rtdb.firebaseio.com/GimorLog.json");
  }

  PatchStatus(machine:number,st:string): Observable<object> {
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + "  "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes()
    
    
    return this.http.patch("https://epro-f862b-default-rtdb.firebaseio.com/GimorStation/" + machine + ".json", JSON.stringify({ "status": +st ,"TimeStart": datetime}))
  }


}
