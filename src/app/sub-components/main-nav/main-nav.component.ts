import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})

/*
 * This is your main navigation component and serves as your navigation bar which will be embedded into every page in the app
 * We do this by referencing it as <app-main-nav></app-main-nav> inside our app.component.html just before the <router-outlet> tags
 * @class
 */
export class MainNavComponent {

  constructor() {}


}
