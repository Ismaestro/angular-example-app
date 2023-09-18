import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
import { APP_CONFIG, AppConfig } from '../../../../configs/app.config';
import { NetworkHelperService } from '~modules/shared/services/network-helper.service';
import { ApiError } from '~modules/shared/interfaces/api-error.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { userRoutes } from '~modules/user/shared/user-routes';
import { AlertId, AlertService } from '~modules/shared/services/alert.service';
import { CustomError } from '~modules/auth/shared/interfaces/custom-errors.enum';
import { AuthUserData } from '~modules/auth/shared/interfaces/register-data.interface';
import { authRoutes } from '~modules/auth/shared/auth-routes';
import { EventBCType, EventBusService } from '~modules/shared/services/event-bus.service';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import { NgIf } from '@angular/common';
import { FormErrorsComponent } from '~modules/shared/components/form-errors/form-errors.component';
import { LanguageSelectorComponent } from '~modules/auth/shared/components/language-selector/language-selector.component';
import { LowercaseDirective } from '~modules/shared/directives/lowercase.directive';
import { TrimDirective } from '~modules/shared/directives/trim.directive';
import { HttpClientModule } from '@angular/common/http';
import { IAppConfig } from '../../../../configs/app-config.interface';
import { EmailValidators } from '~modules/shared/validators/email.validators';

@Component({
  selector: 'app-log-in-page',
  templateUrl: './log-in-page.component.html',
  styleUrls: ['./log-in-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    HttpClientModule,
    RouterLink,
    FormErrorsComponent,
    ReactiveFormsModule,
    LanguageSelectorComponent,
    LowercaseDirective,
    TrimDirective,
    NgIf,
  ],
})
export class LogInPageComponent implements OnDestroy, AfterViewInit {
  authRoutes: typeof authRoutes;
  isButtonLogInLoading: boolean;
  logInForm: FormGroup;
  email: FormControl;
  password: FormControl;
  window: Window;
  destroy$: Subject<boolean> = new Subject<boolean>();

  // eslint-disable-next-line max-params
  constructor(
    private eventBusService: EventBusService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private renderer: Renderer2,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private alertService: AlertService,
    private utilService: NetworkHelperService,
    private authRepository: AuthRepository,
    private activatedRoute: ActivatedRoute,
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    private document: Document,
  ) {
    this.window = this.document.defaultView as Window;
    this.authRoutes = authRoutes;
    this.isButtonLogInLoading = false;
    this.email = new FormControl<string | null>('', [
      Validators.required,
      EmailValidators.isEmail(),
    ]);
    this.password = new FormControl<string | null>('', [Validators.required]);
    this.logInForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngAfterViewInit() {
    this.renderer.addClass(this.document.body, 'bg-linear');
  }

  sendForm() {
    if (this.logInForm.valid) {
      this.isButtonLogInLoading = true;

      const formValue = this.logInForm.getRawValue();
      this.authService
        .logIn(formValue.email, formValue.password)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: unknown) => {
            this.handleLogInResponse(response);
          },
          error: (error: ApolloError) => {
            this.handleLogInError(error);
          },
        });
    }
  }

  handleLogInResponse(response: unknown) {
    const origin = this.activatedRoute.snapshot.queryParams[AppConfig.customQueryParams.origin];

    const user = (response as AuthUserData).user;
    if (user) {
      if (origin) {
        this.window.location.href = decodeURIComponent(origin);
      } else {
        return this.router.navigate([userRoutes.dashboard]).then(() => {
          this.alertService.clearAll();
          this.eventBusService.eventsBC.postMessage({
            type: EventBCType.SESSION_CHANGED,
          });
          this.destroy$.next(true);
          return this.destroy$.unsubscribe();
        });
      }
    }
    return this.changeDetectorRef.detectChanges();
  }

  handleLogInError(error: ApolloError) {
    const networkError = this.utilService.checkNetworkError(error);
    if (!networkError) {
      const loginErrors = error.graphQLErrors;
      if (loginErrors.length) {
        for (const loginError of loginErrors) {
          const apiError = loginError as unknown as ApiError;
          if (apiError.code === CustomError.BAD_CREDENTIALS) {
            this.alertService.create(AlertId.BAD_CREDENTIALS);
          } else if (apiError.code === CustomError.BAD_REQUEST) {
            this.alertService.create(AlertId.GENERIC_ERROR, {
              code: CustomError.BAD_REQUEST,
            });
          }
        }
      }
    }
    this.isButtonLogInLoading = networkError;
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.renderer.removeClass(this.document.body, 'bg-linear');
  }
}
