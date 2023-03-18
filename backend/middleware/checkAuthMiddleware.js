import asycHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const checkAuth = asycHandler(async (req, res, next) => {
  let jwt_token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    jwt_token = req.headers.authorization.split(" ")[1];

    jwt.verify(
      jwt_token,
      process.env.JWT_ACCESS_SECRET,
      async (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("Not authorized, token failed");
        } else {
          req.user = await User.findById(decoded.id).select("-password");
          req.roles = decoded.roles;
          next();
        }
      }
    );
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
