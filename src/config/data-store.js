; (function () {
    angular.module('bsa')
        .service('DataStore', function (DS) {

            this.Year = DS.defineResource({
                name: 'year',
                endpoint: 'api/years',
                relations: {
                    hasMany: {
                        camp: {
                            localField: 'camp',
                            foreignKey: 'yearId'
                        }

                    }
                }
            })



            this.Director = DS.defineResource({
                name: 'director',
                endpoint: 'api/directors',
                relations: {
                    hasMany: {
                        camp: {
                            localField: 'camp',
                            foreignKey: 'directorId'
                        }
                    }
                }
            })



            this.Camp = DS.defineResource({
                name: 'camp',
                endpoint: 'api/camps',
                relations: {
                    belongsTo: {
                        year: {
                            localField: 'year',
                            localKey: 'yearId',
                            parent: true
                        },
                        director: {
                            localField: 'director',
                            localKey: 'directorId'
                        }


                    }

                }
            })


            this.Den = DS.defineResource({
                name: 'den',
                endpoint: 'api/dens',
                relations:{
                    
                }
            })






        })






} ());