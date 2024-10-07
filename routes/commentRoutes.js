const express = require('express');
const router = express.Router();
const { 
    createComment, 
    getCommentsByPost, 
    updateComment, 
    deleteComment 
} = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.post('/', auth, createComment);
router.get('/post/:postId', getCommentsByPost);
router.put('/:id', auth, updateComment);
router.delete('/:id', auth, deleteComment);

module.exports = router;
