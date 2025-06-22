import { v2 as cloudinary } from "cloudinary";

import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


cloudinary.uploader.upload('data:image/jpeg;base64,...', { resource_type: 'image' })
  .then(res => console.log(res.secure_url))
  .catch(err => console.log("Error:", err.message));


export default cloudinary;
