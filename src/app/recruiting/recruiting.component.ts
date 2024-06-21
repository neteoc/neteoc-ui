import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DatePipe, CommonModule } from '@angular/common' 

@Component({
  selector: 'app-recruiting',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule
  ],
  templateUrl: './recruiting.component.html',
  styleUrls: ['./recruiting.component.scss']
})
export class RecruitingComponent implements OnInit {
  submissions: Observable<any[]> = new Observable<any[]>();

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.submissions = this.firestore.collection('recruiting', ref => 
      ref.where('status', '!=', 'archived').orderBy('timestamp', 'desc')
    ).valueChanges();
  }
}