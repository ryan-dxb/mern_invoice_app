import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again in an hour",
  handler: (req, res, next, options) => {
    res.status(options.statusCode).send(options.message);
  },

  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many login attempts from this IP, please try again in an hour",
  handler: (req, res, next, options) => {
    res.status(options.statusCode).send(options.message);
  },

  standardHeaders: true,
  legacyHeaders: false,
});
