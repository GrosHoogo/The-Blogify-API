const express = require('express');
const router = express.Router();
const { 
    createPost, 
    getAllPosts, 
    getPostById, 
    updatePost, 
    deletePost 
} = require('../controllers/postController');
const auth = require('../middleware/auth');

// Créer 
router.post('/', auth, createPost);

// Obtenir all
router.get('/', getAllPosts);

// Obtenir 
router.get('/:id', getPostById);

// Mettre à jour 
router.put('/:id', auth, updatePost);

// Supprimer
router.delete('/:id', auth, deletePost);

module.exports = router;
