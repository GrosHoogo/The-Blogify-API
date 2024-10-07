const express = require('express');
const router = express.Router();
const { 
    createPost, 
    getAllPosts, 
    getPostById, 
    updatePost, 
    deletePost,
    likePost,    // Ajoutez ces deux nouvelles
    unlikePost   // fonctions importées
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

// Nouvelles routes pour like et unlike
router.put('/like/:id', auth, likePost);
router.put('/unlike/:id', auth, unlikePost);

module.exports = router;
