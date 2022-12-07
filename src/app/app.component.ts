import { Component } from '@angular/core';
import {AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Students', url: '/student', icon: 'school' },
    { title: 'Sponsors', url: '/sponsor', icon: 'pulse' },
    /* { title: 'Guides', url: '/guide', icon: 'id-card' },
    { title: 'Accountant', url: '/accounting', icon: 'calculator' },
    { title: 'Invoice', url: '/invoice', icon: 'receipt' }, */
    // { title: 'Login', url: '/auth', icon: 'log-in' }
    /* { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' }, */
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private authservice:AuthService,private router:Router) {}
  
  async logout(){
    await this.authservice.logout();
    this.router.navigateByUrl('/',{replaceUrl:true})
  }
  }
