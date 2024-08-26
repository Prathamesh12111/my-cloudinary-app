import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export async function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'my-uploads' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    file.arrayBuffer().then((arrayBuffer) => {
      const buffer = Buffer.from(arrayBuffer);
      uploadStream.end(buffer);
    });
  });
}

export async function listFiles() {
  return cloudinary.search
    .expression('folder:my-uploads')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();
}