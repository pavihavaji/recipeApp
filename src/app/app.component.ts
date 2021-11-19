import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from './components/auth/auth.service';
import { LoggingService } from './logging.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './components/auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'recipeApp';

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }
    this.loggingService.printLog('Hello from App COmponent ngOnint');
  }
}
