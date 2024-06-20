import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TextFieldModule } from '@angular/cdk/text-field'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

import {
  FormsModule,
} from '@angular/forms';

export interface DialogData {
  userID: string;
}

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    TextFieldModule,
    MatFormFieldModule,
    MatInputModule,
    
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  userID: string | null;

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: DialogData,
  ) {
    this.userID = data.userID;
    
  }
}
