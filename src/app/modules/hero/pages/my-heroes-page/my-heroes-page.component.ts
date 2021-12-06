import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../../shared/hero.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HeroRemoveComponent } from '../../components/hero-remove/hero-remove.component';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { ROUTES_CONFIG } from '../../../../configs/routes.config';
import { CookieService } from '@gorniv/ngx-universal';
import { HeroService } from '../../shared/hero.service';
import { UtilsHelperService } from '../../../core/services/utils-helper.service';
import { UserService } from '../../../user/user.service';
import { User } from '../../../user/shared/user.model';
import { UtilsService } from '../../../../shared/services/utils.service';

@Component({
  selector: 'app-my-heroes-page',
  templateUrl: './my-heroes-page.component.html',
  styleUrls: ['./my-heroes-page.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: { timing: 1, delay: 0 }
    }))])
  ]
})

export class MyHeroesPageComponent implements OnInit {

  user: User;
  newHeroForm: FormGroup;
  canVote = false;
  error: boolean;
  realName: FormControl;
  alterEgo: FormControl;

  @ViewChild('form', { static: false }) myNgForm; // just to call resetForm method

  constructor(private heroService: HeroService,
              private userService: UserService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private utilsService: UtilsService,
              private router: Router,
              private formBuilder: FormBuilder,
              private cookieService: CookieService,
              @Inject(ROUTES_CONFIG) public routesConfig: any) {
    this.canVote = this.heroService.checkIfUserCanVote();

    this.realName = new FormControl('', [Validators.required, Validators.maxLength(30)]);
    this.alterEgo = new FormControl('', [Validators.required, Validators.maxLength(30)]);
    this.newHeroForm = this.formBuilder.group({
      realName: this.realName,
      alterEgo: this.alterEgo
    });

    this.onChanges();
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getMe({ fetchPolicy: 'no-cache' }).subscribe((user: User) => {
      this.user = user;
    });
  }

  createNewHero() {
    if (this.newHeroForm.valid) {
      this.heroService.createHero(new Hero(this.newHeroForm.value)).subscribe((response) => {
        if (!response.errors) {
          this.myNgForm.resetForm();
          this.utilsService.showSnackBar('Hero created', 'info-snack-bar');
          this.loadUser();
        }
      });
    }
  }

  like(hero: Hero) {
    this.canVote = this.heroService.checkIfUserCanVote();
    if (this.canVote) {
      hero.like();
      this.cookieService.put('votes', '' + (Number(this.cookieService.get('votes') || 0) + 1));
      this.heroService.updateHero(hero);
    } else {
      this.snackBar.open('Can\'t vote anymore', '', { duration: 1000 });
    }
  }

  deleteHero(hero: Hero) {
    const dialogRef = this.dialog.open(HeroRemoveComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroService.removeHero(hero.id).subscribe((response) => {
          if (!response.errors) {
            this.utilsService.showSnackBar('Hero removed', 'info-snack-bar')
            this.loadUser();
          } else {
            this.error = true;
          }
        });
      }
    });
  }

  trackByFn(index: any) {
    return index;
  }

  private onChanges() {
    this.newHeroForm.get('realName').valueChanges.subscribe((value) => {
      if (value && value.length >= 3 && UtilsHelperService.isPalindrome(value)) {
        this.snackBar.open('Yeah that\'s a Palindrome!', '', { duration: 2000 });
      } else {
        this.snackBar.dismiss();
      }
    });
  }
}
