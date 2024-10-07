const express = require('express');
const router = express.Router();
const { 
    createComment, 
    getCommentsByPost, 
    updateComment, 
    deleteComment 
} = require('../controllers/commentController');
const auth = require('../middleware/auth');

// Créer 
router.post('/', auth, createComment);

// Obtenir 
router.get('/post/:postId', getCommentsByPost);

// Mettre à jour    
router.put('/:id', auth, updateComment);

// Supprimer 
router.delete('/:id', auth, deleteComment);

module.exports = router;
