angular
  .module('roadTrippers')
  .directive('uploadImage', uploadImage);

uploadImage.$inject = ['filepickerService'];
function uploadImage(filepickerService) {
  return{
    restrict: 'A',
    require: 'ngModel',
    link: (scope, element, attrs, model) => {
      element.bind('click', (e) => {
        e.preventDefault();
        filepickerService
          .pick({ mimetype: 'image/*', fromSources: 'facebook'}, data => {
            model.$setViewValue(data.url);
            console.log(data);
          });
      });
    }
  };
}
