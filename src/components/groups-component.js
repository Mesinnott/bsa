import angular from 'angular'
import './stylesheets/groups.scss'
import template from './templates/groups.html'
import './group-builder'
const Component = 'groups';

angular.module(`app.components.${Component}`, [])
    .service('groupService', function ($http, $state) {
        var gs = this;
        gs.getCamp = function(campId, cb) {
            $http({
                method: 'GET',
                url: 'api/camps/' + campId
            }).then(function(res) {
                return cb(res.data);
            });
        }
        gs.getGroups = function (campId, cb) {
            $http({
                method: 'GET',
                url: '/api/scouts/' + campId
            }).then(function (res) {
                gs.scoutList = res.data;
                return cb(gs.scoutList);
            })
        }
        gs.updateGroup = function(scoutId, cb) {
            $http({
                method: 'PUT',
                url: '/api/scouts/' + scoutId
            }).then(cb);
        }
    })
    .controller('GroupController', function (groupService, $http, $state) {
        let $ctrl = this;
        var gc = this;
        gc.campId = $state.params.campId || '';

        gc.getCamp = function(campId, cb) {
            groupService.getCamp(campId, cb);
        }
        gc.getCamp(gc.campId, function(camp) {
            gc.currentCamp = camp[0];
        })

        gc.listGroups = function (campId, cb) {
            debugger;
            groupService.getGroups(campId, cb)
        }
        gc.listGroups(gc.campId, function (list) {
            gc.scoutList = list;
            gc.initialSort(gc.scoutList);
        });

        gc.groupCap = 16; //Need ng-model with front end, default=16
        gc.createGroups = function() {
            debugger;
            var numGroups = (gc.currentCamp.scoutLevels === 'all' ? 10 : 9);
            gc.scoutList = GroupBuilder(gc.scoutList, numGroups, gc.groupCap);
            gc.colorPackSort(gc.scoutList);
            gc.saveGroupColorChanges(gc.scoutList, function() {
                return true; //Couldn't think of anything to do here
            })
        }

        gc.saveGroupColorChanges = function(scoutList, cb) {
            scoutList.forEach(function(scout) {
                groupService.updateGroup(scout.id, cb);
            });
            gc.colorPackSort(scoutList);
        }

        gc.initialSort = function (scoutList) {
            scoutList = scoutList.sort(function (a, b) {
                if (a.denNum == b.denNum) {
                    return gc.lastNameSort(a, b);
                }
                return gc.packSort(a, b);
            });
        }
        gc.packColorSort = function (scoutList) {
            scoutList = scoutList.sort(function (a, b) {
                if (a.denNum == b.denNum) {
                    if (a.color == b.color) {
                        return gc.lastNameSort(a, b);
                    }
                    return gc.colorSort(a, b);
                }
                return gc.packSort(a, b);
            });
        }
        gc.colorPackSort = function(scoutList) {
            scoutList = scoutList.sort(function (a, b) {
                if (a.color == b.color) {
                    if (a.denNum == b.denNum) {
                        return gc.lastNameSort(a, b);
                    }
                    return gc.packSort(a, b);
                }
                return gc.colorSort(a, b);
            });
        }


        gc.lastNameSort = function (a, b) {
            var nameA = a.name.split(' ');
            var nameB = b.name.split(' ');
            return nameA[nameA.length - 1] - nameB[nameB.length - 1];
        }
        gc.packSort = function (scoutList) {
            return a.denNum - b.denNum;
        }
        gc.colorSort = function (a, b) {
            return a.groupColor - b.groupColor;
        }
    })
    .component('groups', {
        controller: "GroupController",
        template: template
    });

exports[Component] = Component;