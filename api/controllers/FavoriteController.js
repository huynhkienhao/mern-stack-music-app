const Favorites = require("../models/Favorites");
const Song = require("../models/Song"); // Assuming you have a Song model
// Controller function to fetch all categories

exports.getfavourites = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Sử dụng populate để lấy đầy đủ thông tin từ song_id
    const favorites = await Favorites.find({ user_id }).populate("song_id");

    if (!favorites || favorites.length === 0) {
      return res.status(404).json({ message: "No favorites found" });
    }

    res.json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createfavourites = async (req, res) => {
  try {
    const { song_id, user_id } = req.body;

    if (!song_id || !user_id) {
      return res
        .status(400)
        .json({ error: "Song ID and User ID are required" });
    }

    // Kiểm tra xem bài hát đã tồn tại trong danh sách yêu thích chưa
    const existingFavorite = await Favorites.findOne({ user_id, song_id });
    if (existingFavorite) {
      return res.status(400).json({ error: "Song is already in favorites" });
    }

    // Tạo bản ghi yêu thích mới
    const favorite = new Favorites({ user_id, song_id });
    const savedFavorite = await favorite.save();

    // Populate để trả về thông tin bài hát đầy đủ
    const populatedFavorite = await Favorites.findById(
      savedFavorite._id
    ).populate("song_id");

    res.status(201).json(populatedFavorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFavorites = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.query; // Hoặc lấy từ body

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const deletedFavorite = await Favorites.findOneAndDelete({
      user_id,
      _id: id,
    });

    if (!deletedFavorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    res.json({ success: true, message: "Favorite deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
