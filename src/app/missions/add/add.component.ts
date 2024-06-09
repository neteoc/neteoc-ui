import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.less'
})
export class AddComponent {

}
