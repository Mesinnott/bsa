import angular from 'angular'
import './groups.scss'
import template from './groups.html'
const Component = 'groups';

angular.module(`app.components.${Component}`, [])
    .service('groupService', function ($http, $state) {
        var gs = this;
        gs.getCamp = function (campId, cb) {
            $http({
                method: 'GET',
                url: 'api/camps/' + campId
            }).then(function (res) {
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
        gs.updateGroup = function (scout, cb) {
            console.log('group updated')
            $http({
                method: 'PUT',
                data: { scout: scout },
                url: '/api/scouts/' + scout.id
            }).then(cb);
        }
    })
    .factory('groupBuilder', function () {
        return {
            build: GroupBuilder
        }
    })
    .component('groups', {
        controller: GroupController,
        template: template
    });

GroupController.$inject = ['groupService', '$http', '$state', 'groupBuilder'];

function GroupController(groupService, $http, $state, groupBuilder) {
    let $ctrl = this;
    var gc = this;
    gc.campId = $state.params.campId || '';

    gc.getCamp = function (campId, cb) {
        groupService.getCamp(campId, cb);
    }
    gc.getCamp(gc.campId, function (camp) {
        gc.currentCamp = camp[0];
    })

    gc.sortBy = (x, y, z) => {
        var fn = (a, b, x) => a[x] > b[x] ? 1 : a[x] < b[x] ? -1 : 0;
        gc.scoutList = gc.scoutList.sort(
            (a, b) => {
                var rtn = fn(a, b, x)
                if (rtn == 0) {
                    if (!y) {
                        rtn = fn(a, b, 'name')
                        return rtn
                    }
                    rtn = fn(a, b, y)
                    if (rtn == 0 && z) {
                        rtn = fn(a, b, z)
                    }
                }
                return rtn
            }
        )
    }

    gc.listGroups = function (campId, cb) {
        groupService.getGroups(campId, cb)
    }
    gc.listGroups(gc.campId, function (list) {
        gc.scoutList = list;
        gc.scoutList.forEach(scout => {
            var fullName = scout.name.split(" ");
            scout.lastName = fullname[fullname.length - 1];
            return scout
        })
        gc.sortBy('packNum', 'lastName')
    });

    gc.groupCap = 16; //Need ng-model with front end, default=16, to make this extendable.  Easy to do upon request.
    gc.createGroups = function () {
        var numGroups = (gc.currentCamp.scoutLevels === 'all' ? 10 : 9);
        gc.scoutList = groupBuilder.build(gc.scoutList, numGroups, gc.groupCap);
        gc.saveGroupColorChanges(gc.scoutList, function () {
            return true; //Couldn't think of anything to do here
        })
    }
    gc.saveGroupColorChanges = function (scoutList, cb) {
        scoutList.forEach(function (scout) {
            groupService.updateGroup(scout, cb);
        });
        gc.sortBy("color", "packNum", "lastName");
    }

}
///////GROUP BUILDER FUNCTION///////

// masterArray is the array of all scouts attending a particular camp.  
// Each scout should be an object containing a reservationId.

// numGroups is 9 for Webelos camps, 10 for all the others.

// hardGroupCap is set to 16, according to BSA policy.

// We may want to pass colorArray in from the front so it can be changed/expanded at a later date?
// Current: ["red", "orange", "yellow", "lightGreen", "darkGreen", "lightBlue", "darkBlue", "purple", "black", "brown"]

function GroupBuilder(masterArray, numGroups, hardGroupCap, colorArray) {

    // compiles a list of all reservations attached to a camp
    var listReservations = function (array) {
        var reservationList = [array[0].reservationId];
        array.forEach(function (scout) {
            var found = false;
            for (var i = 0; i < reservationList.length; i++) {
                if (scout.reservationId == reservationList[i]) {
                    found = true;
                }
            }
            if (!found) {
                reservationList.push(scout.reservationId);
            }
        })
        return reservationList;
    }



    // Accepts an array of scouts and uses the reservation list array to create a complex array.
    // Each reservation comprises its own sub-array of scouts.
    // Returns array of sub-arrays, sorted by length.
    var sortedScouts = function (array, reservationArray) {
        var sortedArray = [];
        for (var i = 0; i < reservationArray.length; i++) {
            sortedArray.push([]);
        }
        array.forEach(function (scout) {
            for (var i = 0; i < reservationArray.length; i++) {
                if (scout.reservationId == reservationArray[i]) {
                    sortedArray[i].push(scout);
                }
            }
        });
        sortedArray = sortedArray.sort(function (a, b) {
            return b.length - a.length;
        });
        console.log(sortedArray);
        return sortedArray;
    }



    // Takes the first (longest) subarray and breaks it in half, then re-sorts the list by length.
    // Introduces a random element so the process can be rerun with different results if it fails the first time.
    var truncateFirst = function (complexArray) {
        var group = complexArray.splice(0, 1)[0];
        var half = Math.ceil(group.length / 2) + (Math.random() > .5 ? 1 : 0); //Randomizer
        var halfGroup = group.splice(0, half);
        complexArray.push(group, halfGroup);
        complexArray = complexArray.sort(function (a, b) {
            return b.length - a.length;
        });
        return complexArray;
    }



    // Written to check the processes during debugging, making sure no scouts were dropped.
    function checkLength(complexArray) {
        var length = 0;
        complexArray.forEach(function (group) {
            length += group.length;
        });
        return length;
    }



    // Recursive function.  The actual group builder.  Meat and potatoes here.
    var buildGroups = function (complexArray, numGroups, groupCap, iteration) {
        console.log("Iteration " + iteration) //Counter so recursion knows when to give up.
        var groups = [];
        for (var i = 0; i < numGroups; i++) {
            groups.push([]);
        }
        var complete = true;
        complexArray.forEach(function (group) {
            for (var i = 0; i < groups.length; i++) {
                if (groupCap - groups[i].length >= group.length) {
                    groups[i] = groups[i].concat(group);
                    return;
                }
            }
            complete = false;  // If group can't fit, "return" is never hit and this flag is thrown.
            console.log("Couldn't fit group of " + group.length);
        })
        if (!complete) {
            iteration++;
            if (iteration == 10) {
                console.log("TIMEOUT");
                return { error: "Let's try again from the top" }
            }
            // Recursive action!  Breaks the longest group in two, re-sorts, and tries again.
            groups = buildGroups(truncateFirst(complexArray), numGroups, groupCap, iteration);
        }
        // Innermost loop attaches its iteration number.
        // Every other iteration detects the iteration number and passes back the object as-is.
        // Final return will be format {groups: [complex array of scouts], iteration: number}
        return groups.iteration ? groups : { groups: groups, iteration: iteration };
    }



    // Sets the max size of the rotation groups for the day camp.
    // If the camp doesn't fill up, the groups shouldn't be too uneven.
    var groupCap = Math.ceil(masterArray.length / numGroups) + 1;
    if (groupCap > hardGroupCap) {
        groupCap = hardGroupCap;
    }
    // For ease of sorting.  Daycamp groups of 16 will have no more than 12 from the same pack. 
    // Groups of 15 will have no more than 11, etc.
    var groupSize = Math.floor(groupCap * .75)



    // Governor function to call all the above functions in turn.
    function GroupMaker(array, numGroups, groupCap, groupSize) {
        var reservationList = listReservations(array);
        var scoutsArray = sortedScouts(array, reservationList)
        while (scoutsArray[0].length > groupSize) {
            truncateFirst(scoutsArray);
        }
        var iteration = 1;
        var completedGroupsWithCount = buildGroups(scoutsArray, numGroups, groupCap, iteration);
        return completedGroupsWithCount;
    }



    ////////////////////////////////////////////////////////////
    ///////////// FUNCTION IS ACTUALLY CALLED HERE /////////////
    ////////////////////////////////////////////////////////////

    // Generates a list of 20 possible solutions, each made unique by the randomizer in truncateFirst().
    // masterArray and numGroups are passed in from the top.
    // groupCap and groupSize are calculated above, based on masterArray.length and numGroups.
    var solutionChoices = [];
    for (var i = 0; i < 20; i++) {
        solutionChoices.push(GroupMaker(masterArray, numGroups, groupCap, groupSize));
    }

    // Sorts solutions by their iteration count, bringing the solution that leaves the most large groups intact to the top
    // All failed solution pass will have an iteration count of 9, sorted to the bottom of the list.
    solutionChoices = solutionChoices.sort(function (a, b) {
        return a.iteration - b.iteration;
    });

    console.log(solutionChoices);
    var finalAnswer = solutionChoices[0].groups;  // Yes Regis, this is my final answer.
    console.log("OPTIMIZED TO " + solutionChoices[0].iteration + " ITERATIONS");



    // Assign each of the groups a color.  If we pass it in from the front, we can remove this hard-coding.
    // The Webelos camps only have nine groups, so colorArray[9]="brown" is never used.
    var colorArray = [
        "red",
        "orange",
        "yellow",
        "lightgreen",
        "darkgreen",
        "lightblue",
        "darkblue",
        "purple",
        "black",
        "brown"
    ];
    var groupsByColor = [];
    for (var i = 0; i < finalAnswer.length; i++) {
        groupsByColor.push({ color: colorArray[i], group: finalAnswer[i] })
    }

    // Return a single simple array of scout objects with colors added.
    var scoutsWithColors = [];
    for (var i = 0; i < groupsByColor.length; i++) {
        for (var j = 0; j < groupsByColor[i].group.length; j++) {
            var scout = groupsByColor[i].group[j];
            scout.color = groupsByColor[i].color;
            scoutsWithColors.push(scout);
        }
    }
    console.log(scoutsWithColors[0])

    return scoutsWithColors;

}

exports.component = Component;