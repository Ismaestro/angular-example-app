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
import { NetworkHelperService } from '~modules/shared/services/network-helper.service';
import { ApiError } from '~modules/shared/interfaces/api-error.interface';
import { Router, RouterLink } from '@angular/router';
import { AlertId, AlertService } from '~modules/shared/services/alert.service';
import { CustomError } from '~modules/auth/shared/interfaces/custom-errors.enum';
import { AuthUserData } from '~modules/auth/shared/interfaces/register-data.interface';
import { authRoutes } from '~modules/auth/shared/auth-routes';
import { userRoutes } from '~modules/user/shared/user-routes';
import { EventBCType, EventBusService } from '~modules/shared/services/event-bus.service';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import { NgIf } from '@angular/common';
import { FormErrorsComponent } from '~modules/shared/components/form-errors/form-errors.component';
import { LanguageSelectorComponent } from '~modules/auth/shared/components/language-selector/language-selector.component';
import { TrimDirective } from '~modules/shared/directives/trim.directive';
import { LowercaseDirective } from '~modules/shared/directives/lowercase.directive';
import { IAppConfig } from '../../../../configs/app-config.interface';
import { EmailValidators } from '~modules/shared/validators/email.validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterLink,
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
  firstname: FormControl;
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
    private utilService: NetworkHelperService,
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    private document: Document,
  ) {
    this.authRoutes = authRoutes;
    this.renderer.addClass(this.document.body, 'bg-linear');
    this.showPassword = false;
    this.isButtonRegisterLoading = false;
    this.firstname = new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(2),
    ]);
    this.email = new FormControl<string | null>('', [
      Validators.required,
      EmailValidators.isEmail(),
    ]);
    this.password = new FormControl<string | null>('', {
      validators: [
        Validators.minLength(4),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{4,}'),
      ],
      updateOn: 'change',
    });

    this.terms = new FormControl<boolean | null>(false, [Validators.requiredTrue]);
    this.registerForm = this.formBuilder.group({
      firstname: this.firstname,
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
        .signup({
          firstname: formValue.firstname,
          email: formValue.email,
          password: formValue.password,
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
