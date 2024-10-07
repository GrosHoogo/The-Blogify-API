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
