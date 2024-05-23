import * as angular from 'angular';

// Import our app config files
import AppConstants from './config/app.constants';
import AppConfig from './config/app.config';
import AppRun from './config/app.run';
import 'angular-ui-router';

// Import our app functionality
import LayoutModule from './layout/layout.module';
// import './layout';

import './components';
import './home';
import './profile';
import './article';
import './services';
import './auth';
import './settings';
import './editor';

// Create and bootstrap application
const requires = [
  'ui.router',
  // 'app.layout',
  LayoutModule,
  'app.components',
  'app.home',
  'app.profile',
  'app.article',
  'app.services',
  'app.auth',
  'app.settings',
  'app.editor',
];

// Mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppConstants', AppConstants);
angular.module('app').config(AppConfig);
angular.module('app').run(AppRun);

angular.bootstrap(document, ['app'], {
  strictDi: true,
});
