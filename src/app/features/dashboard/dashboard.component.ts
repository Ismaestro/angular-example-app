import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { PokemonCardComponent } from '~features/pokemon-detail/components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, PokemonCardComponent, NgForOf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent {
  readonly profileForm = new FormGroup({
    aliases: new FormArray([]),
  });

  protected counter = signal(0);

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(new FormControl(''));
  }
}
