import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SponsorPageRoutingModule } from './sponsor-routing.module';

import { SponsorPage } from './sponsor.page';
import { MyStudentsComponent } from './my-students/my-students.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatTableModule } from '@angular/material/table';
import { StudentService } from '../student/student.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SponsorPageRoutingModule,
    Ng2SearchPipeModule,
    MatTableModule,
  ],
  declarations: [SponsorPage,MyStudentsComponent],
  providers:[
    StudentService,
  ]
})
export class SponsorPageModule {}
