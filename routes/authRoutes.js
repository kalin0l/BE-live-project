const express =require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

const {register,login,logout} = require('../controllers/authController');


router.post('/register',register)
router.route('/login').post(login);
router.delete('/logout', authenticateUser, logout);


module.exports = router;