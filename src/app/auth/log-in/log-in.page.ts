import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  onLogIn(form: NgForm) {
    this.isLoading = true;

    if(form.valid) {
      this.authService.logIn(form.value).subscribe(resData => {
        console.log('uspesna prijava', resData);
        this.isLoading = false;
        this.router.navigateByUrl('/cookbook/tabs/recommended-recipes');
      },
      errRes => {
        console.log(errRes);
        this.isLoading = false;
        let message = "Incorrect email or password";

        this.alertCtrl.create({
          header: "Authentication failed",
          message,
          buttons: ["Okay"]
        }).then((alert) => {
          alert.present();
        })


        form.reset();

      }
      )
    }
  }

}
