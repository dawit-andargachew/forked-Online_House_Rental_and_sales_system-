// random charcter set for chapa payment ref
function generateRandomCharacterSet() {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomSet = "";

  for (let i = 0; i < 14; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    const randomChar = charset.charAt(randomIndex);
    randomSet += randomChar;
  }

  return randomSet;
}

module.exports = generateRandomCharacterSet;
