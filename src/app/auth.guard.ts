import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceServiceService } from './authservice-service.service';
import { UserServiceServiceService } from './user-service-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private authService:AuthserviceServiceService,private router:Router, private UserService:UserServiceServiceService){}
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    
    return new Promise(
      (resolve, reject) => {
        this.UserService.getCurrentUser().then(user => {
          if (user) {
            return resolve(true);
          }
          else {
           this.router.navigate(['login']);
            return resolve(false);
          }
        })
      }
    )
  }
}
