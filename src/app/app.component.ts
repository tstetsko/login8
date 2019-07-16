import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/_services';
import { User } from '@app/_models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tour of Heroes';
  currentUser: User;

  constructor(
    private roter: Router,
    private authenticationService: AuthenticationService){
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);    
  }

  logout(){
    this.authenticationService.logout();
    this.roter.navigate(['/login']);

  }
}
