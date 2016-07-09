module.exports = tripRoutes;

function tripRoutes(passport) {

    var tripController = require('./tripController');
    var router = require('express').Router();

    router.get('/', tripController.getAll);
    router.post('/' , tripController.create);
    router.delete('/' , tripController.delete);
    router.put('/' , tripController.updateTrip);

    router.get('/search' , tripController.getTrips);
    router.get('/searchMore' , tripController.getMoreTrips);
    router.get('/getUserTrips' , tripController.getTripsFromUser);
    router.put('/rate' , tripController.rateTrip);

    router.post('/comment', tripController.comment);
    
    return router;
}