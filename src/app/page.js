import FileUpload from './components/FileUpload';
import FileList from './components/FileList';

export default function Home() {
  return (
    <main>
      <h1>
        Cloudinary File Management
      </h1>
      <br></br>
      <div>
        <FileUpload />
        <br></br>
        <FileList />
      </div>
    </main>
  );
}
