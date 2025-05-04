import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink , TranslateModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly _AuthService = inject(AuthService);
  userData: any = null;
  dataUser: any = null;

  ngOnInit(): void {
    if (this._AuthService) {
      this._AuthService.saveUserData();
      this.userData = this._AuthService.userData;
      this.dataUser = this._AuthService.dataUser;
    }
  }
}
