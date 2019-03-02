import {Component, OnInit, ViewChild} from '@angular/core';
import {Hero} from '../../shared/hero.model';
import {HeroService} from '../../shared/hero.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {AppConfig} from '../../../../configs/app.config';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import {TranslateService} from '@ngx-translate/core';
import {UtilsHelperService} from '../../../../core/services/utils-helper.service';
import {HeroRemoveComponent} from '../../components/hero-remove/hero-remove.component';

@Component({
  selector: 'app-heroes-list-page',
  templateUrl: './heroes-list-page.component.html',
  styleUrls: ['./heroes-list-page.component.scss'],
  animations: [UtilsHelperService.fadeInOut()]
})

export class HeroesListPageComponent implements OnInit {

  heroes: Hero[];
  newHeroForm: FormGroup;
  canVote = false;
  error: string;
  @ViewChild('form') myNgForm; // just to call resetForm method

  constructor(private heroService: HeroService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private translateService: TranslateService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.canVote = HeroService.checkIfUserCanVote();

    this.newHeroForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.required, Validators.maxLength(30)]),
      'alterEgo': new FormControl('', [Validators.required, Validators.maxLength(30)])
    });

    this.onChanges();
  }

  ngOnInit() {
    this.heroService.getHeroes().subscribe((heroes: Array<Hero>) => {
      this.heroes = heroes;
    });
  }

  async createNewHero() {
    if (this.newHeroForm.valid) {
      this.heroService.createHero(new Hero(this.newHeroForm.value)).then(() => {
        this.myNgForm.resetForm();
      }, () => {
        this.error = 'errorHasOcurred';
      });
    }
  }

  like(hero: Hero) {
    this.canVote = HeroService.checkIfUserCanVote();
    if (this.canVote) {
      hero.like();
      this.heroService.updateHero(hero);
    }
  }

  deleteHero(hero: Hero) {
    const dialogRef = this.dialog.open(HeroRemoveComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroService.deleteHero(hero.id).then(() => {
          this.heroService.showSnackBar('heroRemoved');
        }, () => {
          this.error = 'heroDefault';
        });
      }
    });
  }

  seeHeroDetails(hero): void {
    if (hero.default) {
      this.router.navigate([AppConfig.routes.heroes + '/' + hero.id]);
    }
  }

  private onChanges() {
    this.newHeroForm.get('name').valueChanges.subscribe((value) => {
      if (value && value.length >= 3 && UtilsHelperService.isPalindrome(value)) {
        this.snackBar.open(this.translateService.instant(String(_('yeahPalindrome'))));
      } else {
        this.snackBar.dismiss();
      }
    });
  }
}
