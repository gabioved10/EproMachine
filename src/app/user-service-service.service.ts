import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserServiceServiceService {

  constructor(public afAuth: AngularFireAuth) { }

  getCurrentUser() {
    return new Promise(
      (resolve, reject) => {
        const user = firebase.auth().onAuthStateChanged(

          user => {
            
            user ? resolve(user) : resolve(null)
          }

        )
      }
    )
  }



} 
