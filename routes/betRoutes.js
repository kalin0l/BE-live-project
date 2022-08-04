const express =require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

const {getAllBets,deleteBet,createBet} = require('../controllers/betController');

router.route('/:id').post(authenticateUser,createBet)
router.route('/:id').get(authenticateUser,getAllBets)
router.route('/:id').delete(authenticateUser,deleteBet)

module.exports = router;