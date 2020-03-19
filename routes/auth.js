let router = require('express').Router();

let AuthController = require('../controllers/Auth');

router.post('/register', AuthController.signUpUser);

router.post('/login', AuthController.logInUser);

router.post('/logout', AuthController.logOutUser);

router.get('/me', AuthController.getCurrentUser);

module.exports = router;



