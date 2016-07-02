module.exports = tripRoutes;

function tripRoutes(passport) {


    var tripController = require('./tripController');
    var router = require('express').Router();
    /* var unless = require('express-unless');

     var mw = passport.authenticate('jwt', {session: false});
     mw.unless = unless;

     //middleware
     router.use(mw.unless({method: ['GET', 'OPTIONS']}));
     */

    router.get('/'       , tripController.getAll);
    // router.get('/{ID}'       , tripController.getById(ID));
    router.post('/' , tripController.create);
    router.get('/search' , tripController.getTrips);
    router.put('/rate' , tripController.rateTrip);

    // router.delete('/Remove' , tripController.remove);
    // router.post('/Comment', tripController.comment);
    
    return router;
}