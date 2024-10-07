const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/auth'); 

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', auth, getUserProfile);
router.put('/:id', auth, updateUserProfile);
router.delete('/:id', auth, deleteUser);

module.exports = router;
