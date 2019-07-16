import { Injectable } from '@angular/core';
import { Router, CanActivate, Route, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@app/_services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private roter:Router,
    private authenticatedService: AuthenticationService
    ){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const curentUser = this.authenticatedService.currentUserValue;
    if (curentUser){
        return true;
      }

    //not loget in - redirect to login page
    this.roter.navigate(['/login'],{});
    //this.roter.navigate(['/heroes'],{});
    return false;
  }
  
}
