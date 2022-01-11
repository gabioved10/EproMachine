import { Component } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import {HttpClient,  HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthserviceServiceService } from './authservice-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EproMachine';

  sessionId: string = '';
  orgId: string = 'tXB3YvTZH86pf99hJ';
  apiKey: string = 'tXB3YvTZH86pf99hJ_gp';
  apiURL: string = 'https://api.briefery.com/api/validate';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router,private auth:AuthserviceServiceService) {
    
    // debugger;
    
    // this.route.queryParams.subscribe(params => {
    //   console.log(params);
    //   this.sessionId = params['sessionid'];
    //   console.log(this.sessionId);
    //   this.checkSessionId(this.sessionId);
    // })
  }


   checkSessionId(sessionId: string) {

    debugger;
  

    if (!sessionId) {
      return;
    }
    // console.log(sessionId);
    var sessionData: any = {
      'session': this.sessionId,
      'orgId': this.orgId
    };

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'apiToken': this.apiKey,
    });
    debugger;

    this.http.post(this.apiURL, sessionData, {headers: httpHeaders}).subscribe(
      (response: any) => {
        debugger;
        if (response.userId) {
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('validUntil', response.validUntil);

          this.router.navigate(['Machines']);
        } else {
          this.router.navigate(['Login']);
        }
      },
      (error: any) => {
        switch (error.status) {
          case 400:
            console.log('ERROR');
            console.log(error.error)
            this.router.navigate(['/unsecure']);
            break;
          default:
            console.log('ERROR');
            console.log(error.error)
            console.log(error.status)
            this.router.navigate(['/unsecure']);
            break;
        }
      }
    )
   }



  loginwithgoogle(){

    // firebase.auth().getRedirectResult().then(user => this.router.navigate(['Machines'])).catch(error => console.log(error));
    
    // if (!firebase.auth().currentUser) {
     
    //   this.auth.googleLogin();
    // }


    //this.auth.googleLogin();
   
    this.auth.googleLogin().then(user => this.router.navigate(['Machines'])).catch(error => console.log(error))
    
  }

  logout(){
    this.auth.logout().then(user => this.router.navigate(['']))

  }

  ngOnInit(): void {

    
  
 
    // this.loginwithgoogle()
  }

}
