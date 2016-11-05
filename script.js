(function(angular) {

    'use strict';
    var module = angular.module('todoApp', ['ngMaterial']);

    angular.module('todoApp').controller('TodoController', TodoController);

    //This is the application controller
    function TodoController(storageService, $mdDialog, $mdSidenav) {
        var vm = this;
        
        vm.selectedItem = [];
        vm.items = storageService.get() || [];

        vm.notDone = function(item) {
            return item.done == false;
        }

        vm.done = function(item) {
            return item.done == true;
        }

        vm.all = function(item) {
            return true;
        }

        vm.toggleSidenav = closeSidenav('left');
        function closeSidenav(componentId){
        return function() {
            $mdSidenav(componentId).toggle();
            }
        }

        //Delete the current selected item, if any
        vm.deleteItem = function(ev) {

            if (vm.selectedItem != null) {
                var confirm = $mdDialog.confirm()

                .textContent('' +  vm.selectedItem.length + ' tasks will be deleted. Are you sure?')
                    .ariaLabel('Delete task')
                    .targetEvent(ev)
                    .ok('Yes')
                    .cancel('No');

                $mdDialog.show(confirm).then(function(result) {
                    if (result) {
                        for(var i=0; i<vm.selectedItem.length; i++){
                        var index = vm.items.indexOf(vm.selectedItem[i]);
                        if (index != -1) {
                            vm.items.splice(index, 1);
                            storageService.set(vm.items);
                        }
                    }
                    }
                });
            }
        }

        vm.setTheme = function(theme){
            
        }



        //Creates a new item with the given parameters
        vm.createItem = function(task) {
            vm.items.push({
                name: task.name,
                description: task.description,
                priority: task.priority,
                estimatedWork: task.estimatedWork,
                done: false,
                //priority: priority || 0,
                date: Date.now(),
                selected: false
            });
            storageService.set(vm.items);
        } 

                //Creates a new item with the given parameters
   
       //Creates a new item with the given parameters
       /* vm.createItem = function(task) {
            vm.items.push({
                task,
                done: done || false,
                //priority: priority || 0,
                date: date || Date.now()
            });
            storageService.set(vm.items);
        } */


        //Add a new task to the items list 
      /*  vm.addTask = function(ev) {
            var confirm = $mdDialog.prompt()
                .title('Add new task')
                .placeholder('Your task title...')
                .ariaLabel('Your task title...')
                .targetEvent(ev)
                .ok('Add')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function(result) {
                if (result)
                    vm.createItem(result);
            });
        }; */


        vm.addTask = function(ev) {
            $mdDialog.show({
                targetEvent: ev,
                template:
                '<md-dialog class="dialog-panel" aria-label="Create new task..." >' +
                '   <md-toolbar>' +
                '       <div class="md-toolbar-tools">' +
                '           <h2> Add new Task </h2>' +
                '       </div>' +
                '   </md-toolbar>' +
                '   <md-dialog-content layout-gt-sm="column" class="content-dialog">' +
                '       <md-input-container class="dialog-info">' +
                '           <label>Name...</label>' +
                '           <input ng-model="dCtrl.task.name">' +
                '       </md-input-container>' +
                '       <md-input-container class="dialog-info">' +
                '           <label>Description...</label>' +
                '           <input ng-model="dCtrl.task.description">' +
                '       </md-input-container>' +
                '       <md-slider-container class="dialog-info">' +
                '           <span>Priority</span>' +
                '           <md-slider flex min="-1" max="1" ng-model="dCtrl.task.priority"></md-slider>' +
                '       </md-slider-container>' +
                '       <md-input-container class="dialog-info">' +
                '           <label>Estimated time work...</label>' +
                '           <input ng-model="dCtrl.task.estimatedWork">' +
                '       </md-input-container>' +
                '       <md-dialog-actions>' +
                '           <md-button ng-click="dCtrl.confirm(dCtrl.task)"> Add </md-button>' +
                '           <md-button ng-click="dCtrl.cancel()"> Cancel </md-button>' +
                '       </md-dialog-actions>' +
                '   </md-dialog-content>' +
                '</md-dialog>',
                controller: DialogController,
                controllerAs: "dCtrl"
                
            }).then(function(task){ 
                if(task)
                vm.createItem(task);
            });

            function DialogController($mdDialog){
                var vm=this;   
                vm.task = {
                    name: '',
                    description: '',
                    priority: 0,
                    estimatedWork: ''                
                };

                vm.confirm = function(task){
                    $mdDialog.hide(task);
                }
                vm.cancel = function(){
                    $mdDialog.cancel();
                }
            }
         }

    }   


})(window.angular);