import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AppConfig } from '../../configs/app.config';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private snackBar: MatSnackBar) {
  }

  showSnackBar(name: string, panelClass: string): void {
    const config: any = new MatSnackBarConfig();
    config.duration = panelClass === 'warning-snack-bar' ? 50000 : AppConfig.snackBarDuration;
    config.horizontalPosition = 'right';
    config.verticalPosition = 'top';
    config.panelClass = panelClass;
    this.snackBar.open(name, 'OK', config);
  }

}
