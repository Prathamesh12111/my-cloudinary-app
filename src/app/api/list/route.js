import { NextResponse } from 'next/server';
import { listFiles } from '@/lib/cloudinary';

export async function GET() {
  try {
    const result = await listFiles();
    return NextResponse.json({ files: result.resources });
  } catch (error) {
    console.error('Error fetching files from Cloudinary:', error);
    return NextResponse.json({ error: 'Error fetching files' }, { status: 500 });
  }
}