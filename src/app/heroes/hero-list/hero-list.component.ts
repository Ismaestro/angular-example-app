import {Component, ViewChild} from '@angular/core';
import {Hero} from '../shared/hero.model';
import {HeroService} from '../shared/hero.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'toh-hero-list',
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
              private formBuilder: FormBuilder) {
    this.canVote = this.heroService.checkIfUserCanVote();

    this.newHeroForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'alterEgo': ['', [Validators.required]]
    });

    this.heroService.get().subscribe((heroes) => {
      this.heroes = heroes.sort((a, b) => {
        return b.likes - a.likes;
      });
    });
  }

  like(hero) {
    this.heroService.like(hero).subscribe(() => {
      this.canVote = this.heroService.checkIfUserCanVote();
    });
  }

  createNewHero(newHero) {
    this.heroService.create(newHero).subscribe((heroes) => {
      this.heroes = heroes.sort((a, b) => {
        return b.likes - a.likes;
      });
      this.myNgForm.resetForm();
    }, (response) => {
      if (response.status === 500) {
        this.error = 'errorHasOcurred';
      }
    });
  }

  remove(hero): void {
    let dialogRef = this.dialog.open(RemoveHeroDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroService.remove(hero.id).subscribe((heroes) => {
          this.heroes = heroes;
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
  selector: 'toh-remove-hero-dialog',
  templateUrl: './remove-hero.dialog.html',
})

export class RemoveHeroDialogComponent {
  constructor() {
  }
}
