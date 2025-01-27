import { StateProvider } from '@uirouter/angularjs';
import  UIRouterModule  from '@uirouter/angularjs';
import { Ng1StateDeclaration } from '@uirouter/angularjs/lib/interface';
import { getTypeName, NgModule } from 'angular-ts-decorators';

export interface UiState extends Ng1StateDeclaration {
  component?: any;
}

const routes: UiState[] = [
  { name: 'index', url: '', redirectTo: 'dashboard' },
  // { name: 'dashboard', url: '/dashboard', component: DashboardComponent },
  // { name: 'detail', url: '/detail/{id}', component: HeroDetailComponent },
  // { name: 'heroes', url: '/heroes', component: HeroesComponent }
];

@NgModule({
  id: 'AppRoutingModule',
  imports: [
    UIRouterModule
  ],
})
export class AppRoutingModule {
  static config($stateProvider: StateProvider) {
    'ngInject';
    routes.forEach(route => $stateProvider.state(getNg1StateDeclaration(route)));
  }
}

function getNg1StateDeclaration(state: UiState) {
  if (state.component && typeof state.component !== 'string') {
    state.component = getTypeName(state.component);
  }
  return state;
}

