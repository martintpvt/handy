import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  responseData: any;
  userData = {
    "password": "",
    "name": "",
    "email": "",
    "password_confirmation": ""
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    this.authService.postData(this.userData, 'signup').then((result) => {
      this.responseData = result;
      if (this.responseData.data) {
        console.log(this.responseData);
        alert("Usuario creado exitosamente");
        this.navCtrl.push(LoginPage);
      }
      else { 
        alert("Error creando el usuario");
        console.log("User already exists");
      }
    }, (err) => {
      alert("Error en la api");
      console.log("Error de la api")
    });
  }

  login() {
    this.navCtrl.push(LoginPage);
  }
}
