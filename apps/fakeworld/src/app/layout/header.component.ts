import template from './header.html';

class AppHeaderCtrl {
  constructor(AppConstants, User, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.currentUser = User.current;

    $scope.$watch('User.current', (newUser) => {
      this.currentUser = newUser;
    });
  }
}

const AppHeader = {
  controller: AppHeaderCtrl,
  template,
};

export default AppHeader;
