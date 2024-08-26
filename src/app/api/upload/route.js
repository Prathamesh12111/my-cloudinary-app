import { NextResponse } from 'next/server';
import { uploadFile } from '@/lib/cloudinary';

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const result = await uploadFile(file);
    return NextResponse.json({ 
      message: 'File uploaded successfully',
      url: result.secure_url
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}