import { Component, OnInit, ViewChild } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { RoutesConfig } from '../../../../configs/routes.config';
import { Router } from '@angular/router';
import { UtilsService } from '../../../../shared/services/utils.service';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: { timing: 1, delay: 0 }
    }))])
  ]
})

export class LogInPageComponent implements OnInit {
  @ViewChild('loginForm') loginForm;

  logInForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private utilsService: UtilsService
  ) {
    this.logInForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  ngOnInit() {
  }

  getErrorMessage(field) {
    if (this[field]?.hasError('required')) {
      return 'You must enter a value';
    } else if (this[field]?.hasError('email')) {
      return 'Not a valid email';
    }
  }

  sendForm() {
    if (this.logInForm.valid) {
      const formValue = this.logInForm.value;
      this.authService.logIn(formValue.email, formValue.password)
        .subscribe((response: any) => {
          if (!response.errors) {
            this.router.navigate([RoutesConfig.routes.hero.myHeroes]);
          } else if (response.errors[0].code === 11000) {
            this.utilsService.showSnackBar('Nice! Let\'s create some heroes', 'info-snack-bar');
          }
        });
    }
  }

}
