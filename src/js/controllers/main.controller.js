angular
  .module('roadTrippers')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$transitions', '$rootScope', '$state','$auth'];
function MainCtrl($transitions, $rootScope, $state, $auth) {
  const vm = this;

  vm.isAuthenticated = $auth.isAuthenticated;
  vm.logout = logout;
  const protectedStates = ['postsNew'];

  function logout() {
    $auth.logout();
    $state.go('home');
  }

  $rootScope.$on('error', (e, err) => {
    vm.message = err.data.message;

    if(err.status === 401 && vm.pageName !== 'login') {
      vm.stateHasChanged = false;
      $state.go('login');
    }
  });

  $transitions.onSuccess({}, (transition) => {
    // closes the mobile menu each time the state changes
    vm.menuIsOpen = false;
    // attaches the state name to the main controller to be used as a class name on the body
    vm.pageName = transition.to().name;
    if(vm.stateHasChanged) vm.messgae = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) vm.currentUserId = $auth.getPayload().userId;

    if(!$auth.isAuthenticated() && protectedStates.includes(vm.pageName)) {
      vm.message = 'You must be logged in';
      return $state.go('login');
    }
    if (vm.stateHasChanged) vm.message = null;
    if (!vm.stateHasChanged) vm.stateHasChanged = true;
  });

  vm.slides = [
    { image: 'http://fillmurray.com/1000/1000' },
    { image: 'http://fillmurray.com/1000/800' }
  ];
}
