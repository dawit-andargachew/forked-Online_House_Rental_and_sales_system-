const { verifyToken } = require("./auth");

async function getUser(req, res) {
  const token = req.headers.authorization;
  console.log("token", token);
  if (!token) {
    throw new Error("Unauthorized");
  }
  const userId = verifyToken(token);
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return userId;
}

module.exports = getUser;
