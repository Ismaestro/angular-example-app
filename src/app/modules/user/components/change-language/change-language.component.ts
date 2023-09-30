import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ApolloError } from '@apollo/client/errors';
import { AuthService } from '~modules/auth/shared/auth.service';
import { AlertId, AlertService } from '~modules/shared/services/alert.service';
import { NetworkHelperService } from '~modules/shared/services/network-helper.service';
import { NgIf } from '@angular/common';
import { User } from '~modules/user/shared/user.model';
import { environment } from '~environments/environment';
import { AppConfig } from '../../../../configs/app.config';
import { userRoutes } from '~modules/user/shared/user-routes';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
})
export class ChangeLanguageComponent implements OnInit, OnDestroy {
  @Input({ required: true }) user: User | undefined;

  destroy$: Subject<boolean> = new Subject<boolean>();

  selectLanguageForm: FormGroup | undefined;
  language: FormControl | undefined;
  window: Window;

  // eslint-disable-next-line max-params
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private utilService: NetworkHelperService,
    private document: Document,
  ) {
    this.window = this.document.defaultView as Window;
  }

  ngOnInit() {
    this.language = new FormControl<string | null>(this.user?.language ?? AppConfig.defaultLang);
    this.selectLanguageForm = this.formBuilder.group({
      language: this.language,
    });

    this.language.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.sendForm();
    });
  }

  sendForm() {
    if (this.selectLanguageForm?.valid && this.user) {
      const formValue = this.selectLanguageForm.getRawValue();
      this.authService
        .updateUser({
          ...this.user,
          ...{
            language: formValue.language,
          },
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            const langToRedirect =
              formValue.language !== AppConfig.defaultLang ? `/${formValue.language}` : '';
            this.window.location.href = `${environment.domain}${langToRedirect}${userRoutes.myAccount}`;
          },
          error: (error: ApolloError) => {
            this.handleChangePasswordError(error);
          },
        });
    }
  }

  handleChangePasswordError(error: ApolloError) {
    const networkError = this.utilService.checkNetworkError(error);
    if (!networkError) {
      const changePasswordErrors = error.graphQLErrors;
      if (changePasswordErrors.length) {
        this.alertService.create(AlertId.UPDATE_USER_ERROR);
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
