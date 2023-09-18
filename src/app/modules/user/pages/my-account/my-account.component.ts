import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import { Subject, takeUntil } from 'rxjs';
import { User } from '~modules/user/shared/user.model';
import { NgIf, UpperCasePipe } from '@angular/common';
import { APP_CONFIG } from '../../../../configs/app.config';
import { IAppConfig } from '../../../../configs/app-config.interface';
import { EditProfileComponent } from '~modules/user/components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from '~modules/user/components/change-password/change-password.component';
import { ChangeLanguageComponent } from '~modules/user/components/change-language/change-language.component';
import { DeleteAccountComponent } from '~modules/user/components/delete-account/delete-account.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    UpperCasePipe,
    EditProfileComponent,
    ChangePasswordComponent,
    ChangeLanguageComponent,
    DeleteAccountComponent,
  ],
})
export class MyAccountComponent implements OnInit, OnDestroy {
  user: User | undefined;
  public innerWidth: number;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authRepository: AuthRepository,
    private document: Document,
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
  ) {
    this.innerWidth = (this.document.defaultView as Window).innerWidth;
  }

  ngOnInit() {
    this.authRepository.$user.pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
