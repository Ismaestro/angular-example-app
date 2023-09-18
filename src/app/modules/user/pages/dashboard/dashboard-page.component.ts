import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
  TrackByFunction,
} from '@angular/core';
import { AuthRepository } from '~modules/auth/store/auth.repository';
import { Subject, takeUntil } from 'rxjs';
import { User } from '~modules/user/shared/user.model';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { AppConfig } from '../../../../configs/app.config';
import { userRoutes } from '~modules/user/shared/user-routes';
import { RouterLink } from '@angular/router';
import { HeroOrderField, HeroService, OrderDirection } from '~modules/hero/shared/hero.service';
import { Hero } from '~modules/hero/shared/hero.model';
import { ApolloError } from '@apollo/client/errors';
import { ApiError } from '~modules/shared/interfaces/api-error.interface';
import { CustomError } from '~modules/auth/shared/interfaces/custom-errors.enum';
import { AlertId, AlertService } from '~modules/shared/services/alert.service';
import { NetworkHelperService } from '~modules/shared/services/network-helper.service';
import { UserService } from '~modules/user/shared/user.service';
import { HeroModalComponent } from '~modules/user/components/hero-modal/hero-modal.component';
import { TrackBy } from '~modules/shared/classes/track-by';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, RouterLink, NgForOf, NgOptimizedImage, HeroModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  user: User | undefined;
  window: Window;
  publicHeroes: Hero[];
  trackHero: TrackByFunction<Hero>;

  // eslint-disable-next-line max-params
  constructor(
    private authRepository: AuthRepository,
    private heroService: HeroService,
    private userService: UserService,
    private utilService: NetworkHelperService,
    private alertService: AlertService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(LOCALE_ID) public locale: string,
    private document: Document,
  ) {
    this.trackHero = TrackBy.trackHero;
    this.window = this.document.defaultView as Window;
    this.publicHeroes = [];
  }

  ngOnInit() {
    this.authRepository.$user.pipe(takeUntil(this.destroy$)).subscribe(user => {
      if (user) {
        this.user = user;
        this.checkUserLanguage();
      }
    });

    this.loadPublicHeroes();
    this.changeDetectorRef.detectChanges();
  }

  checkUserLanguage() {
    if (this.user?.language !== this.locale) {
      this.window.location.href =
        (this.user?.language && this.user.language !== AppConfig.defaultLang
          ? `/${this.user.language}`
          : '') + userRoutes.dashboard;
    }
  }

  loadPublicHeroes() {
    this.heroService
      .searchHeroes({
        query: '',
        after: '',
        first: 5,
        orderBy: {
          direction: OrderDirection.DESC,
          field: HeroOrderField.USERS_VOTED,
        },
        skip: 0,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(heroes => {
        if (heroes) {
          this.publicHeroes = heroes;
          this.changeDetectorRef.detectChanges();
        }
      });
  }

  voteForHero(hero: Hero) {
    this.heroService
      .voteForHero(hero.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadPublicHeroes();
        },
        error: (error: ApolloError) => {
          const networkError = this.utilService.checkNetworkError(error);
          if (!networkError) {
            const voteForHeroErrors = error.graphQLErrors;
            if (voteForHeroErrors.length) {
              for (const voteForHeroError of voteForHeroErrors) {
                const apiError = voteForHeroError as unknown as ApiError;
                if (apiError.code === CustomError.DOUBLE_VOTED) {
                  this.alertService.create(AlertId.DOUBLE_VOTED);
                }
              }
            }
          }
          this.changeDetectorRef.detectChanges();
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
