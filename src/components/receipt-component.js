import angular from 'angular'
import template from './templates/receipt.html'
const Component = 'receipt'

angular.module(`app.components.${Component}`, [])
  .component(Component,{
    template: template,
    controller: RecController
  })
  .service('accountingService', Accounting)

  function RecController(accountingService){
      let rc = this;
      rc.getCamperCost = accountingService.getCamperCost
      rc.getAdultCost = accountingService.getAdultCost

  }

  function Accounting(){
      let a = this;
      
      a.setReservation = function(reservation){
          a.reservation = reservation
      }
      a.setCamp = function(camp){
          a.camp = camp;
          a.camp.dayCount = a.camp.scoutLevels == "webelos"? 2 : 1;
      }
      a.setCampers = function(campers){
          a.campers = campers
      }
      a.setAdults = function(adults){
          a.adults = adults
      }

    function getDataToDisplay(){

    }

    function getCamperCost(){
        var camperCost = 0;
        var cps = 30; //cps = cost per scout
        var camp = a.camp
        var campers = a.campers
        var reservation = a.reservation
        // calculates cost per scout based on weblo/gold card/early reg
        if(camp.dayCount > 1){
            cps += 15;
        }
        if(!camp.early){
            cps += 5;
        }
        if(camp.gold){
            cps -= 5;
        }
        
        //cost without t shirts
        camperCost += campers.length * cps

        for(var i = 0; i < campers.length; i++){
            var camper = campers[i]
            if(camper.shirt < 7){
                camperCost += 10
            }else{
                camperCost += 12
            }
        }
        return camperCost;
    }

    function getAdultCost(){
        var adultCost = 0;
        var adults = a.reservation.adults
        for(var i = 0; i < adults.length; i++){
            if(adult.shirt < 7){
                adultCost += 10;
            }else{
                adultCost += 12;
            }
        }
        return adultCost;
    }

    function getTotalCost(){
        return getAdultCost() + getCamperCost();
    }
}



exports[Component] = Component
            

          
       
      
            

        
  

