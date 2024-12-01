// Import necessary modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/AdminUser");
const Favorites = require("./models/Favorites");
const Song = require("./models/Song");
const Category = require("./models/Category");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/auth");

const categoryRouter = require("./routes/category");
const songRouter = require("./routes/song");
const favoriteRouter = require("./routes/favorite");
const playListRouter = require("./routes/PlaylistRoutes");
const multer = require("multer");
const adminRoutes = require("./routes/adminRoutes"); // Đường dẫn tới file router của bạn
const listeningHistoryRoute = require("./routes/listeningHistory");
// const songRouter = require("./routes/song");

// Load environment variables
require("dotenv").config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Allow all origins for testing. Adjust in production.
app.use("/uploads", express.static(__dirname + "/uploads")); // Serve static files

module.exports = app;
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Function to generate JWT token

app.get("/api/getAdminProfile", async (req, res) => {
  try {
    const adminProfile = await User.findOne(); // You need to implement this function

    // Check if admin profile data is retrieved successfully
    if (adminProfile) {
      // Send the admin profile data as JSON response
      res.json({
        AdminProfile: adminProfile,
        successMsg: "Admin profile retrieved successfully",
      });
    } else {
      // If admin profile data retrieval fails, send an error response
      res.status(500).json({ errorMsg: "Failed to retrieve admin profile" });
    }
  } catch (error) {
    console.error("Error retrieving admin profile:", error);
    res.status(500).json({ errorMsg: "Error retrieving admin profile" }); // Return an error response
  }
});

const suggestedSongs = [
  {
    songName: "Song 1",
    artist: "Artist 1",
    song: "song1.mp3",
    imgSrc: "song1.jpg",
  },
  {
    songName: "Song 2",
    artist: "Artist 2",
    song: "song2.mp3",
    imgSrc: "song2.jpg",
  },
  {
    songName: "Song 3",
    artist: "Artist 3",
    song: "song3.mp3",
    imgSrc: "song3.jpg",
  },
];

// Tạo API cho gợi ý bài hát
app.get("/api/suggested-songs", (req, res) => {
  res.json(suggestedSongs); // Trả về dữ liệu gợi ý nhạc
});
console.log("MongoDB URL:", process.env.MONGO_URL);
console.log("JWT Secret:", process.env.JWT_SECRET);

// // Khởi động server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// Routes for songs and categories
app.use("/api", adminRouter);
app.use("/api", songRouter);
app.use("/api", categoryRouter);
app.use("/api", favoriteRouter);
app.use("/api", playListRouter);
app.use("/api", adminRoutes);
// app.use("/api/admin", adminRoutes); // Cấu hình để các route bắt đầu với /api/admin
// app.use("/api", listeningHistoryRoute);
// // Sử dụng route songRouter cho các đường dẫn bắt đầu bằng '/api'
// app.use("/api", songRouter);
// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
