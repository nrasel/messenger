const router = require('express').Router();
const {userRegiseter, userLogin} = require('../controller/authController');



router.post('/register',userRegiseter);
router.post('/login',userLogin);

module.exports = router;