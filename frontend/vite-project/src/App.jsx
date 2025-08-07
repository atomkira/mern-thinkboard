import { Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const App = () => {
  return (
    <div className="relative h-full w-full">
<div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,_#000_60%,_#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

let userId = localStorage.getItem("userId");

if (!userId) {
  userId = crypto.randomUUID(); // or use a custom ID generator
  localStorage.setItem("userId", userId);
}
axios.defaults.headers.common["x-user-id"] = userId;

export default App;