import {Component, ViewChild} from '@angular/core';
import {Hero} from '../shared/hero.model';
import {HeroService} from '../shared/hero.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialog} from '@angular/material';
import {AppConfig} from '../../config/app.config';
import {Router} from '@angular/router';
import {LoggerService} from '../../core/logger.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})

export class HeroListComponent {
  heroes: Hero[];
  newHeroForm: FormGroup;
  canVote = false;
  error: string;
  @ViewChild('form') myNgForm; // just to call resetForm method

  constructor(private heroService: HeroService,
              private dialog: MdDialog,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.canVote = this.heroService.checkIfUserCanVote();

    this.newHeroForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'alterEgo': ['', [Validators.required]]
    });

    this.heroService.getAllHeroes().subscribe((heroes) => {
      this.heroes = heroes.sort((a, b) => {
        return b.likes - a.likes;
      });
    });
  }

  like(hero) {
    this.heroService.like(hero).subscribe(() => {
      this.canVote = this.heroService.checkIfUserCanVote();
    }, (error) => {
      LoggerService.error('maximum votes limit reached', error);
    });
  }

  createNewHero(newHero) {
    this.heroService.createHero(newHero).subscribe((newHeroWithId) => {
      this.heroes.push(newHeroWithId);
      this.myNgForm.resetForm();
    }, (response) => {
      if (response.status === 500) {
        this.error = 'errorHasOcurred';
      }
    });
  }

  seeHeroDetails(hero) {
    if (hero.default) {
      this.router.navigate([AppConfig.routes.heroes + '/' + hero.id]);
    }
  }

  remove(heroToRemove): void {
    let dialogRef = this.dialog.open(RemoveHeroDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroService.deleteHeroById(heroToRemove.id).subscribe(() => {
          this.heroService.showSnackBar('heroRemoved');
          this.heroes = this.heroes.filter(hero => hero.id !== heroToRemove.id);
        }, (response) => {
          if (response.status === 500) {
            this.error = 'heroDefault';
          }
        });
      }
    });
  }
}

@Component({
  selector: 'app-remove-hero-dialog',
  templateUrl: './remove-hero.dialog.html',
})

export class RemoveHeroDialogComponent {
  constructor() {
  }
}
