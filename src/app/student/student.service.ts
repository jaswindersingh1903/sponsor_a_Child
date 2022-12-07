import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import {  Observable, throwError } from 'rxjs';
import { map, tap, switchMap,catchError } from 'rxjs/operators';

import { Firestore,collection,collectionData,doc,docData,addDoc,deleteDoc,updateDoc} from '@angular/fire/firestore';
import {Student} from './student';

import { Storage,ref,uploadString,deleteObject} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { getAuth } from "firebase/auth";



@Injectable({
  providedIn: 'root'
})

// private student:Student;
export class StudentService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  public auth = getAuth();
  public user = this.auth.currentUser;
  constructor(
    private httpClient: HttpClient,
    private firestore:Firestore,
    private storage:Storage 
    ) { }
 
  //getAllStudents
  getAllStudents():Observable<Student[]>
  {
    // alert('here')
    const StudentsCollection = collection(this.firestore,'students');
    return collectionData(StudentsCollection,{ idField:'id'}) as Observable<Student[]>;
  }

  //getAllStudents
  /* getAllStudentsForSponsor(sponsor_id):Observable<Student[]>
  {
    const StudentsCollection = collection(this.firestore,'students');
    return collectionData(StudentsCollection,{ idField:'id'}) as Observable<Student[]>;
  } */
  //get single student
  getStudentById(id):Observable<Student[]>
  {
    const StudentDoc = doc(this.firestore,`students/${id}`);
    return docData(StudentDoc,{ idField:'id'}) as Observable<Student[]>;
  }

  //add single student
  async AddStudent(student:any)
  {
    // console.log('service',student);
    const NewStudentDoc = collection(this.firestore,'students');
    return  await addDoc(NewStudentDoc,student);
    // return {'student_id':newStudent.id};
  }

  async uploadImage(cameraFile:Photo,docment_name,user_id) 
  {
    const path = `studentData/${user_id}/${docment_name}.png`;
    const storageRef = ref(this.storage,path);
    try 
    {
      await uploadString(storageRef,cameraFile.base64String,'base64');
      return true;
    } 
    catch (error) 
    {
      return false;
    }
  }
  //delete single student
  deleteStudentById(id)
  {
      const StudentDoc = doc(this.firestore,`students/${id}`);
      deleteDoc(StudentDoc) ;
  }

  //update single student
  updateStudentById(student:Student)
  {
    const StudentDoc = doc(this.firestore,`students/${student.id}`);
    return updateDoc (StudentDoc,{ student});
  }

  //update single student
  async sponsorStudentById(student:Student)
  {
    const StudentDoc = doc(this.firestore,`students/${student.id}`);
    return updateDoc (StudentDoc,{ sponsor_id: this.user.uid});
  }
  /* getAllStudents(): Observable <any>
  {
    rerurn
    return this.httpClient.get<Product[]>(environment.apiBaseUrl +'/products')
    .pipe(
      catchError(this.errorHandler)
    )
  } */

  /* getFeaturedProducts(): Observable<Product[]> 
  {
    return this.httpClient.get<Product[]>(environment.apiBaseUrl +'/products/featured')
    .pipe(
      catchError(this.errorHandler)
    )
  } */

  AddStudentOld(student): Observable <any>
  {
    console.log(student);
    return ;
    /* return this.httpClient.post(environment.apiBaseUrl +'/students', student, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    ) */
    return this.httpClient.post(environment.apiBaseUrl + 'students/add', { 'form_value': student }).pipe(
			map((data: any) => data),
		)
    /* return this.httpClient.post<Product>(environment.apiBaseUrl +'/products',product, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    ) */
  }
/* 
  find(id): Observable
  {
    return this.httpClient.get(environment.apiBaseUrl +'/products/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id, product): Observable
  {
    return this.httpClient.put(environment.apiBaseUrl +'/products/' +  id, JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id)
  {
    return this.httpClient.delete(environment.apiBaseUrl+'/products/' +  id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  } */
 

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
