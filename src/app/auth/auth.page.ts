import { Component, OnInit } from '@angular/core';
import { AuthService} from './auth.service';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { AlertController,LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  credentials:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authservice:AuthService,
    private alert:AlertController,
    private loading:LoadingController,
    private router:Router
  ) { }

  

  get email(){
    return this.credentials.get('email');
  }
  get password(){
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email:['',[Validators.required,Validators.email] ],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }

  async register()
  {
  
    const user  =  await this.authservice.register(this.credentials.value);
    
  }

  async login()//not is use-refer signup
  {
    // this.router.navigateByUrl('/student',{replaceUrl:true})
    this.authservice.login(this.credentials.value)
    .then(res => {
      console.log(res);
      if(res.status==true){
        // this.router.navigate(['/student']);
        this.router.navigate(['/sponsor']);
      }else{
        this.presentAlert();

      }
    }, err => {
      console.log(err);
      if(err.status==false){
        this.presentAlert();
      }
    })
  }

  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Login Failed',
      subHeader: 'Invalid username  or password',
      // message: 'Login Failed',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
