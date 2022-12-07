import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentPageRoutingModule } from './student-routing.module';

import { StudentPage } from './student.page';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { StudentService } from './student.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentPageRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    StudentPage,
    AddComponent,
    ViewComponent,
    EditComponent
  ],
  providers:[
    StudentService,
  ]
})
export class StudentPageModule {}
