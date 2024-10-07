const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const newPost = new Post({
      title,
      content,
      author: req.user.id, 
      tags
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du post", error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des posts", error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) {
      return res.status(404).json({ message: "Post non trouvé" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du post", error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, tags, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post non trouvé" });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du post", error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post non trouvé" });
    }
    res.json({ message: "Post supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du post", error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: "Post non trouvé" });
    }

    // Vérifier si l'utilisateur a déjà liké le post
    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ message: "Vous avez déjà liké ce post" });
    }

    post.likes.push(req.user.id);
    await post.save();

    res.json({ message: "Post liké avec succès", likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du like du post", error: error.message });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: "Post non trouvé" });
    }

    // Vérifier si l'utilisateur a liké le post
    if (!post.likes.includes(req.user.id)) {
      return res.status(400).json({ message: "Vous n'avez pas encore liké ce post" });
    }

    post.likes = post.likes.filter(like => like.toString() !== req.user.id);
    await post.save();

    res.json({ message: "Like retiré avec succès", likes: post.likes.length });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du retrait du like", error: error.message });
  }
};
