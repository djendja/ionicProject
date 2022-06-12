import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required), 
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(7)])
    });
  }

  onRegister() {
    console.log(this.registerForm);
    this.loadingCtrl.create({message: 'Registering...'}).then((loadingEl) => {
      loadingEl.present();
      this.authService.register(this.registerForm.value).subscribe(resData => {
        console.log('registracija uspela', resData);
        this.loadingCtrl.dismiss();
        this.router.navigateByUrl('/cookbook/tabs/recommended-recipes');
      }, 
      errRes => {
        console.log(errRes);
        loadingEl.dismiss();
        let message = 'Greska';

        this.alertCtrl.create({
          header: 'Greska',
          message,
          buttons: ['OK']
        }).then((alert) => {
          alert.present();
        });

        this.registerForm.reset();

      })
    })
  }

}
