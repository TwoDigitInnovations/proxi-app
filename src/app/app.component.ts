import { Component } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { SafeArea } from 'capacitor-plugin-safe-area';
// import { StatusBar, Style } from '@capacitor/status-bar';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  language: any;

  constructor(
    private translate: TranslateService,
  ) {
    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      console.log(statusBarHeight, 'statusbarHeight');
      document.documentElement.style.setProperty(
        `--safe-area-inset-top`,
        `${statusBarHeight}px`,
      );
      document.documentElement.style.setProperty(`--safe-area-inset-bottom`, `${statusBarHeight}px`);
    });

    // this.statusBar();


    this.language = localStorage.getItem('language');
    console.log(this.language)
    if (this.language && this.language != 'undefined') {
      this.translate.use(this.language);
    } else {
      localStorage.setItem('language', 'en');
      this.translate.addLangs(['en', 'fr',]);
      this.translate.setFallbackLang('en');
      this.translate.use(this.language);
    }
  }

  // async statusBar() {
  //   // StatusBar.setOverlaysWebView({ overlay: true });
  //   // await StatusBar.setBackgroundColor({ color: '#000000' });
  //   await StatusBar.setStyle({ style: Style.Dark });
  // }
}
