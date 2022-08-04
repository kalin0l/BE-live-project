const express =require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');


const {createDeposit,getAllDeposits} = require('../controllers/depositController');

router.route('/:id').post(authenticateUser,createDeposit);
router.route('/:id').get(authenticateUser,getAllDeposits);
// router.route('/:id').patch(authenticateUser,createDeposit);

module.exports = router;