import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PokemonCardComponent } from '~features/pokemon-detail/components/pokemon-card/pokemon-card.component';
import { UserService } from '~features/authentication/services/user.service';

const COUNTER_STARTS = 0;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, PokemonCardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit {
  private readonly userService = inject(UserService);

  readonly profileForm = new FormGroup({
    aliases: new FormArray([]),
  });

  protected counter = signal(COUNTER_STARTS);

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  ngOnInit() {
    this.userService.getMe().subscribe();
  }

  addAlias() {
    this.aliases.push(new FormControl(''));
  }
}
