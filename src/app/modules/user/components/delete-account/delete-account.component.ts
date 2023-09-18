import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormErrorsComponent } from '~modules/shared/components/form-errors/form-errors.component';
import { NgIf } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ApolloError } from '@apollo/client/errors';
import { AuthService } from '~modules/auth/shared/auth.service';
import { AlertId, AlertService } from '~modules/shared/services/alert.service';
import { NetworkHelperService } from '~modules/shared/services/network-helper.service';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import { CustomError } from '~modules/auth/shared/interfaces/custom-errors.enum';
import { authRoutes } from '~modules/auth/shared/auth-routes';
import { Router } from '@angular/router';
import { ApiError } from '~modules/shared/interfaces/api-error.interface';
import { User } from '~modules/user/shared/user.model';
import { TrimDirective } from '~modules/shared/directives/trim.directive';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, FormErrorsComponent, NgIf, FormsModule, TrimDirective],
})
export class DeleteAccountComponent implements OnDestroy {
  @Input({ required: true }) user: User | undefined;

  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  destroy$: Subject<boolean> = new Subject<boolean>();

  isButtonDeleteAccountLoading: boolean;
  numberOfHeroes: string;
  deleteAccountForm: FormGroup;
  password: FormControl;
  confirm: FormControl;
  email: FormControl;
  window: Window;

  // eslint-disable-next-line max-params
  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private authRepository: AuthRepository,
    private alertService: AlertService,
    private router: Router,
    private utilService: NetworkHelperService,
    private document: Document,
  ) {
    this.window = this.document.defaultView as Window;
    this.numberOfHeroes = '-';
    this.isButtonDeleteAccountLoading = false;
    this.password = new FormControl<string | null>('');
    this.email = new FormControl<string | null>('', [
      Validators.required,
      this.userEmailValidator.bind(this),
    ]);
    this.confirm = new FormControl<string | null>('', [this.confirmValidator.bind(this)]);
    this.deleteAccountForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
      confirm: this.confirm,
    });
  }

  userEmailValidator: ValidatorFn = (control): ValidationErrors | null =>
    control.value !== this.user?.email ? { notYourEmail: true } : null;

  confirmValidator: ValidatorFn = (control): ValidationErrors | null => {
    const textToDeleteElement = this.window.document.getElementById('text-to-write');
    return control.value !== textToDeleteElement?.innerText
      ? { confirmDelete: textToDeleteElement?.innerText }
      : null;
  };

  sendForm() {
    if (this.deleteAccountForm?.valid) {
      this.isButtonDeleteAccountLoading = true;

      const formValue = this.deleteAccountForm.getRawValue();
      this.authService
        .deleteAccount(formValue.password)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.handleDeleteAccountResponse();
          },
          error: (error: ApolloError) => {
            this.handleDeleteAccountError(error);
          },
        });
    }
  }

  handleDeleteAccountResponse() {
    this.isButtonDeleteAccountLoading = false;
    this.router.navigate([authRoutes.logout], {
      queryParams: { alertId: AlertId.ACCOUNT_DELETED },
    });
  }

  handleDeleteAccountError(error: ApolloError) {
    const networkError = this.utilService.checkNetworkError(error);
    if (!networkError) {
      const deleteAccountErrors = error.graphQLErrors;
      if (deleteAccountErrors.length) {
        for (const deleteAccountError of deleteAccountErrors) {
          const apiError = deleteAccountError as unknown as ApiError;
          if (apiError.code === CustomError.BAD_CREDENTIALS) {
            this.alertService.create(AlertId.CURRENT_PASSWORD_ERROR);
            this.closeModal?.nativeElement.click();
          }
        }
      }
    }
    this.isButtonDeleteAccountLoading = networkError;
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
