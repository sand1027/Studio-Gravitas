import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file, folder = 'morq-portfolio', retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await cloudinary.uploader.upload(file, {
        folder,
        resource_type: 'auto',
        quality: 'auto:good',
        fetch_format: 'auto',
        flags: 'progressive',
        timeout: 120000, // 2 minutes timeout
        transformation: [
          { width: 1800, height: 1800, crop: 'limit' },
          { quality: 80 }
        ]
      });
      return result.secure_url;
    } catch (error) {
      console.error(`Cloudinary upload error (attempt ${attempt}):`, error);
      
      if (attempt === retries) {
        throw new Error(`Image upload failed after ${retries} attempts: ${error.message || 'Unknown error'}`);
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, attempt * 2000));
    }
  }
};

export const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Image deletion failed:', error);
  }
};

export default cloudinary;