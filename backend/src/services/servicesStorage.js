const Imagekit = require("imagekit");
const { v4: uuidv4 } = require("uuid");

const imagekit = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC,
  privateKey: process.env.IMAGEKIT_PRIVATE,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

const uploadKit = async (fileBuffer) => {
  const result = await imagekit.upload({
    file:fileBuffer,
    fileName:uuidv4(),
    folder:"Event_Images"
  });
  return result.url;
};

module.exports = uploadKit;
