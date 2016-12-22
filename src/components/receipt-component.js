import angular from 'angular'
import template from './templates/receipt.html'
import './stylesheets/receipt.scss'
const Component = 'receipt'

angular.module(`app.components.${Component}`, [])
  .component(Component,{
    template: template,
    controller: RecController
  })
  .factory('bsaConstants', function bsaParams(){  


      const shirtSizes = [
          {
              name:'YM',
              displayName:"Youth Medium -- $10",
          },
          {
              name:'YL',
              displayName:"Youth Large -- $10",
          },
          {
              name:'S',
              displayName:'Small -- $10',
          },
          {
              name:'M',
              displayName:'Medium -- $10',
          },
          {
              name:'L',
              displayName:'Large -- $10',
          },
          {
              name:'XL',
              displayName:'XL -- $10',
          },
          {
              name:'XXL',
              displayName:'XXL -- $12',
          },
          {
              name:'3XL',
              displayName:'3XL -- $12',
          },
          {
              name:'4XL',
              displayName:'4XL -- $12',
          },
          {
              name:'5XL',
              displayName:'5XL -- $12'
          }
      ];
      let shirtPrices = {}
      shirtSizes.forEach( // Loops through shirtSizes, creating a dictionary of prices by size. ( Sizes greater than XL are $12 )
          (ss,i)=>{
              shirtPrices[ss.name] = (ss.name.length>2)? 12 : 10;
          }
      )

      return{
          shirtSizes,
          shirtPrices,
      }
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
            

          
       
      
            

        
  

