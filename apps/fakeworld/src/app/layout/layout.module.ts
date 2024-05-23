import * as angular from 'angular';
import AppHeader from './header.component';
import AppFooter from './footer.component';

// Both of these options work. Just depends on what you prefer.

// Option 1
// import AppHeader from './header.component';
// import AppFooter from './footer.component';
//
// export default angular
//   .module('app.layout', [])
//   .component('appHeader', AppHeader)
//   .component('appFooter', AppFooter)
//   .name;

// Option 2
const LayoutModule = angular.module('app.layout', []);

LayoutModule.component('appHeader', AppHeader);
LayoutModule.component('appFooter', AppFooter);

export default LayoutModule.name
