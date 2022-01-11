import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceServiceService {

  constructor(public afAuth: AngularFireAuth) { }

  googleLogin(){

    return new Promise(
      (resolve, reject) => {
        
        var provider = new firebase.auth.GoogleAuthProvider();  
        
        
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        provider.addScope('https://www.googleapis.com/auth/userinfo.email'); 

        this.afAuth.auth.signInWithPopup(provider).then(

          user => {
            resolve(user)
          },
          err => {
            reject(err)

          }

        )

      }
    )

    }

  googleLogin2() {
   
    return new Promise(
      (resolve, reject) => {
        
        
        let userEmail:string="gabioved10@gmail.com";
        let userPass:string = "GabiOved1969";

        this.afAuth.auth.signInWithEmailAndPassword(userEmail,userPass).then(

          user => {
            resolve(user)
          },
          err => {
            reject(err)

          }

        )

      }
    )
  }

  googleLoginRD(){


    var provider = new firebase.auth.GoogleAuthProvider();  
        
        
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.addScope('https://www.googleapis.com/auth/userinfo.email'); 
    
    firebase.auth().signInWithRedirect(provider);

    // return new Promise(
    //   (resolve, reject) => {
        
    //     var provider = new firebase.auth.GoogleAuthProvider();  
        
        
    //     provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    //     provider.addScope('https://www.googleapis.com/auth/userinfo.email'); 

    //     this.afAuth.auth.signInWithRedirect(provider).then(

    //       user => {
    //         resolve(user)
    //       },
    //       err => {
    //         reject(err)

    //       }

    //     )

    //   }
    // )

    }

  logout() {

    return new Promise(
      (resolve, reject) => {
        if (firebase.auth().currentUser) {
          this.afAuth.auth.signOut();
          resolve(true);

        }
        else {
          reject()
        }
      })
  }






}
