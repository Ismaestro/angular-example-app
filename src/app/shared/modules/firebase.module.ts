import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'angularexampleapp'),
    AngularFirestoreModule
  ],
  exports: [
    AngularFireModule,
    AngularFirestoreModule
  ],
  providers: [{ provide: SETTINGS, useValue: {} }]
})

export class FirebaseModule {
}
