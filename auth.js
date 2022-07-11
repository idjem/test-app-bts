const crypto = require("node:crypto");

exports.auth = (appSecret) => (req, res, next) => {
  const body = req.body;
  const bodySignature = req.header("X-Body-Signature");

  const hash = crypto
    .createHmac("sha256", appSecret)
    .update(JSON.stringify(body))
    .digest("hex");

  if (hash === bodySignature) return next();
  const err = new Error("Cannot authenticate Intercom custom app");
  err.statusCode = 401;
  next(err);
};
