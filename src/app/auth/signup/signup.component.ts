import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { AlertController,LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  new_sponsor:FormGroup;

  constructor(
    private fb:FormBuilder,
    private authservice:AuthService,
    private alert:AlertController,
    private loading:LoadingController,
    private router:Router
  ) { }

  ngOnInit() {
    this.new_sponsor = this.fb.group({
      first_name:['',[Validators.required] ],
      last_name:['',[Validators.required] ],
      displayName:[ ],
      phoneNumber:['',[Validators.required] ],
      email:['',[Validators.required,Validators.email] ],
      password:['',[Validators.required,Validators.minLength(6)]],
      photoURL:['https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'],
      role: 'student',
      student_id: false,
      is_deleted:false
    })
  }

  get first_name(){
    return this.new_sponsor.get('first_name');
  }
  get last_name(){
    return this.new_sponsor.get('last_name');
  }
  get email(){
    return this.new_sponsor.get('email');
  }
  get password(){
    return this.new_sponsor.get('password');
  }
  get phoneNumber(){
    return this.new_sponsor.get('phoneNumber');
  }
  // get displayname(){
  //   let displayName=  
  //   return displayName;
  // }

  async register()
  {
    this.new_sponsor.patchValue({
      displayName: this.new_sponsor.value.first_name+' '+this.new_sponsor.value.last_name
    });

    // const user  =  await this.authservice.register(this.new_sponsor.value);
    try 
    {
      await this.authservice.register(this.new_sponsor.value)
      .then(res => 
        {
          console.log(res);
          if(res)
          {
            console.log(res)
            if(res.data.uid)
            {
              let uid = res.data.uid
              this.authservice.AddSponsor(uid,this.new_sponsor.value);
            }
            
            // this.createDoc(res);
            this.router.navigate(['/sponsor']);
            // this.router.navigate(['/sponsor']);
          }
          else
          {
            this.presentAlert();

          }
        }, 
        err => 
        {
          console.log(err);
          if(err.status==false)
          {
             if (err.err.code == 'auth/email-already-in-use') 
              {
                this.presentAlert();
              }
            
          }
        });
      } catch (err) 
      {
        console.log(err);
      /* if (e.code == 'weak-password') 
      {
        throw AuthExceptions('The password provided is too weak.');
      } else if ( e.code == 'email-already-in-use') {
        throw AuthExceptions('The account already exists for that email.');
      } else if (e.code == 'operation-not-allowed') {
        throw AuthExceptions('There is a problem with auth service config :/');
      } else if (e.code == 'weak-password') {
        throw AuthExceptions('Please type stronger password');
      } else {
        print('auth error ' + e.toString());
      } */

    }
    
  }

  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Registeration Failed',
      subHeader: 'Email Already in use.',
      // message: 'Login Failed',
      buttons: ['OK'],
    });

    await alert.present();
  }

  createDoc(obj)
  {
    console.log(obj)
  }
}
