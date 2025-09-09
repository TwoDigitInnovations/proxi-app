import { Component } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { SafeArea } from 'capacitor-plugin-safe-area';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      console.log(statusBarHeight, 'statusbarHeight');
      document.documentElement.style.setProperty(
        `--safe-area-inset-top`,
        `${statusBarHeight}px`,
      );
    });
  }
}
