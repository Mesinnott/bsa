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
                        }
                    },
                    hasOne: {
                        director: {
                            localField: 'director',
                            localKey: 'directorId'
                        }
                    },
                    hasMany: {
                        reservation: {
                            localField: 'reservation',
                            foreignKey: 'campId'
                        },
                        scout: {
                            localField: 'scout',
                            foreignKey: 'campId'
                        },
                        leader: {
                            localField: 'leader',
                            foreignKey: 'campId'
                        }
                    }
                }
            })

            this.Reservation = DS.defineResource({
                name: 'reservation',
                endpoint: 'api/reservations',
                relations: {
                    belongsTo: {
                        camp: {
                            localField: 'camp',
                            localKey: 'campId'
                        }
                    },
                    hasMany: {
                        scout: {
                            localField: 'scout',
                            foreignKey: 'reservationId'
                        }
                    }
                }
            })

            // this.Den = DS.defineResource({
            //     name: 'den',
            //     endpoint: 'api/dens',
            //     relations: {
            //         hasMany: {
            //             scout: {
            //                 localField: 'scout',
            //                 foreignKey: 'denId'
            //             },
            //             camp: {
            //                 localField: 'camp',
            //                 foreignKey: 'denId'
            //             },
            //             reservation: {
            //                 localField: 'reservation',
            //                 foreignKey: 'denId'
            //             },
            //             leader: {
            //                 localField: 'leader',
            //                 foreignKey: 'denId'
            //             }
            //         }
            //     }
            // })

            this.Scout = DS.defineResource({
                name: 'scout',
                endpoint: 'api/scouts',
                relations: {
                    belongsTo: {
                        reservation: {
                            localField: 'reservation',
                            localKey: 'reservationId',
                            parent: true
                        }
                    }
                }
            })

            this.Leader = DS.defineResource({
                name: 'leader',
                endpoint: 'api/leaders',
                relations: {
                    belongsTo: {
                        reservation: {
                            localField: 'reservation',
                            localKey: 'reservation',
                            parent: true
                        }
                    }
                }
            })
        })
} ());