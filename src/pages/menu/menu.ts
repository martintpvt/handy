import { AuthProvider } from './../../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, App } from 'ionic-angular';
import { ThrowStmt } from '@angular/compiler';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  rootPage: any;
  pages = [];
  username = '';

  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  ionViewWillEnter() {
    this.pages = [
      { title: 'Profile', page: 'ProfilePage', icon: 'home' },
      { title: 'Product', page: 'ProductPage', icon: 'home' },
      { title: 'Payment', page: 'PaymentPage', icon: 'home' }
    ];
    this.openPage('ProfilePage');
    this.username = this.authProvider.currentUser.name;
  }

  logout() {
    this.authProvider.logout();
    this.appCtrl.getRootNav().setRoot('LoginPage');
  }

  openPage(page) {
    this.nav.setRoot(page);
  }

  ionViewCanEnter() {
    return this.authProvider.isLoggedIn();
  }
}
