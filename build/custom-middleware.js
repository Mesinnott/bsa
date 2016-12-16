let 
    Models = require('../server-assets/models/models'),
    expireReservations = [
        '/api', 
        (req, res, next) => {
        // console.log(req.url);
        var urls = req.url.split('/') // Have to get the params straight from the url
        var resource = urls[1].slice(0, -1) // Slice off the "s"
        var id = urls[2] || req.query.id || req.query.yearId || req.query.campId

        if ( (/(year)|(camp)|(reservation)|(scout)/g).test(req.url) && id ) { // Isn't attached to any yearId
            //console.log(0)
            console.log('Custom Middleware is Active.');
            
            Models.findYearForUpdate(resource, id, function (year) {
                //console.log(1)
                if (year.stack) { return next() }  //If there's an error, don't bother going on
                
                
                let frequency = 86400000; // 24hrs
                // frequency = 60000 // To test, enter values in here. Currently @ 1 minute.
                let timeout = 604800000; // 7days
                var timenow = Date.now();
                if (year.lastAccess + frequency < timenow || !year.lastAccess) {
                    year.lastAccess = timenow;
                    Models.Year.editYear(year, function (year) {})
                    // console.log("YEAR ID :::: " + year.id )
                    Models.Reservation.reservationGetByAnyId(year.id, {})
                        .then(function (reservationList) {
                            //console.log(2)
                            // console.log(JSON.stringify(reservationList))
                            console.log("Checking for expired reservations...")
                            reservationList = reservationList.filter(
                                res=>(res.init + timeout < timenow && !res.paidInFull)
                            );

                            Promise.all(reservationList.map(r=>Models.Scout.scoutGetByAnyId(r.id)))
                                .then(
                                    scoutsArrs=>{                        
                                        //console.log(3)
                                        reservationList = reservationList.map(
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
                                    reservationList=>{
                                        //console.log(5)
                                        // console.log(reservationList)
                                        return Promise.all(
                                            reservationList.map(
                                                r=>{
                                                    return Promise.all(
                                                        r.scouts
                                                            .filter(scout=>!scout.paid)
                                                            .map(scout=>{
                                                                scout.active = false;
                                                                return Models.Scout.editScout(scout)
                                                            })
                                                    )
                                                })
                                        )
                                    }
                                )
                                .then(inform)
                                .catch(inform)
                                function inform(stuff){
                                    console.log("Scout Expiration Check Complete.")
                                }
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