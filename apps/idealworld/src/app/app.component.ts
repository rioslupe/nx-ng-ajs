import { Component } from 'angular-ts-decorators';

@Component({
  selector: 'app-root',
  // template: require('./app.component.html'),
  // styles: [require('./app.component.scss')],

  template: require('./app.component.html').default,
  styles: [require('./app.component.scss').default]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
