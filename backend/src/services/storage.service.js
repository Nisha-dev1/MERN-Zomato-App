const ImageKit = require("imagekit");
require("dotenv").config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(fileBuffer, fileName) {
  // Convert buffer to base64
  const base64File = fileBuffer.toString("base64");

  const result = await imagekit.upload({
    file: base64File,    // 👈 base64 string required
    fileName: fileName,
  });

  return result;
}

module.exports = { uploadFile };
