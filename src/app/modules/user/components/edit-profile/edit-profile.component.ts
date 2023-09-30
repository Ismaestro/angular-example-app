import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '~modules/user/shared/user.model';
import { TrimDirective } from '~modules/shared/directives/trim.directive';
import { FormErrorsComponent } from '~modules/shared/components/form-errors/form-errors.component';
import { LowercaseDirective } from '~modules/shared/directives/lowercase.directive';
import { NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ApolloError } from '@apollo/client/errors';
import { AuthService } from '~modules/auth/shared/auth.service';
import { AlertId, AlertService } from '~modules/shared/services/alert.service';
import { NetworkHelperService } from '~modules/shared/services/network-helper.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, TrimDirective, FormErrorsComponent, LowercaseDirective, NgIf],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  @Input({ required: true }) user: User | undefined;

  destroy$: Subject<boolean> = new Subject<boolean>();

  isButtonProfileLoading: boolean;
  profileForm: FormGroup | undefined;
  firstname: FormControl | undefined;
  email: FormControl | undefined;

  // eslint-disable-next-line max-params
  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private alertService: AlertService,
    private utilService: NetworkHelperService,
  ) {
    this.isButtonProfileLoading = false;
  }

  ngOnInit(): void {
    this.firstname = new FormControl<string>(this.user?.firstname ?? '', [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.email = new FormControl<string>({ value: this.user?.email ?? '', disabled: true });

    this.profileForm = this.formBuilder.group({
      firstname: this.firstname,
      email: this.email,
    });
  }

  sendForm() {
    if (this.profileForm?.valid && this.user) {
      this.isButtonProfileLoading = true;

      const formValue = this.profileForm.getRawValue();
      this.authService
        .updateUser({
          ...this.user,
          ...{
            firstname: formValue.firstname,
          },
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.handleUpdateUserResponse();
          },
          error: (error: ApolloError) => {
            this.handleUpdateUserError(error);
          },
        });
    }
  }

  handleUpdateUserResponse() {
    this.alertService.create(AlertId.USER_SAVED);
    this.isButtonProfileLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  handleUpdateUserError(error: ApolloError) {
    const networkError = this.utilService.checkNetworkError(error);
    if (!networkError) {
      const registerErrors = error.graphQLErrors;
      if (registerErrors.length) {
        this.alertService.create(AlertId.UPDATE_USER_ERROR);
      }
    }
    this.isButtonProfileLoading = networkError;
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
