import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TrimDirective } from '~modules/shared/directives/trim.directive';
import { FormErrorsComponent } from '~modules/shared/components/form-errors/form-errors.component';
import { LowercaseDirective } from '~modules/shared/directives/lowercase.directive';
import { NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ApolloError } from '@apollo/client/errors';
import { AuthService } from '~modules/auth/shared/auth.service';
import { AlertId, AlertService } from '~modules/shared/services/alert.service';
import { NetworkHelperService } from '~modules/shared/services/network-helper.service';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import { ApiError } from '~modules/shared/interfaces/api-error.interface';
import { CustomError } from '~modules/auth/shared/interfaces/custom-errors.enum';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, TrimDirective, FormErrorsComponent, LowercaseDirective, NgIf],
})
export class ChangePasswordComponent implements OnDestroy {
  @ViewChild('btnReset') btnReset: ElementRef<HTMLElement> | undefined;

  destroy$: Subject<boolean> = new Subject<boolean>();

  isButtonChangePasswordLoading: boolean;
  showPassword: boolean;
  changePasswordForm: FormGroup;
  oldPassword: FormControl;
  newPassword: FormControl;

  // eslint-disable-next-line max-params
  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private authRepository: AuthRepository,
    private alertService: AlertService,
    private utilService: NetworkHelperService,
  ) {
    this.isButtonChangePasswordLoading = false;
    this.showPassword = false;

    this.oldPassword = new FormControl<string | null>('');
    this.newPassword = new FormControl<string | null>('', {
      validators: [Validators.minLength(6)],
      updateOn: 'change',
    });

    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      },
      { validators: this.checkPasswords },
    );
  }

  checkPasswords: ValidatorFn = (): ValidationErrors | null =>
    this.oldPassword.value === this.newPassword.value ? { samePasswords: true } : null;

  sendForm() {
    if (this.changePasswordForm?.valid) {
      this.isButtonChangePasswordLoading = true;

      const formValue = this.changePasswordForm.getRawValue();
      this.authService
        .changePassword(formValue.oldPassword, formValue.newPassword)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.handleChangePasswordResponse();
          },
          error: (error: ApolloError) => {
            this.handleChangePasswordError(error);
          },
        });
    }
  }

  handleChangePasswordResponse() {
    this.alertService.create(AlertId.PASSWORD_CHANGED);
    this.isButtonChangePasswordLoading = false;
    this.btnReset?.nativeElement.click();
    this.changeDetectorRef.detectChanges();
  }

  handleChangePasswordError(error: ApolloError) {
    const networkError = this.utilService.checkNetworkError(error);
    if (!networkError) {
      const changePasswordErrors = error.graphQLErrors;
      if (changePasswordErrors.length) {
        for (const changePasswordError of changePasswordErrors) {
          const apiError = changePasswordError as unknown as ApiError;
          if (apiError.code === CustomError.BAD_CREDENTIALS) {
            this.alertService.create(AlertId.CURRENT_PASSWORD_ERROR);
          }
        }
      }
    }
    this.isButtonChangePasswordLoading = networkError;
    this.changeDetectorRef.detectChanges();
  }

  updatePassword() {
    this.newPassword.updateValueAndValidity({ emitEvent: false });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
