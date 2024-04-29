import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserInfoService} from '../shared/service/user-info.service';
import {AuthenticationService} from '../shared/service/authentication.service';
import {Router} from '@angular/router';
import {catchError, of, Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent implements OnInit ,OnDestroy{
  @ViewChild('passInput') passwordInput: ElementRef;
  @ViewChild('eyeIcon') eyeIcon: ElementRef;

  createLoginForm: FormGroup;
  showPassword = false;
  showIcon = false;

  defaultOption: string = '374';
  selectedCountryCode: number = 374;
  options: any;
  phoneNumber: string;

  loginSubscription: Subscription;
  checkSubscription: Subscription;
  codeSubscription: Subscription;

  constructor(private userInfoService: UserInfoService,
              private authService: AuthenticationService,
              private route: Router) {
    this.createLoginForm = new FormGroup({
      'phoneNumber': new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
      'password': new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit() {
    this.codeSubscription = this.userInfoService.getSelectCode().subscribe(
      options => {
        this.options = options;
      }
    );
  }

  handleOptionSelected(countryCode: number) {
    this.selectedCountryCode = countryCode;
  }

  blurInput() {
    if (this.passwordInput.nativeElement.value.trim() !== '') {
      this.eyeIcon.nativeElement.style.display = 'block';
    } else {
      this.eyeIcon.nativeElement.style.display = 'none';
    }
  }

  focusInput() {
    if (this.passwordInput.nativeElement.value.trim() === '') {
      this.eyeIcon.nativeElement.style.display = 'block';
    }
  }

  togglePassword() {
    const inputEl = this.passwordInput.nativeElement;
    const siblingEl = this.eyeIcon.nativeElement;
    if (this.passwordInput.nativeElement) {
      if (inputEl.type === 'password') {
        siblingEl.classList.remove('fa-eye-slash');
        siblingEl.classList.add('fa-eye');
        inputEl.type = 'text'
      } else {
        siblingEl.classList.remove('fa-eye');
        siblingEl.classList.add('fa-eye-slash');
        inputEl.type = 'password'
      }
    }
  }

  onSubmit(event: SubmitEvent) {
    if (!this.showPassword) {
      return;
    }
    this.loginSubscription = this.authService.login({
      username: this.phoneNumber,
      password: this.createLoginForm.value.password
    }).pipe(catchError(error => {
      return of(error.error.message)
    })).subscribe(data => {
        if (data.token) {
          this.route.navigate(['/system'])
        } else {
          alert(data)
        }
      }
    )
  }

  onSubmitMobileNumber() {
    if (this.showPassword) {
      return; //prevent first call if pass. field is open. Not sure if there is any better solution.
    }
    this.phoneNumber = `${this.selectedCountryCode}${this.createLoginForm.value.phoneNumber}`
    this.checkSubscription = this.authService.checkPhone({username: this.phoneNumber})
      .pipe(catchError(error => {
        return of(error.error.message)
      })).subscribe(data => {
        if (data === 'Success') {
          this.showPassword = true;
        } else {
          alert(data)
        }
      })
  }
  ngOnDestroy():void {
    if (this.codeSubscription) {
      this.codeSubscription.unsubscribe();
    }
    if (this.checkSubscription) {
      this.checkSubscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
