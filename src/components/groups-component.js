import angular from 'angular'
import './stylesheets/groups.scss'
import template from './templates/groups.html'
import './group-builder'
const Component = 'groups';

angular.module(`app.components.${Component}`, [])
    .service('groupService', function ($http) {
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
    .controller('GroupController', function (groupService, $http) {
        let $ctrl = this;
        var gc = this;
        this.campId = ''; //how to set?

        this.getCamp = function(campId, cb) {
            groupService.getCamp(campId, cb);
        }
        this.getCamp(campId, function(camp) {
            gc.currentCamp = camp;
        })

        this.listGroups = function (campId, cb) {
            groupService.getGroups(campId, cb)
        }
        this.listGroups("3554e413-d6b7-43eb-b12c-9264a20ee24f", function (list) { //get campId from url?maybe? and feed it in here.
            gc.scoutList = list;
            gc.initialSort(gc.scoutList);
        });

        this.groupCap = 16; //Need ng-model with front end, default=16
        this.createGroups = function() {
            var numGroups = (gc.currentCamp.scoutLevels === 'all' ? 10 : 9);
            gc.scoutList = GroupBuilder(gc.scoutList, numGroups, gc.groupCap);
            gc.colorPackSort(gc.scoutList);
            gc.saveGroupColorChanges(gc.scoutList, function() {
                return true; //Couldn't think of anything to do here
            })
        }

        this.saveGroupColorChanges = function(scoutList, cb) {
            scoutList.forEach(function(scout) {
                groupService.updateGroup(scout.id, cb);
            });
            gc.colorPackSort(scoutList);
        }

        this.initialSort = function (scoutList) {
            scoutList = scoutList.sort(function (a, b) {
                if (a.denNum == b.denNum) {
                    return gc.lastNameSort(a, b);
                }
                return gc.packSort(a, b);
            });
        }
        this.packColorSort = function (scoutList) {
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
        this.colorPackSort = function(scoutList) {
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


        this.lastNameSort = function (a, b) {
            var nameA = a.name.split(' ');
            var nameB = b.name.split(' ');
            return nameA[nameA.length - 1] - nameB[nameB.length - 1];
        }
        this.packSort = function (scoutList) {
            return a.denNum - b.denNum;
        }
        this.colorSort = function (a, b) {
            return a.groupColor - b.groupColor;
        }
    })
    .component('groups', {
        controller: "GroupController",
        template: template
    });

exports[Component] = Component;