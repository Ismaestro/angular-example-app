import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { FormErrorsComponent } from '~modules/shared/components/form-errors/form-errors.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { translations } from '../../../../../locale/translations';
import { Subject, takeUntil } from 'rxjs';
import { User } from '~modules/user/shared/user.model';
import { Hero } from '~modules/hero/shared/hero.model';
import { HeroService } from '~modules/hero/shared/hero.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-hero-modal',
  templateUrl: './hero-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, FormErrorsComponent, ReactiveFormsModule, NgClass, NgForOf],
})
export class HeroModalComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) modal: Modal | undefined;
  @Input({ required: true }) user: User | undefined;
  @Input({ required: true }) heroSelected: Hero | undefined;
  @Input({ required: true }) heroesList: Hero[] | undefined;

  destroy$: Subject<boolean> = new Subject<boolean>();
  translations: typeof translations;
  heroForm: FormGroup | undefined;
  isButtonLoading: boolean;
  alterEgo: FormControl | undefined;
  realName: FormControl | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.translations = translations;
    this.isButtonLoading = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['heroSelected']) {
      this.heroSelected = changes['heroSelected'].currentValue;
      if (this.heroSelected) {
        if (!this.heroForm) {
          this.createForm();
        } else {
          this.heroForm.reset();
        }
      }
    }
  }

  createForm() {
    this.alterEgo = new FormControl<string>('', [Validators.required]);
    this.realName = new FormControl<string>('', [Validators.required]);
    this.heroForm = this.formBuilder.group({
      alterEgo: this.alterEgo,
      realName: this.realName,
    });
  }

  sendForm() {
    if (this.heroForm?.valid) {
      this.heroService
        .createHero(this.heroForm.getRawValue())
        .pipe(takeUntil(this.destroy$))
        .subscribe(hero => {
          if (hero) {
            this.heroesList?.push(hero);
            this.closeModal();
            this.changeDetectorRef.detectChanges();
          }
        });
    }
  }

  closeModal() {
    this.modal?.hide();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
