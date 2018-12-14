import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://app.jot-bot/api/';

@Injectable()
export class AuthProvider {

  userData: any;
  token: any;

  constructor(
    public http:  HttpClient
  ) {
    console.log('Hello AuthProvider Provider');
  }
  
  login(credentials) {
    return new Promise((resolve, reject) => {
      this.http.post(
        apiUrl + 'auth/login', 
        JSON.stringify(credentials), 
        { 
          headers: new HttpHeaders().set('Content-Type', 'application/json') 
        }
      ).subscribe(res => {
        //console.log(res);
        //this.currentUser = res.json();
        this.token = JSON.stringify(res);
        localStorage.setItem('token', this.token);
        //console.log(this.token.access_token);
        this.http.get(apiUrl + 'auth/me', {
          headers: new HttpHeaders().set('Authorization','Bearer ' + JSON.parse(this.token).access_token)
        }).subscribe(res => {
          this.userData = JSON.stringify(res);
          localStorage.setItem('userData', this.userData);
        }, (err) => {
          reject(err);
        })
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      this.http.post(
        apiUrl + type,
        JSON.stringify(credentials),
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      ).subscribe(res => {
        //console.log(res);
        //this.currentUser = res.json();
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  isLoggedIn() {
    return localStorage.getItem('userData') != null;
  }
/*
  isAdmin() {
    return this.currentUser.role === 0;
  }
*/
  logout() {
    localStorage.clear();
  }
}
