import FileUpload from './components/FileUpload';
import FileList from './components/FileList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Cloudinary File Management
      </h1>
      <div className="max-w-4xl mx-auto">
        <FileUpload />
        <FileList />
      </div>
    </main>
  );
}
