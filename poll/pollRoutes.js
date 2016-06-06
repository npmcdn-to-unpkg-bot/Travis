module.exports = pollRoutes;

function pollRoutes(passport) {
	
	
    var pollController = require('./pollController');
    var router = require('express').Router();
   /* var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));
*/

    router.post('/'       , pollController.getPoll);
    router.post('/Create' , pollController.create);
    router.post('/Remove' , pollController.remove);
    router.post('/Vote'   , pollController.vote);
    router.post('/Comment', pollController.comment);
    

    return router;

}