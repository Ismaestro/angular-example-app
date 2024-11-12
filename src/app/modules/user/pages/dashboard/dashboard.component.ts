import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonCardComponent } from '~modules/pokemon/shared/components/pokemon-card/pokemon-card.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, PokemonCardComponent, NgForOf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent {
  protected counter = signal(0);

  profileForm = new FormGroup({
    aliases: new FormArray([]),
  });

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(new FormControl(''));
  }
}
