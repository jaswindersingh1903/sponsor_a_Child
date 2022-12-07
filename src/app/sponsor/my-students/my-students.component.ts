import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../student/student.service';
import { ModalController } from '@ionic/angular';
import { Student} from '../../student/student'
import { ViewComponent as ViewStudentModal } from '../../student/view/view.component';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-my-students',
  templateUrl: './my-students.component.html',
  styleUrls: ['./my-students.component.scss'],
})
export class MyStudentsComponent {
  students:any;
  student=[];
  // displayedColumns = ['Name', 'Age', 'Education','Deceased','Sponsor','Guide','Status','Action'];
  displayedColumns = ['Name', 'Age', 'Education','Deceased','Guide','Status','Action'];
  isModalOpen = false;
  public loaded = false;
  public cardView = false;
  public Searchterm;
  public statusFilter;

  public auth = getAuth();
  public user = this.auth.currentUser;

  constructor(
    private studentService:StudentService,
    public modalController: ModalController,  
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    ) {
      
      this.studentService.getAllStudents().subscribe(
        res =>
        {
          
          const result = res.filter((obj) => {
            
            return obj.sponsor_id == this.user.uid;
          });
          console.log(result)

          // this.students = res;
          this.students = result  ;
          setInterval(() => {
            this.loaded=true;
          }, 2000);
        } 
      )
    }


    
  EditStudent(id)
  {
    console.log(id);
    alert('edit clicked');
    /* this.studentService.updateStudentById(id).subscribe(
      res =>
      {
        console.log(res);
        // this.students = res;
      }
    ) */
  }


  async DeleteStudent(id)
  {
   
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait..',
      duration: 1500,
      spinner: 'circles'
    });
    loading.present();
    this.loaded=false;
    this.studentService.deleteStudentById(id);
    setInterval(() => {
      this.loaded=true;
    }, 3000);
  }

  //view student
  ViewStudent(indexOfelement)
  {
    console.log(this.students[indexOfelement])
    this.openIonModal(this.students[indexOfelement])
  }
  //modal to view student
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  
  async openIonModal(student) {
    const modal = await this.modalController.create({
      component: ViewStudentModal,
      componentProps: 
      {
        'student':student
      }
    });
   /*  modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        // this.modelData = modelData.data;
        // console.log('Modal Data : ' + modelData.data);
      }
    }); */
    return await modal.present();
  }

  Search(event)
  {
    
    const query = event.target.value.toString().toLowerCase();
    console.log(query);
    this.students = this.students.filter(d => d.toLowerCase().indexOf(query) > -1);
  }

  toogleCardView(value:boolean)
  {
    this.cardView = value;
  }

  getAge(dob)
  {
    let dobDataObj  = new Date(dob);
    let timeDiff = Math.abs(Date.now() - dobDataObj.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }

  handleChange(RowId,studentId) 
  {
    console.log(RowId,studentId);

  }

  result: string;
  async presentActionSheet(RowId,studentId) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Action',
      // subHeader: 'Sp',
      cssClass: 'student-action-class',
      // idClick:id,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler:await this.DeleteStudent.bind(this,studentId),
        },
        {
          text: 'Be a Sposnor',
          // handler:this.SponsorChild.bind(this, RowId,studentId),
            
        },
        {
          text: 'Be a Guide',
          // handler:this.GuideChild.bind(this, RowId,studentId),
            
        },
        {
          text: 'View More',
          handler:this.ViewStudent.bind(this, RowId),
            
        },
        {
          text: 'Edit',
          handler:this.EditStudent.bind(this,studentId),
            
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

  }
}
