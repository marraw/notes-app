import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  InjectionToken,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformID: InjectionToken<Object>
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformID)) {
      this.authService.autoLogIn();
    }
  }

  scrollTop(): void {
    if (isPlatformBrowser(this.platformID)) {
      window.scroll(0, 0);
    }
  }
}
