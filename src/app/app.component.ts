import { Component } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { SafeArea } from 'capacitor-plugin-safe-area';
// import { StatusBar, Style } from '@capacitor/status-bar';

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
      document.documentElement.style.setProperty(`--safe-area-inset-bottom`, `${statusBarHeight}px`);
    });

    // this.statusBar();
  }

  // async statusBar() {
  //   // StatusBar.setOverlaysWebView({ overlay: true });
  //   // await StatusBar.setBackgroundColor({ color: '#000000' });
  //   await StatusBar.setStyle({ style: Style.Dark });
  // }
}
