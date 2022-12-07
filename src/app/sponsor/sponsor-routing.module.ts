import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SponsorPage } from './sponsor.page';
import { MyStudentsComponent } from './my-students/my-students.component';

import { StudentPage } from '../student/student.page'

const routes: Routes = [
  {
    path: '',
    component: MyStudentsComponent
  },
  {
    path: 'all-student',
    component: StudentPage
  },
  {
    path: 'my-students',
    component: MyStudentsComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorPageRoutingModule {}
