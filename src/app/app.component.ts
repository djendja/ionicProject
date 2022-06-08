import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService, private navCtrl: NavController ) {}
  onLogOut() {
    this.authService.logOut();
    this.navCtrl.navigateForward('/log-in');
  }
}
