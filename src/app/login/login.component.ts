import { Component, inject } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  private _service = inject(AuthService);

  byGoogle(): void {
    this._service
      .byGoogle();
  }
}
