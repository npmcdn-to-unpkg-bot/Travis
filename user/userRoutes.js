module.exports = userRoutes;

function userRoutes(passport) {

    var userController = require('./userController');
    var router = require('express').Router();


    router.post('/login', userController.login);
	router.post('/lookup', userController.lookup);
    router.post('/signup', userController.signup);
    router.post('/update', userController.update);
    router.post('/unregister', passport.authenticate('jwt', {session: false}),userController.unregister)

    return router;

}