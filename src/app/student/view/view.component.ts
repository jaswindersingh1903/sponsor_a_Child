import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Student} from '../student'
// import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  @Input() student: Student;
  constructor(private modalCtrl: ModalController) {}

   cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() 
  {
    console.log('here',this.student);
  }
  getGender(gender){
    return gender=='1'?'Mr':'Ms';
  }
}
