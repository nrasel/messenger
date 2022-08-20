const router = require('express').Router();
const {userRegiseter, userLogin,userLogout} = require('../controller/authController');
const { authMiddleware } = require('../middleware/authMiddleware');



router.post('/register',userRegiseter);
router.post('/login',userLogin);
router.post('/logout',authMiddleware,userLogout);

module.exports = router;