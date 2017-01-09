let 
    Models = require('../server-assets/models/models'),

    expireReservations = [
        '/api', 
        (req, res, next) => {
        // console.log(req.url);
        var urls = req.url.split('/') // Have to get the params straight from the url
        var resource = urls[1].slice(0, -1) // Slice off the "s"
        var id = urls[2] || req.query.id || req.query.yearId || req.query.campId // the findYearForUpdate function is dynamic and can take in multiple id's

        if ( (/(year)|(camp)|(reservation)|(scout)/g).test(req.url) && id ) { // Isn't attached to any yearId
            //console.log(0)
            console.log('Custom Middleware is Active.');
            
            Models.findYearForUpdate(resource, id, function (year) {
                //console.log(1)
                if (year.stack) { return next() }  //If there's an error, don't bother going on
                
                let frequency = 86400000; // 24hrs - how often expired reservations should be checked 
                // frequency = 60000 // To test, enter values in here. Currently @ 1 minute.
                let timeout = 604800000; // 7days - how long a reservation is active before it expires/is paid for 
                let timenow = Date.now();
                if (year.lastAccess + frequency < timenow || !year.lastAccess) { // Checks if this year has been checked for expirations in the last 24hrs
                    year.lastAccess = timenow; // changes the lastAccess date/time to now
                    Models.Year.editYear(year, function (year) {}) // updates the year with its new lastAccess
                    // console.log("YEAR ID :::: " + year.id )
                    Models.Reservation.reservationGetByAnyId(year.id, {}) // gets all the reservations in this year
                        .then(function (reservationList) {
                            //console.log(2)
                            // console.log(JSON.stringify(reservationList))
                            console.log("Checking for expired reservations...")
                            reservationList = reservationList.filter(   // filters out reservations which are not unpaid and past expiration
                                res=>(res.init + timeout < timenow && !res.paidInFull)
                            );

                            Promise.all( reservationList.map(r=>Models.Scout.scoutGetByAnyId(r.id)) ) // scoutGetByAnyId returns a promise. Once all these promises are fulfilled (all the scouts are back), it continues
                                .then(
                                    scoutsArrs=>{ // returns an array consisting of arrays of scouts ( one array of scouts for each reservation in the promise, in respective order )
                                        //console.log(3)
                                        reservationList = reservationList.map( // maps over the reservationList array and adds a "scouts" property to each reservation containing that reservation's scouts
                                            (reservation, index)=>{
                                                reservation.scouts = scoutsArrs[index]
                                                return reservation;
                                            }
                                        )
                                        
                                        return new Promise(
                                            (resolve, reject)=>{
                                                //console.log(4)
                                                // console.log(reservationList)
                                                try{
                                                    resolve(reservationList)
                                                }catch(error){
                                                    reject(error)
                                                }
                                            }
                                        )
                                    }
                                )
                                .then(
                                    reservationList=>{ // Try to follow along here. It's not as scary as it looks
                                        //console.log(5)
                                        // console.log(reservationList)
                                        return Promise.all( // won't move on until all the scouts in all the reservations have been updated appropriately
                                            reservationList.map(
                                                r=>{
                                                    return Promise.all(
                                                        r.scouts
                                                            .filter(scout=>!scout.paid) // filters out scouts who have been paid for. We don't want to expire them.
                                                            .map(scout=>{ // maps over scouts in expired reservations who haven't paid and sets them to be inactive
                                                                scout.active = false;
                                                                return Models.Scout.editScout(scout) // editScout returns a promise, giving us an array of promises for our Promise.all
                                                            })
                                                    )
                                                })
                                        )
                                    }
                                )
                                .then(function(scouts){ // an array of arrays of the edited scouts is returned.
                                    console.log("Scout Expiration Check Complete.")
                                    // WE MADE IT!!!!!! 🎉🎉🎉🍻🎊🎊🍾🍾🎆✌️👌👏🙌👊👊👊
                                })
                                .catch(function(error){ // catches any errors that happened anywhere in the Promise chain
                                    console.error("Something has gone wrong in custom-middleware.js")
                                    console.error(error)
                                })
                            })
                        }
                    }
        )}
        next()
        return;
    }
    ]

module.exports = {
    expireReservations
}