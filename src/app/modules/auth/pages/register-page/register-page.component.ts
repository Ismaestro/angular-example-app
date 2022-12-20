import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '~modules/auth/shared/auth.service';
import { ApolloError } from '@apollo/client/errors';
import { Subject, takeUntil } from 'rxjs';
import { APP_CONFIG } from '../../../../configs/app.config';
import { UtilService } from '~modules/core/services/util.service';
import { ApiError } from '~modules/shared/interfaces/api-error.interface';
import { Router, RouterLinkWithHref } from '@angular/router';
import { ValidationService } from '~modules/core/services/validation.service';
import { AlertId, AlertService } from '~modules/core/services/alert.service';
import { CustomError } from '~modules/auth/shared/interfaces/custom-errors.enum';
import { AuthUserData } from '~modules/auth/shared/interfaces/register-data.interface';
import { authRoutes } from '~modules/auth/shared/auth-routes';
import { userRoutes } from '~modules/user/shared/user-routes';
import { EventBCType, EventBusService } from '~modules/core/services/event-bus.service';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import { DOCUMENT, NgIf } from '@angular/common';
import { FormErrorsComponent } from '~modules/shared/components/form-errors/form-errors.component';
import { LanguageSelectorComponent } from '~modules/auth/shared/components/language-selector/language-selector.component';
import { TrimDirective } from '~modules/shared/directives/trim.directive';
import { LowercaseDirective } from '~modules/shared/directives/lowercase.directive';
import { IAppConfig } from '../../../../configs/app-config.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterLinkWithHref,
    FormErrorsComponent,
    ReactiveFormsModule,
    LanguageSelectorComponent,
    TrimDirective,
    LowercaseDirective,
    NgIf,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterPageComponent implements OnDestroy {
  authRoutes: typeof authRoutes;
  isButtonRegisterLoading: boolean;
  showPassword: boolean;
  registerForm: FormGroup;
  firstName: FormControl;
  email: FormControl;
  password: FormControl;
  terms: FormControl;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  // eslint-disable-next-line max-params,max-lines-per-function
  constructor(
    private eventBusService: EventBusService,
    private formBuilder: FormBuilder,
    private authRepository: AuthRepository,
    private authService: AuthService,
    private renderer: Renderer2,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private alertService: AlertService,
    private utilService: UtilService,
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.authRoutes = authRoutes;
    this.renderer.addClass(this.document.body, 'bg-linear');
    this.showPassword = false;
    this.isButtonRegisterLoading = false;
    this.firstName = new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.email = new FormControl<string | null>('', [
      Validators.required,
      ValidationService.isEmailValidator(),
    ]);
    this.password = new FormControl<string | null>('', {
      validators: [Validators.minLength(6)],
      updateOn: 'change',
    });

    this.terms = new FormControl<boolean | null>(false, [Validators.requiredTrue]);
    this.registerForm = this.formBuilder.group({
      firstName: this.firstName,
      email: this.email,
      password: this.password,
      terms: this.terms,
    });
  }

  updatePassword() {
    this.password.updateValueAndValidity({ emitEvent: false });
  }

  sendForm() {
    if (this.registerForm.valid) {
      this.isButtonRegisterLoading = true;

      const formValue = this.registerForm.getRawValue();
      this.authService
        .register({
          firstName: formValue.firstName,
          email: formValue.email,
          password: formValue.password,
          terms: formValue.terms,
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: unknown) => {
            this.handleRegisterResponse(response);
          },
          error: (error: ApolloError) => {
            this.handleRegisterError(error);
          },
        });
    }
  }

  handleRegisterResponse(response: unknown) {
    const user = (response as AuthUserData).user;
    if (user) {
      return this.router.navigate([userRoutes.dashboard]).then(() => {
        this.alertService.clearAll();
        this.eventBusService.eventsBC.postMessage({
          type: EventBCType.SESSION_CHANGED,
        });
        this.destroy$.next(true);
        return this.destroy$.unsubscribe();
      });
    }
    return this.changeDetectorRef.detectChanges();
  }

  handleRegisterError(error: ApolloError) {
    const networkError = this.utilService.checkNetworkError(error);
    if (!networkError) {
      const registerErrors = error.graphQLErrors;
      if (registerErrors.length) {
        for (const registerError of registerErrors) {
          const apiError = registerError as unknown as ApiError;
          if (apiError.code === CustomError.USER_DUPLICATED) {
            this.alertService.create(AlertId.USER_DUPLICATED);
          }
        }
      }
    }
    this.isButtonRegisterLoading = networkError;
    this.changeDetectorRef.detectChanges();
  }

  togglePasswordType() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'bg-linear');
  }
}
