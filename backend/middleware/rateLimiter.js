import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const {success} = await ratelimit.limit("my-limit-key");
     console.log("Rate limit success:", success);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    next(); // Move next() inside the try block after the check
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;