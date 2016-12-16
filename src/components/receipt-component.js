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
      rc.getCamperCost
  }

  function Accounting(){
      var totalCost = 0;
      return {
          getCamperCost,
          getAdultCost
      }

    function getCamperCost(registration){
        var camperCost = 0;  
        var cps = 30; //cps = cost per scout
        var campers = registration.campers
        
        // calculates cost per scout based on weblo/gold card/early reg
        if(registration.dayCount > 1){
            cps += 15;
        }
        if(!registration.early){
            cps += 5;
        }
        if(registration.gold){
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
        totalCost += camperCost;
    }

    function getAdultCost(registration){
        var adultCost = 0;
        var adult = regisration.leader
        for(var i = 0; i < adults.length; i++){
            if(adult.shirt < 7){
                adultCost += 10;
            }else{
                adultCost += 12;
            }
        }
        totalCost += adultCost;
    }
    

   
}



exports[Component] = Component
            

          
       
      
            

        
  

