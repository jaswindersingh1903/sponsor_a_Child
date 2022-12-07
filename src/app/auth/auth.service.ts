import { Injectable } from '@angular/core';
import {Sponsor} from '../sponsor/sponsor';
import { Firestore,collection,collectionData,docData,addDoc,deleteDoc,updateDoc,setDoc,doc} from '@angular/fire/firestore';

import { Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from '@angular/fire/auth'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
                private auth:Auth,  
               private firestore:Firestore
              ) { }
  
  async register({email,password}) 
  {
    return new Promise<any>((resolve, reject) => {
      createUserWithEmailAndPassword(this.auth,email,password).
      then(
        res =>
        {
          // this.AddSponsor(res.user)
          resolve({status:true,data:res.user});
        } , 
        err => 
        { 
          console.log('err');
          reject({status:false,err:err})
        }
      )
      
    });
    // try {
    //   const user = await createUserWithEmailAndPassword(this.auth,email,password).
    //   then(
    //     res =>
    //     {
    //       this.AddSponsor(res.user)
    //       resolve({status:true,data:res.user});
    //     }
    //   )
      
    // } catch (error) {
    //   console.log(error);

    //   return null;
    // }
    //https://www.youtube.com/watch?v=qWy9ylc3f9U
  }
  
  async  login({email,password}) 
  {
    /* signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log('success login');
        return {status:true};
       
      })
      .catch((error) => 
      {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log('login failed');

        return {status:false,err:error};

        
      }); */



      return new Promise<any>((resolve, reject) => 
      {
        signInWithEmailAndPassword(this.auth,email, password)
        .then(
          res => 
          {
            console.log('succss');
            resolve({status:true,data:res});
          }
          , 
          err => 
          { 
            console.log('err');
            reject({status:false,err:err})
          }
          )
      })
  }

  logout()
  {
    return  signOut(this.auth);
  }
  //add single student
  async AddSponsor(uid,Sponsor:any)
  {
    return new Promise<any>((resolve, reject) => 
    {
      setDoc(doc(this.firestore, "sponsors", uid), {
        Sponsor
      }).
      then(
          res =>
          {
            resolve({status:true,data:res});
          } , 
          err => reject({status:false,err:err})
        )
      

     
      
    });
  }
}
