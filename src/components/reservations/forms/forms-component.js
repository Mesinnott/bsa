import {
    campForm,
    actionBar,
    adultForm,
    camperForm,
    bsaAdultForm,
    firstContactForm,
    secondContactForm
} from './forms.js'

const Component = 'forms'

angular.module(`app.components.${Component}`, [])
    .directive("barAction", function(){
        return{
            template:actionBar
        }
    })
    .component("shirtSelect", {
            bindings: {
                model:'=',
                required:'='
            },
            template:`
                                <div class="select-container">
                                    <i class="material-icons">&#xE313;</i>
                                    <select name="" id="" class="form-control" ng-change="console.log(model)" ng-model="ss.model" required="ss.required">
                                        <option value="" ng-if="!ss.required">None</option>
                                        <option ng-repeat="shirtSize in ss.shirtSizes" ng-value="shirtSize.name">
                                            {{shirtSize.displayName}}
                                        </option>
                                    </select>
                                </div>
                      `,
            controller:function($scope, bsaConstants){
                let ss = this;
                ss.shirtSizes = bsaConstants.shirtSizes;
            },
            controllerAs:'ss'
    })
    .directive("formCamp", function(){
        return {
            template: campForm,
        }
    })
    .directive("formAdult", function(){
        return {
            template: adultForm,
        }
    })
    .directive("formCamper", function(){
        return {
            template: camperForm,
        }
    })
    .directive("formBsaAdult", function(){
        return {
            template: bsaAdultForm,
        }
    })
    .directive("formFirstContact", function(){
        return {
            template: firstContactForm,
        }
    })
    .directive("formSecondContact", function(){
        return {
            template: secondContactForm,
        }
    })

exports.component = Component