// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.header("auth-token");
//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Access Denied. No token provided." });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified; // Lưu thông tin người dùng vào req
//     next();
//   } catch (err) {
//     res.status(400).json({ message: "Invalid Token" });
//   }
// };
