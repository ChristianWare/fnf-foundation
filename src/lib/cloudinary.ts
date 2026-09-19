import { v2 as cloudinary } from "cloudinary";
import { SITE } from "@/config/site";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export const CLIENT_SLUG = SITE.slug;
