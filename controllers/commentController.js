const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    console.log('User from token:', req.user);

    const { text, post } = req.body;
    const newComment = new Comment({
      text,
      author: req.user.id,
      post
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Error in createComment:', error);
    res.status(500).json({ message: "Erreur lors de la création du commentaire", error: error.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des commentaires", error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { text } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du commentaire", error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    res.json({ message: "Commentaire supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du commentaire", error: error.message });
  }
};
