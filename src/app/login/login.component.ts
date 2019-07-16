import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '@app/_services';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    //private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if(false){
      this.router.navigate(["/"]);
    }
    //Reactive form declaration in constructor vs ngOnInit
}

  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges()
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    //why to get return url from route parameters?
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log(`return URL ${this.returnUrl}`);
  }
  // convenience getter for easy access to form fields
  get f(){return this.loginForm.controls;}

  onSumbit() {
    
    this.submitted = true;
   
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.authenticationService.login(this.f.username.value, this.f.password.value)
    .pipe(first())//why first
    .subscribe(
      data =>{
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.error = error;
        this.loading = false;

      }
      
    );





  }
}
